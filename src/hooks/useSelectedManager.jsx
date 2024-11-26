// useSelectedManager Выбор менеджера аутстафф
import { useEffect, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useStaffStore, useDepartmentsStore } from '@/storeZustand';

const useSelectedManager = () => {
	// Выбранный департамент
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	// Сотрудники аутстафф
	const [managersList, getOutstaffManagers] = useStaffStore(
		useShallow((state) => [state.managersList, state.getOutstaffManagers])
	);

	// Загрузка менеджеров департамента
	useEffect(() => {
		if (selectedDepartment) {
			getOutstaffManagers(selectedDepartment);
		}
	}, [selectedDepartment]);

	// Список сотрудников для селекта
	const outstaffManagerList = useMemo(() => {
		return (
			managersList?.map((manager) => ({
				value: manager.id,
				label: `${manager.surname} ${manager.name}`,
			})) ?? []
		);
	}, [managersList]);

	return { outstaffManagerList };
};

export default useSelectedManager;
