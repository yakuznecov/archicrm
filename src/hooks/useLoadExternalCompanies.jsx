// Загрузка внешних компаний с tanstack query
import { useMemo } from 'react';
import { useExternalCompaniesGet } from '@/hooks';
import { useDepartmentsStore } from '@/storeZustand';

const useLoadExternalCompanies = () => {
	// Выбранный департамент
	const selectedDepartment = useDepartmentsStore(
		(state) => state.selectedDepartment
	);

	// получение списка внешних компаний
	const { data, isFetching } = useExternalCompaniesGet(selectedDepartment);

	// Список внешних компаний для селекта
	const externalCompaniesList = useMemo(() => {
		return (
			data?.map((item) => ({
				value: item.id,
				label: item.name,
			})) ?? []
		);
	}, [data]);

	return { externalCompaniesList, isFetching };
};

export default useLoadExternalCompanies;
