// фильтры в модалке продаж менеджеров
import { useState } from 'react';
import { useLoadContrAgents } from '@/hooks';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useContractOrdersStore } from '@/storeZustand';

export default function useManagersFilters() {
	// выбранный контрагент
	const [selectedContrAgent, setSelectedContrAgent] = useState(null);

	// Оплаты заказов
	const [
		loading,
		orderFilters,
		addOrderFilter,
		resetFilters,
		contractOrderPayments,
		getOrderPayments,
		getOrderPaymentsParams,
		getContractOrdersByManager,
		managerId,
	] = useContractOrdersStore(
		useShallow((state) => [
			state.loading,
			state.orderFilters,
			state.addOrderFilter,
			state.resetFilters,
			state.contractOrderPayments,
			state.getOrderPayments,
			state.getOrderPaymentsParams,
			state.getContractOrdersByManager,
			state.managerId,
		])
	);

	// Загрузка списка контрагентов
	const { contrAgentsItems } = useLoadContrAgents();

	// Изменение внешней компании
	const handleContrAgentChange = (value) => {
		setSelectedContrAgent(value);
		getContractOrdersByManager(managerId, value);
	};

	return { selectedContrAgent, contrAgentsItems, handleContrAgentChange };
}
