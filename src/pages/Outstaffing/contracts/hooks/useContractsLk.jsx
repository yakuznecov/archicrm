// логика фильтрации договоров, которые пришли из личного кабинета
import { getToday, getSevenDaysAgo } from '@/helpers/Date/dayjs';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useContractsStore,
	useDepartmentsStore,
	useDateRangeStore,
} from '@/storeZustand';

export const useContractsLk = () => {
	// Выбранный департамент
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	// Диапазоны дат из Zustand store
	const [startDate, endDate] = useDateRangeStore(
		useShallow((state) => [state.startDate, state.endDate])
	);

	const [
		addFilter,
		selectedCity,
		setIsContractsLkChecked,
		isContractsLkChecked,
		setContracts,
		setLoading,
	] = useContractsStore((state) => [
		state.addFilter,
		state.selectedCity,
		state.setIsContractsLkChecked,
		state.isContractsLkChecked,
		state.setContracts,
		state.setLoading,
	]);

	// Выбор договоров из личного кабинета
	const handleContractsLkChange = (event) => {
		const value = event.target.checked;
		setIsContractsLkChecked(value);

		const filtersDate = {
			city: selectedCity,
			fire: 'true', // не показывать уволенных
			start_date: value ? getSevenDaysAgo() : startDate,
			end_date: value ? getToday() : endDate,
			is_client_approved: value ? 'false' : 'true',
		};

		addFilter(filtersDate);
	};

	const OUTSTAFFKIN = selectedDepartment === 7;

	return {
		OUTSTAFFKIN,
		isContractsLkChecked,
		handleContractsLkChange,
	};
};
