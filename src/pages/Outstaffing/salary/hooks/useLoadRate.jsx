// логика загрузки ставки за час
import { useState } from 'react';
import { patchStaff } from '@/services';
import { useToggle } from '@/hooks';
import { useDataPeriods } from './useDataPeriods';
import useFetchSalaryDelo from './useFetchSalaryDelo';
import useFetchSalaryManagers from './useFetchSalaryManagers';

export function useLoadRate(isSuperUser) {
	// модальное окно обновления ставки
	const [modalRate, toggleModalRate] = useToggle(false);

	// id сотрудника при нажатии на ячейку таблицы
	const [staffId, setStaffId] = useState(null);

	// Загрузка данных о периодах
	const { dataPeriodDelo, dataPeriodManagers } = useDataPeriods();

	// Загрузка зарплат делопроизводителей
	const { fetchSalaryDelo } = useFetchSalaryDelo();

	// Загрузка зарплат менеджеров
	const { fetchSalaryManagers } = useFetchSalaryManagers();

	// функция обновления ставки за час
	const onFinishRate = async (values) => {
		const dataRate = {
			salary_rate_per_hour: values.salary_rate_per_hour,
		};

		await patchStaff(staffId, dataRate);
		fetchSalaryDelo(dataPeriodDelo);
		fetchSalaryManagers(dataPeriodManagers);
		toggleModalRate();
	};

	// клик по ячейке Ставка за час
	const handleRateClick = (record) => {
		if (!isSuperUser) {
			errorToast('Доступ только для админов');
			return;
		}

		setStaffId(record.id);
		toggleModalRate();
	};

	return {
		modalRate,
		onFinishRate,
		handleRateClick,
		toggleModalRate,
	};
}
