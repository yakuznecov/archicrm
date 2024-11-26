// логика загрузки расходов внутренних компаний
import { useEffect } from 'react';
import { useExpensesCompaniesColumns } from './useExpensesCompaniesColumns';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useContrAgentCostStore,
	useDepartmentsStore,
	useDateRangeStore,
} from '@/storeZustand';

export const useLoadExpensesCompanies = () => {
	// Диапазоны дат
	const [startDate, endDate] = useDateRangeStore(
		useShallow((state) => [state.startDate, state.endDate])
	);

	// Выбранный департамент
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	// загрузка расходов компаний
	const [loading, getContrAgentCost, contrAgentCostList] =
		useContrAgentCostStore(
			useShallow((state) => [
				state.loading,
				state.getContrAgentCost,
				state.contrAgentCostList,
			])
		);

	// загрузить все депозиты
	useEffect(() => {
		const data = {
			start_date: startDate,
			end_date: endDate,
			department_id: selectedDepartment,
		};

		getContrAgentCost(data);
	}, [startDate, endDate, selectedDepartment]);

	// колонки для таблицы расходов
	const columns = useExpensesCompaniesColumns();

	return {
		contrAgentCostList,
		loading,
		columns,
	};
};
