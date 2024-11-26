// Загрузка собственных компаний
import { useEffect, useMemo } from 'react';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useDepartmentsStore, useCompaniesStore } from '@/storeZustand';

const useFetchOwnCompanies = () => {
	// Все компании
	const [getOwnCompanies, ownCompanies] = useCompaniesStore(
		useShallow((state) => [state.getOwnCompanies, state.ownCompanies])
	);

	// Выбранный департамент
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	// получение списка собственных компаний
	useEffect(() => {
		getOwnCompanies(selectedDepartment);
	}, [selectedDepartment]);

	// Список собственных компаний для селекта
	const ownCompaniesList = useMemo(() => {
		return (
			ownCompanies?.map((item) => ({
				value: item.id,
				label: item.name,
			})) ?? []
		);
	}, [ownCompanies]);

	return { ownCompaniesList };
};

export default useFetchOwnCompanies;
