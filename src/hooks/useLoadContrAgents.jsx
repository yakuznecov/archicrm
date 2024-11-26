// Загрузка контрагентов
import { useEffect, useMemo } from 'react';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useDepartmentsStore, useContrAgentsStore } from '@/storeZustand';

const useLoadContrAgents = () => {
	// Все контрагенты
	const [getContrAgents, contrAgentsList, contrAgentsLoading] =
		useContrAgentsStore(
			useShallow((state) => [
				state.getContrAgents,
				state.contrAgentsList,
				state.contrAgentsLoading,
			])
		);

	// Выбранный департамент
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	// получение списка контрагентов
	useEffect(() => {
		getContrAgents(selectedDepartment);
	}, []);

	// Список контрагентов для селекта
	const contrAgentsItems = useMemo(() => {
		return (
			contrAgentsList?.map((item) => ({
				value: item.id,
				label: `${item?.user ? '✔️' : '❌'} ${
					item.company?.name ||
					`${item.physic?.second_name} ${item.physic?.first_name} || ${item?.type}`
				}`, // внешняя, либо физик
				second_name: item.company?.name || `${item.physic?.second_name}`,
				first_name: item?.physic?.first_name,
				last_name: item?.physic?.last_name,
				phone: item?.physic?.phone,
				type: item?.type,
			})) ?? []
		);
	}, [contrAgentsList]);

	return { contrAgentsItems, contrAgentsLoading };
};

export default useLoadContrAgents;
