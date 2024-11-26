// логика обновления таблицы с заказами при нажатии кнопки "Обновить"

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useContractOrdersStore, useDateRangeStore } from '@/storeZustand';

export const useUpdateOrders = () => {
	// Диапазоны дат
	const [startDate, endDate] = useDateRangeStore(
		useShallow((state) => [state.startDate, state.endDate])
	);

	// Заказы
	const [getContractOrdersByDate] = useContractOrdersStore(
		useShallow((state) => [state.getContractOrdersByDate])
	);

	const handleUpdateOrders = () => {
		const data = {
			start_date: startDate,
			end_date: endDate,
		};

		getContractOrdersByDate(data);
	};

	return {
		handleUpdateOrders,
	};
};
