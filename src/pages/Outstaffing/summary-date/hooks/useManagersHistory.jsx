// история оплат менеджеров
import { useToggle, useOrderPaymentsColumns } from '@/hooks';
import useManagersColumns from './useManagersColumns';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useContractOrdersStore } from '@/storeZustand';

export const useManagersHistory = () => {
	const [modal, toggleModal] = useToggle(false);

	// Оплаты заказов
	const [
		loading,
		orderPaymentsByManager,
		getContractOrdersByManager,
		addManagerId, // id менеджера при выборе истории его оплат
	] = useContractOrdersStore(
		useShallow((state) => [
			state.loading,
			state.orderPaymentsByManager,
			state.getContractOrdersByManager,
			state.addManagerId,
		])
	);

	const handleHistoryClick = (id) => {
		addManagerId(id);
		getContractOrdersByManager(id);
		toggleModal();
	};

	const columns = useManagersColumns(handleHistoryClick);
	// колонки в таблице оплат заказов
	const paymentsColumns = useOrderPaymentsColumns();

	return {
		modal,
		columns,
		toggleModal,
		paymentsColumns,
		handleHistoryClick,
		orderPaymentsByManager,
		loading,
	};
};
