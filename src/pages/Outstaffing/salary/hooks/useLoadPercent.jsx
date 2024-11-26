// логика загрузки личного процента
import { useState } from 'react';
import { useToggle } from '@/hooks';
import { useDataPeriods } from './useDataPeriods';
import useFetchSalaryDelo from './useFetchSalaryDelo';
import useFetchSalaryManagers from './useFetchSalaryManagers';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useDateRangeStore,
	useUserStore,
	useManagersRateStore,
} from '@/storeZustand';

export function useLoadPercent() {
	// модальное окно обновления личного процента
	const [modalPercent, toggleModalPercent] = useToggle(false);

	// id сотрудника при нажатии на ячейку таблицы
	const [staffId, setStaffId] = useState(null);

	// Диапазоны дат
	const [startDate, endDate] = useDateRangeStore(
		useShallow((state) => [state.startDate, state.endDate])
	);

	// месяц, за который загружена зарплата
	const month = endDate.split('-')[1];

	// Загрузка ролей сотрудников
	const [isSuperUser] = useUserStore(
		useShallow((state) => [state.isSuperUser])
	);

	// Загрузка данных о периодах
	const { dataPeriodDelo, dataPeriodManagers } = useDataPeriods();

	// Личный процент менеджера
	const [postManagersRate] = useManagersRateStore(
		useShallow((state) => [state.postManagersRate])
	);

	// Загрузка зарплат
	const { fetchSalaryManagers } = useFetchSalaryManagers();
	const { fetchSalaryDelo } = useFetchSalaryDelo();

	// выбор месяца в модальном окне личного процента
	// const onChangeMonth = (_, dateString) => {
	// 	const month = dateString.split('-')[0];
	// 	setMonth(month);
	// 	const year = dateString.split('-')[1];
	// 	setYear(year);
	// };

	// функция обновления личного процент
	const onFinishPercent = async (values) => {
		const dataPercent = {
			month_revenue_rate: values.month_revenue_rate,
			month: month,
			year: new Date().getFullYear(),
			staff: staffId,
		};

		await postManagersRate(dataPercent);
		fetchSalaryDelo(dataPeriodDelo);
		fetchSalaryManagers(dataPeriodManagers);
		toggleModalPercent();
	};

	// клик по ячейке личный процент
	const handlePercentClick = (record) => {
		if (!isSuperUser) {
			errorToast('Доступ только для админов');
			return;
		}

		setStaffId(record.id);
		toggleModalPercent();
	};

	return {
		modalPercent,
		onFinishPercent,
		handlePercentClick,
		toggleModalPercent,
	};
}
