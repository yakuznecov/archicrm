import { useSalaryColumns } from './useSalaryColumns';
import { useSalaryManagersColumns } from './useSalaryManagersColumns';
import { errorToast } from '@/components';
import { useLoadBonus } from './useLoadBonus';
import { useSalaryBuhColumns } from './useSalaryBuhColumns';
import { useLoadRate } from './useLoadRate';
import { useLoadPercent } from './useLoadPercent';
import { useLoadSalaryPaid } from './useLoadSalaryPaid';
import useFetchSalaryManagers from './useFetchSalaryManagers';
import useFetchSalaryDelo from './useFetchSalaryDelo';
import useFetchSalaryBuh from './useFetchSalaryBuh';
import useFetchSalaryCourier from './useFetchSalaryCourier';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useSalaryStore,
	usePenaltyBonusStore,
	useUserStore,
} from '@/storeZustand';

export const useLoadSalary = () => {
	// Месяц и год внутри модалки с бонусами
	const { month, year } = useLoadBonus();

	// Загрузка ролей сотрудников
	const [isSuperUser, isBuh, isOutstaff, isManager, isCourier, isDelo] =
		useUserStore(
			useShallow((state) => [
				state.isSuperUser,
				state.isBuh,
				state.isOutstaff,
				state.isManager,
				state.isCourier,
				state.isDelo,
			])
		);

	// Загрузка зарплат
	const [
		userInfo,
		salaryDeloList,
		salaryManagersList,
		bonusModal,
		toggleBonusModal,
		penaltyModal,
		togglePenaltyModal,
		setUserInfo,
		salaryBuhList,
		salaryCourierList,
	] = useSalaryStore(
		useShallow((state) => [
			state.userInfo,
			state.salaryDeloList,
			state.salaryManagersList,
			state.bonusModal,
			state.toggleBonusModal,
			state.penaltyModal,
			state.togglePenaltyModal,
			state.setUserInfo,
			state.salaryBuhList,
			state.salaryCourierList,
		])
	);

	const { loadingManagers } = useFetchSalaryManagers();
	const { loadingDelo } = useFetchSalaryDelo();
	const { loadingBuh } = useFetchSalaryBuh();
	const { loadingCourier } = useFetchSalaryCourier();

	// Получение бонусов сотрудников
	const [getPenaltyBonusByStaffId, setIsPenalty] = usePenaltyBonusStore(
		useShallow((state) => [
			state.getPenaltyBonusByStaffId,
			state.setIsPenalty, // открыто окно штрафов
		])
	);

	// клик по ячейке бонусов с получением id staff
	const handleBonusClick = (record) => {
		if (!isSuperUser) {
			errorToast('Доступ только для админов');
			return;
		}

		const { id, surname, name } = record;
		const staffName = `${name} ${surname}`;
		setUserInfo(staffName);

		setIsPenalty(false);
		// запрос бонусов по id сотрудника
		getPenaltyBonusByStaffId(id, month, year);
		toggleBonusModal();
	};

	// клик по ячейке штрафов
	const handlePenaltyClick = (record) => {
		if (!isSuperUser) {
			errorToast('Доступ только для админов');
			return;
		}

		const { id, surname, name } = record;
		const staffName = `${name} ${surname}`;
		setUserInfo(staffName);

		setIsPenalty(true);
		// запрос штрафов по id сотрудника
		getPenaltyBonusByStaffId(id, month, year);
		togglePenaltyModal();
	};

	// Загрузка ставки за час
	const { handleRateClick, toggleModalRate, modalRate, onFinishRate } =
		useLoadRate(isSuperUser);

	// Загрузка личного процента
	const {
		handlePercentClick,
		toggleModalPercent,
		modalPercent,
		onFinishPercent,
		onChangeMonth,
	} = useLoadPercent();

	// Загрузка данных о выдаче зарплаты
	const {
		handlePaidClick,
		modalSalaryPaid,
		toggleModalSalaryPaid,
		onFinishPaid,
	} = useLoadSalaryPaid(isSuperUser, setUserInfo);

	// Колонки таблицы зарплаты делопроизводство
	const deloColumns = useSalaryColumns(
		handleBonusClick,
		handlePenaltyClick,
		handleRateClick,
		handlePercentClick,
		handlePaidClick
	);

	// Колонки таблицы зарплаты менеджеров
	const managersColumns = useSalaryManagersColumns(
		handleBonusClick,
		handlePenaltyClick,
		handleRateClick,
		handlePercentClick,
		handlePaidClick
	);

	// Колонки таблицы зарплаты бухгалтеров и курьеров
	const buhColumns = useSalaryBuhColumns(
		handleBonusClick,
		handlePenaltyClick,
		handlePercentClick,
		handleRateClick,
		handlePaidClick
	);

	const salaryMappings = [
		{
			role: isManager,
			title: 'Менеджеры',
			data: salaryManagersList,
			columns: managersColumns,
			loading: loadingManagers,
		},
		{
			role: isDelo,
			title: 'Делопроизводство',
			data: salaryDeloList,
			columns: deloColumns,
			loading: loadingDelo,
		},
		{
			role: isCourier,
			title: 'Курьеры',
			data: salaryCourierList,
			columns: buhColumns,
			loading: loadingCourier,
		},
		{
			role: isBuh,
			title: 'Бухгалтерия',
			data: salaryBuhList,
			columns: buhColumns,
			loading: loadingBuh,
		},
	];

	return {
		userInfo,
		modalRate,
		bonusModal,
		isOutstaff,
		isSuperUser,
		penaltyModal,
		onFinishRate,
		onFinishPaid,
		modalPercent,
		onChangeMonth,
		salaryMappings,
		onFinishPercent,
		toggleModalRate,
		toggleBonusModal,
		toggleModalPercent,
		togglePenaltyModal,
		modalSalaryPaid,
		toggleModalSalaryPaid,
	};
};
