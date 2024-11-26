// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useDepartmentsStore, useDateRangeStore } from '@/storeZustand';

export const useDataPeriods = () => {
	// Выбранный департамент
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	// Диапазоны дат
	const [startDate, endDate] = useDateRangeStore(
		useShallow((state) => [state.startDate, state.endDate])
	);

	// Менеджеры
	const dataPeriodManagers = {
		department: selectedDepartment,
		start_date: startDate,
		end_date: endDate,
		non_related: false, // не привязаны
		profession_id: 15,
	};

	// Делопроизводство
	const dataPeriodDelo = {
		department: selectedDepartment,
		start_date: startDate,
		end_date: endDate,
		non_related: true, // есть связь с менеджерами
		profession_id: 16,
	};

	// Бухгалтеры
	const dataPeriodBuh = {
		department: selectedDepartment,
		start_date: startDate,
		end_date: endDate,
		non_related: true, // не привязаны
		profession_id: 6,
	};

	// Курьеры
	const dataPeriodCourier = {
		department: selectedDepartment,
		start_date: startDate,
		end_date: endDate,
		non_related: true, // не привязаны
		profession_id: 18,
	};

	return {
		dataPeriodManagers,
		dataPeriodDelo,
		dataPeriodBuh,
		dataPeriodCourier,
	};
};
