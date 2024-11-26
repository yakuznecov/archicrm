// Статусы оплат заказов для фильтрации
import { useState, useEffect } from 'react';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useContractOrdersStore } from '@/storeZustand';

// Статусы оплат заказов
const useStatusPaymentOrders = () => {
	const [statusPayment, setStatusPayment] = useState('');

	// Добавление параметра фильтрации
	const [orderFilters, addOrderFilter] = useContractOrdersStore(
		useShallow((state) => [state.orderFilters, state.addOrderFilter])
	);

	// Сброс внешней компании
	useEffect(() => {
		if (Object.keys(orderFilters).length === 0) {
			setStatusPayment('');
		}
	}, [orderFilters]);

	// Оплачено, либо нет (true/false)
	const handleStatusPaymentChange = (event) => {
		const value = event.target.value;
		setStatusPayment(value);
		addOrderFilter({ paid: value });
	};

	const paymentOptions = [
		{ value: '', label: 'Все' },
		{ value: 'true', label: 'Оплачено' },
		{ value: 'false', label: 'Неоплачено' },
	];

	return {
		statusPayment,
		paymentOptions,
		handleStatusPaymentChange,
	};
};

export default useStatusPaymentOrders;
