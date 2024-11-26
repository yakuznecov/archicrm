// загрузка депозитов компаний
import { useEffect, useState } from 'react';
import { formatIsoTimeToString } from '@/helpers/Date/formatDate';
import { useToggle, useDepositsColumns } from '@/hooks';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useContrAgentDepositsStore,
	useUserStore,
	useDateRangeStore,
	useDepartmentsStore,
} from '@/storeZustand';

const useLoadDeposits = () => {
	const [modal, toggleModal] = useToggle(false);
	// есть ли редактирование депозита
	const [isEdit, setIsEdit] = useState(false);
	// активен ли чекбокс выбора НДС
	const [isCheckedNds, setIsCheckedNds] = useState(false);
	const [loadingBtn, setLoadingBtn] = useState(false);

	// выбранная компания собственная
	const [selectedOwnCompany, setSelectedOwnCompany] = useState(null);
	// выбранный контрагент
	const [selectedContrAgent, setSelectedContrAgent] = useState();

	// Пользователь
	const [staffId] = useUserStore(useShallow((state) => [state.staffId]));

	// Тип Пользователя
	const isBuh = JSON.parse(localStorage.getItem('user'))?.state?.isBuh;

	// Выбранный департамент
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	// Диапазоны дат
	const [startDate, endDate] = useDateRangeStore(
		useShallow((state) => [state.startDate, state.endDate])
	);

	// Депозиты контрагентов
	const [
		contrAgentDepositsList,
		getContrAgentDeposits,
		addContrAgentDeposit,
		updateContrAgentDeposit,
		selectedContrAgentDeposit,
		setSelectedContrAgentDeposit,
		loading,
	] = useContrAgentDepositsStore(
		useShallow((state) => [
			state.contrAgentDepositsList,
			state.getContrAgentDeposits,
			state.addContrAgentDeposit,
			state.updateContrAgentDeposit,
			state.selectedContrAgentDeposit,
			state.setSelectedContrAgentDeposit,
			state.loading,
		])
	);

	const data = {
		start_date: startDate,
		end_date: endDate,
		department_id: selectedDepartment,
	};

	// Загрузка депозитов списка контрагентов
	useEffect(() => {
		getContrAgentDeposits(data);
	}, [startDate, endDate, selectedDepartment]);

	const onFinish = async (values) => {
		setLoadingBtn(true);

		const depositType = isCheckedNds ? 2 : 1;

		const updatedDeposit = {
			creator: staffId,
			amount: Number(values.amount),
			payment_type: isBuh ? 2 : 1, // Бухгалтерия вносит только безнал
			date_of_deposit: formatIsoTimeToString(new Date()),
			type: depositType,
			company: selectedOwnCompany, // внутренняя компания
			contr_agent: selectedContrAgent, // контрагент
		};

		if (isEdit) {
			// Обновить депозит
			await updateContrAgentDeposit({
				id: selectedContrAgentDeposit?.id,
				updatedDeposit,
			});
		} else {
			await addContrAgentDeposit(updatedDeposit); // Добавить депозит
		}

		setTimeout(() => {
			setLoadingBtn(false);
			toggleModal();
			getContrAgentDeposits(data);
			setSelectedOwnCompany(null);
			setSelectedContrAgent(null);
			setIsCheckedNds(false);
			setIsEdit(false);
		}, 1500);
	};

	// клик по депозиту для обновления
	const handleDepositClick = (deposit) => {
		setIsEdit(true);
		toggleModal();
		setSelectedContrAgentDeposit(deposit);
		setSelectedOwnCompany(deposit?.company);
		setSelectedContrAgent(deposit?.contr_agent);
	};

	// колонки в таблице депозитов контрагентов
	const columns = useDepositsColumns(handleDepositClick, isBuh);

	// Добавить депозит
	const handleAddDeposit = () => {
		toggleModal();
	};

	// Изменение контрагента
	const handleContrAgentChange = (value) => {
		setSelectedContrAgent(value);
	};

	// Изменение собственной компании
	const handleOwnCompanyChange = (value) => {
		setSelectedOwnCompany(value);
	};

	// функция переключения, активен ли чекбокс выбора НДС
	const onChangeNds = () => {
		setIsCheckedNds(!isCheckedNds);
	};

	return {
		contrAgentDepositsList,
		loadingBtn,
		modal,
		toggleModal,
		selectedOwnCompany,
		selectedContrAgent,
		loading,
		onFinish,
		handleAddDeposit,
		handleContrAgentChange,
		handleOwnCompanyChange,
		isBuh,
		isCheckedNds,
		onChangeNds,
		selectedContrAgentDeposit,
		isEdit,
		columns,
	};
};

export default useLoadDeposits;
