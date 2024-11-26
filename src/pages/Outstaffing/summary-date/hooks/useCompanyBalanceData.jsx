// Данные от приходе контрагентов
import { useEffect, useState } from 'react';
import { useToggle } from '@/hooks';
import { useCompanyBalanceColumns } from './useCompanyBalanceColumns';
import { addContrAgentCost } from '@/services';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useCompanyBalanceStore,
	useDateRangeStore,
	useDepartmentsStore,
	useUserStore,
} from '@/storeZustand';

export const useCompanyBalanceData = () => {
	const [modal, toggleModal] = useToggle(false);
	const [companyId, setCompanyId] = useState(null);

	// Staff id
	const [staffId] = useUserStore(useShallow((state) => [state.staffId]));

	// Диапазоны дат
	const [startDate] = useDateRangeStore(
		useShallow((state) => [state.startDate])
	);

	// Выбранный департамент
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	// Баланс компании с приходами
	const [loading, companyBalanceList, getCompanyBalanceData] =
		useCompanyBalanceStore(
			useShallow((state) => [
				state.loading,
				state.companyBalanceList,
				state.getCompanyBalanceData,
			])
		);

	useEffect(() => {
		const data = {
			date: startDate,
			department_id: selectedDepartment,
		};

		getCompanyBalanceData(data);
	}, [startDate, selectedDepartment]);

	// Создание расхода компании
	const handleCompanyClick = (id) => {
		setCompanyId(id); // id внутренней компании
		toggleModal();
	};

	// колонки для таблицы компаний
	const columns = useCompanyBalanceColumns(handleCompanyClick);

	const onFinish = async (values) => {
		const data = {
			amount: values.amount,
			type: 1, // ндс и без ндс (2)
			date_of_deposit: '2024-09-10', // обяз поле
			description: values.description,
			contr_agent: null,
			company: companyId, // обяз поле
			payment_type: 2, // 1-нал, 2-безнал
			creator: staffId, // обяз поле
		};

		await addContrAgentCost(data); // добавить расход компании
		toggleModal();
	};

	return {
		modal,
		loading,
		columns,
		toggleModal,
		companyBalanceList,
		onFinish,
	};
};
