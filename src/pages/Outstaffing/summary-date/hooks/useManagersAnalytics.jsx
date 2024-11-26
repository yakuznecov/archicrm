// логика загрузки аналитики менеджеров
import { useEffect } from 'react';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useManagersAnalyticsStore,
	useDateRangeStore,
	useDepartmentsStore,
} from '@/storeZustand';

export const useManagersAnalytics = () => {
	// Диапазоны дат
	const [startDate, endDate] = useDateRangeStore(
		useShallow((state) => [state.startDate, state.endDate])
	);

	// Выбранный департамент
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	// Заказы
	const [getManagersAnalytics, managersAnalyticsList, loading] =
		useManagersAnalyticsStore(
			useShallow((state) => [
				state.getManagersAnalytics,
				state.managersAnalyticsList,
				state.loading,
			])
		);

	// загрузить аналитику менеджеров
	useEffect(() => {
		const data = {
			start_date: startDate,
			end_date: endDate,
			department_id: selectedDepartment,
		};

		getManagersAnalytics(data);
	}, [startDate, endDate, selectedDepartment]);

	return { managersAnalyticsList, loading };
};
