// логика обновления таблицы с договорами при нажатии кнопки "Обновить"
import { useQueryClient } from '@tanstack/react-query';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useContractsStore, useDateRangeStore } from '@/storeZustand';

export const useUpdateContracts = () => {
	const queryClient = useQueryClient();

	// Договоры
	const [selectedCity, addFilter] = useContractsStore(
		useShallow((state) => [state.selectedCity, state.addFilter])
	);

	// Диапазоны дат из Zustand store
	const [startDate, endDate] = useDateRangeStore(
		useShallow((state) => [state.startDate, state.endDate])
	);

	const handleUpdateContracts = async () => {
		const filters = {
			city: selectedCity,
			fire: 'true',
			start_date: startDate,
			end_date: endDate,
			last_name: null,
			first_name: null,
			contract_number: null,
		};

		await queryClient.invalidateQueries(['outstaffContracts']); // Очистка кеша
		await addFilter(filters);
	};

	return {
		handleUpdateContracts,
	};
};
