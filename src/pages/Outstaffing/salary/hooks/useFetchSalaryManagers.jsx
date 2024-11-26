import { useEffect } from 'react';
import { getSalaryManagers } from '@/services';
import { useMutation } from '@tanstack/react-query';
import { useDataPeriods } from './useDataPeriods';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useSalaryStore,
	useDepartmentsStore,
	useDateRangeStore,
} from '@/storeZustand';

const useFetchSalaryManagers = () => {
	const { dataPeriodManagers } = useDataPeriods();

	// Загрузка зарплат
	const [setSalaryManagersList] = useSalaryStore(
		useShallow((state) => [state.setSalaryManagersList])
	);

	// Выбранный департамент
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	// Диапазоны дат
	const [startDate, endDate] = useDateRangeStore(
		useShallow((state) => [state.startDate, state.endDate])
	);

	const { mutate: fetchSalaryManagers, isPending: loadingManagers } =
		useMutation({
			mutationFn: getSalaryManagers,
			onSuccess: (data) => {
				setSalaryManagersList(data);
			},
		});

	useEffect(() => {
		if (dataPeriodManagers) fetchSalaryManagers(dataPeriodManagers);
	}, [selectedDepartment, startDate, endDate]);

	return { fetchSalaryManagers, loadingManagers };
};

export default useFetchSalaryManagers;
