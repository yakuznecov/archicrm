// логика выбора города
import { useEffect } from 'react';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useContractsStore, useDepartmentsStore } from '@/storeZustand';

export const useCitySelection = () => {
	// Выбранный департамент
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	const [updateCity, selectedCity, addFilter] = useContractsStore((state) => [
		state.updateCity,
		state.selectedCity,
		state.addFilter,
	]);

	useEffect(() => {
		if (selectedDepartment === 7) {
			updateCity('Москва');
		} else {
			updateCity('Санкт-Петербург');
		}
	}, [selectedDepartment]);

	// Выбор города
	const handleCityChange = (event) => {
		const value = event.target.value;
		updateCity(value);
		addFilter({ city: value });
	};

	const OUTSTAFFKIN = selectedDepartment === 7;

	return {
		OUTSTAFFKIN,
		selectedCity,
		handleCityChange,
	};
};
