// логика фильтрации депозитов
import { useState, useEffect } from 'react';
import { errorToast } from '@/components';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useContrAgentDepositsStore } from '@/storeZustand';
import { useLoadContrAgents } from '@/hooks';

const useDepositFilters = () => {
	// тип оплаты
	const [paymentType, setPaymentType] = useState(null);

	// Выбранный контрагент для фильтрации
	const [selectedContrAgentFilter, setSelectedContrAgentFilter] =
		useState(null);

	// выбранный менеджер
	const [selectedManager, setSelectedManager] = useState(null);

	// Депозиты контрагентов
	const [
		getContrAgentDeposits,
		getContrAgentDepositsParams,
		filters,
		addFilter,
		resetFilters,
	] = useContrAgentDepositsStore(
		useShallow((state) => [
			state.getContrAgentDeposits,
			state.getContrAgentDepositsParams,
			state.filters,
			state.addFilter,
			state.resetFilters,
		])
	);

	// Сброс селектов в фильтрах
	useEffect(() => {
		if (Object.keys(filters).length === 0) {
			getContrAgentDeposits();
			setSelectedManager(null);
			setSelectedContrAgentFilter(null);
			setPaymentType(null);
		}
	}, [filters]);

	// Загрузка списка контрагентов
	const { contrAgentsItems } = useLoadContrAgents();

	// Выбор контрагента для фильтрации
	const handleContrAgentFilterChange = (value) => {
		setSelectedContrAgentFilter(value);

		const filters = {
			contr_agent_id: value, // выбранный контрагент
		};

		addFilter(filters);
	};

	// Изменение менеджера
	const handleManagerChange = (value) => {
		setSelectedManager(value);

		const filters = {
			manager_id: value,
		};

		addFilter(filters);
	};

	// Нал или безнал
	const handlePaymentTypeChange = (event) => {
		const value = event.target.value;
		setPaymentType(value);
		addFilter({ payment_type_id: value });
	};

	// Применить фильтры
	const applyFilters = async () => {
		try {
			await getContrAgentDepositsParams(filters);
		} catch (error) {
			errorToast('Произошла ошибка при загрузке депозитов.');
		}
	};

	return {
		selectedContrAgentFilter,
		selectedManager,
		paymentType,
		contrAgentsItems,
		resetFilters,
		applyFilters,
		handleManagerChange,
		handlePaymentTypeChange,
		handleContrAgentFilterChange,
	};
};

export default useDepositFilters;
