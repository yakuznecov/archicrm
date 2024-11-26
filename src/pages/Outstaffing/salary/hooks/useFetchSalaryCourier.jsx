// зарплата курьеров
import { useEffect } from 'react';
import { getSalaryCourier } from '@/services';
import { useMutation } from '@tanstack/react-query';
import { useDataPeriods } from './useDataPeriods';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useSalaryStore,
	useDepartmentsStore,
	useDateRangeStore,
} from '@/storeZustand';

const useFetchSalaryCourier = () => {
	const { dataPeriodCourier } = useDataPeriods();

	// Загрузка зарплат курьеров
	const [setSalaryCourierList] = useSalaryStore(
		useShallow((state) => [state.setSalaryCourierList])
	);

	// Выбранный департамент
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	// Диапазоны дат
	const [startDate, endDate] = useDateRangeStore(
		useShallow((state) => [state.startDate, state.endDate])
	);

	const { mutate: fetchSalaryCourier, isPending: loadingCourier } = useMutation(
		{
			mutationFn: getSalaryCourier,
			onSuccess: (data) => {
				setSalaryCourierList(data);
			},
			onError: (error) => {
				errorToast(error.message);
			},
		}
	);

	useEffect(() => {
		if (dataPeriodCourier) fetchSalaryCourier(dataPeriodCourier);
	}, [selectedDepartment, startDate, endDate]);

	return { loadingCourier, fetchSalaryCourier };
};

export default useFetchSalaryCourier;
