// зарплата делопроизводителей
import { useEffect } from 'react';
import { getSalaryDelo } from '@/services';
import { useMutation } from '@tanstack/react-query';
import { useDataPeriods } from './useDataPeriods';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useSalaryStore,
	useDepartmentsStore,
	useDateRangeStore,
} from '@/storeZustand';

const useFetchSalaryDelo = () => {
	const { dataPeriodDelo } = useDataPeriods();

	// Загрузка зарплат
	const [setSalaryDeloList] = useSalaryStore(
		useShallow((state) => [state.setSalaryDeloList])
	);

	// Выбранный департамент
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	// Диапазоны дат
	const [startDate, endDate] = useDateRangeStore(
		useShallow((state) => [state.startDate, state.endDate])
	);

	const { mutate: fetchSalaryDelo, isPending: loadingDelo } = useMutation({
		mutationFn: getSalaryDelo,
		onSuccess: (data) => {
			setSalaryDeloList(data);
		},
		onError: (error) => {
			errorToast(error.message);
		},
	});

	useEffect(() => {
		if (dataPeriodDelo) fetchSalaryDelo(dataPeriodDelo);
	}, [selectedDepartment, startDate, endDate]);

	return { loadingDelo, fetchSalaryDelo };
};

export default useFetchSalaryDelo;
