// логика загрузки оплат заказов
import { useEffect } from 'react';
import { format } from 'date-fns';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useContractOrdersStore, useCalendarStore } from '@/storeZustand';

const useLoadOrdersPayments = () => {
	const [startDate] = useCalendarStore((state) => [state.startDate]);
	const formattedStartDate = format(startDate, 'yyyy-MM-dd');

	// Оплаты заказов
	const [loading, contractOrderPayments, getOrderPaymentsByDate] =
		useContractOrdersStore(
			useShallow((state) => [
				state.loading,
				state.contractOrderPayments,
				state.getOrderPaymentsByDate,
			])
		);

	// загрузить все оплаты
	useEffect(() => {
		getOrderPaymentsByDate({
			start_date: formattedStartDate,
			end_date: formattedStartDate,
		});
	}, [startDate]);

	// Группируем оплаты по id компании
	const orderPayments =
		contractOrderPayments &&
		contractOrderPayments?.reduce((acc, payment) => {
			const companyId = payment.contract_order.contract?.customer_company?.id;
			if (!acc[companyId]) {
				acc[companyId] = {
					companyName: payment.contract_order.contract?.customer_company?.name,
					totalAmount: 0,
					payments: [],
				};
			}
			acc[companyId].totalAmount += payment.amount;
			acc[companyId].payments.push(payment);
			return acc;
		}, {});

	return {
		contractOrderPayments,
		loading,
		orderPayments,
	};
};

export default useLoadOrdersPayments;
