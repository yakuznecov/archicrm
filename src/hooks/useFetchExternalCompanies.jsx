// Загрузка внешних компаний
import { useEffect, useMemo } from 'react';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useCompaniesStore, useDepartmentsStore } from '@/storeZustand';

const useFetchExternalCompanies = () => {
	// Все компании
	const [getExternalCompanies, externalCompanies] = useCompaniesStore(
		useShallow((state) => [state.getExternalCompanies, state.externalCompanies])
	);

	// Выбранный департамент
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	// получение списка внешних компаний
	useEffect(() => {
		getExternalCompanies(selectedDepartment);
	}, []);

	// Список внешних компаний для селекта
	const externalCompaniesList = useMemo(() => {
		return (
			externalCompanies?.map((item) => ({
				value: item.id,
				label: item.name,
			})) ?? []
		);
	}, [externalCompanies]);

	return { externalCompaniesList, externalCompanies };
};

export default useFetchExternalCompanies;
