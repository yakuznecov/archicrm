// логика загрузки заказов
import { useEffect } from 'react';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useContractOrdersStore } from '@/storeZustand';

export const useLoadOrders = () => {
	// Заказы
	const [contractOrdersList, getContractOrdersParams, loading] =
		useContractOrdersStore(
			useShallow((state) => [
				state.contractOrdersList,
				state.getContractOrdersParams,
				state.loading,
			])
		);
	// console.log('contractOrdersList', contractOrdersList);

	// загрузить все неоплаченные заказы
	useEffect(() => {
		const filters = {
			paid: 'false', // неоплаченные заказы
		};

		getContractOrdersParams(filters);
	}, []);

	// считаем общий amount
	const totalAmount = contractOrdersList?.reduce((acc, order) => {
		acc += order.amount;
		return acc;
	}, 0);

	// Группируем неоплаченные заказы по id компании
	const notPaidOrders = contractOrdersList?.reduce((acc, order) => {
		const companyId = order.contract?.customer_company?.id;

		if (!acc[companyId]) {
			acc[companyId] = {
				companyName: order.contract?.customer_company?.name,
				totalAmount: 0,
				orders: [],
			};
		}
		acc[companyId].totalAmount += order.amount;
		acc[companyId].orders.push(order);
		return acc;
	}, {});

	return { notPaidOrders, loading, totalAmount };
};
