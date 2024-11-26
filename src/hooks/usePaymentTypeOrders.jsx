// Тип оплаты заказов (нал, безнал)
import { useState } from 'react';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useContractOrdersStore } from '@/storeZustand';

const usePaymentTypeOrders = () => {
	const [paymentType, setPaymentType] = useState(null);

	const paymentTypeOptions = [
		{ value: 1, label: 'Нал' },
		{ value: 2, label: 'Безнал' },
	];

	// Заказы
	const [addOrderFilter] = useContractOrdersStore(
		useShallow((state) => [state.addOrderFilter])
	);

	// Нал или безнал
	const handlePaymentTypeChange = (event) => {
		const value = event.target.value;
		setPaymentType(value);
		addOrderFilter({ payment_type_id: value });
	};

	return {
		paymentType,
		setPaymentType,
		paymentTypeOptions,
		handlePaymentTypeChange,
	};
};

export default usePaymentTypeOrders;
