// фильтры на странице оплат
import { useState, useEffect } from 'react';
import { useSearch, usePaymentTypeOrders } from '@/hooks';
import { errorToast } from '@/components';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useContractOrdersStore } from '@/storeZustand';

const useOrderPaymentsFilters = () => {
	const [contractOrderId, setContractOrderId] = useState(null);
	// выбранный контрагент
	const [selectedContrAgent, setSelectedContrAgent] = useState(null);
	// Тип оплаты как параметр фильтрации
	const {
		paymentType,
		setPaymentType,
		paymentTypeOptions,
		handlePaymentTypeChange,
	} = usePaymentTypeOrders();

	// Оплаты заказов
	const [
		loading,
		orderFilters,
		addOrderFilter,
		resetFilters,
		contractOrderPayments,
		getOrderPayments,
		getOrderPaymentsParams,
	] = useContractOrdersStore(
		useShallow((state) => [
			state.loading,
			state.orderFilters,
			state.addOrderFilter,
			state.resetFilters,
			state.contractOrderPayments,
			state.getOrderPayments,
			state.getOrderPaymentsParams,
		])
	);

	useEffect(() => {
		getOrderPayments();
	}, []);

	// Сброс поля ввода id заказа для фильтрации
	useEffect(() => {
		if (Object.keys(orderFilters).length === 0) {
			setContractOrderId(null);
			setPaymentType(null);
			getOrderPayments();
		}
	}, [orderFilters]);

	// глобальный поиск в таблице
	const { onSearch, filteredSearchData } = useSearch(contractOrderPayments);

	// функция сохранения id заказа из инпута
	const handleContractOrderIdChange = (e) => {
		const value = e.target.value;
		setContractOrderId(value);
		addOrderFilter({ contract_order_id: value });
	};

	// Изменение внешней компании
	const handleContrAgentChange = (value) => {
		setSelectedContrAgent(value);

		const filters = {
			contr_agent_id: value, // выбранный контрагент
		};

		addOrderFilter(filters);
	};

	// Применить фильтры
	const applyFilters = async () => {
		const fetchData = async () => {
			try {
				await getOrderPaymentsParams(orderFilters);
			} catch (error) {
				errorToast('Произошла ошибка при загрузке оплат заказов.');
			}
		};

		fetchData();
	};

	return {
		loading,
		paymentType,
		resetFilters,
		contractOrderId,
		selectedContrAgent,
		paymentTypeOptions,
		filteredSearchData,
		onSearch,
		applyFilters,
		handleContrAgentChange,
		handlePaymentTypeChange,
		handleContractOrderIdChange,
	};
};

export default useOrderPaymentsFilters;
