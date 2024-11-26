// зарплата бухгалтеров
import { useEffect } from 'react';
import { getSalaryBuh } from '@/services';
import { useMutation } from '@tanstack/react-query';
import { useDataPeriods } from './useDataPeriods';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useSalaryStore,
	useDepartmentsStore,
	useDateRangeStore,
} from '@/storeZustand';

const useFetchSalaryBuh = () => {
	const { dataPeriodBuh } = useDataPeriods();

	// Загрузка зарплат бухгалтерии
	const [setSalaryBuhList] = useSalaryStore(
		useShallow((state) => [state.setSalaryBuhList])
	);

	// Выбранный департамент
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	// Диапазоны дат
	const [startDate, endDate] = useDateRangeStore(
		useShallow((state) => [state.startDate, state.endDate])
	);

	const { mutate: fetchSalaryBuh, isPending: loadingBuh } = useMutation({
		mutationFn: getSalaryBuh,
		onSuccess: (data) => {
			setSalaryBuhList(data);
		},
		onError: (error) => {
			errorToast(error.message);
		},
	});

	useEffect(() => {
		if (dataPeriodBuh) fetchSalaryBuh(dataPeriodBuh);
	}, [selectedDepartment, startDate, endDate]);

	return { loadingBuh, fetchSalaryBuh };
};

export default useFetchSalaryBuh;
