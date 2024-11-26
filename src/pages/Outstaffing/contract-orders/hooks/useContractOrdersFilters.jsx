// логика фильтрации заказов по параметрам
import { useEffect, useState } from 'react';
import { errorToast } from '@/components';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useContractOrdersStore,
	useOutstaffDashboardStore,
	useContrAgentBalanceStore,
} from '@/storeZustand';

const useContractOrdersFilters = () => {
	// выбранный менеджер
	const [selectedManager, setSelectedManager] = useState(null);
	// выбранный контрагент
	const [selectedContrAgent, setSelectedContrAgent] = useState(null);
	// номер договора
	const [contractNumber, setContractNumber] = useState('');

	// Заказы к договорам
	const [
		orderFilters,
		getContractOrders,
		getContractOrdersParams,
		addOrderFilter,
		resetFilters,
	] = useContractOrdersStore(
		useShallow((state) => [
			state.orderFilters,
			state.getContractOrders,
			state.getContractOrdersParams,
			state.addOrderFilter,
			state.resetFilters,
		])
	);

	// Получить баланс выбранной компании заказчика
	const [getContrAgentBalance, clearBalance] = useContrAgentBalanceStore(
		useShallow((state) => [state.getContrAgentBalance, state.clearBalance])
	);

	// Дашборд
	const [getOutstaffDashboard] = useOutstaffDashboardStore(
		useShallow((state) => [state.getOutstaffDashboard])
	);

	// Применить фильтры
	const applyFilters = async () => {
		const fetchData = async () => {
			try {
				await getContractOrdersParams(orderFilters);
				await getOutstaffDashboard(orderFilters);
			} catch (error) {
				errorToast('Произошла ошибка при загрузке заказов.');
			}
		};

		fetchData();
	};

	// Сброс значений в фильтрах
	useEffect(() => {
		if (Object.keys(orderFilters).length === 0) {
			setContractNumber('');
			setSelectedManager(null);
			setSelectedContrAgent(null);
			clearBalance();
		}
	}, [orderFilters]);

	// Изменение менеджера
	const handleManagerChange = (value) => {
		setSelectedManager(value);

		const filters = {
			manager_id: value,
		};

		addOrderFilter(filters);
	};

	// Фильтр по номеру договора
	const handleContractNumberChange = (event) => {
		setContractNumber(event.target.value);

		const filters = {
			contract_number: event.target.value,
		};

		addOrderFilter(filters);
	};

	// Обновление контрагента
	const handleContrAgentChange = (value) => {
		if (!value) {
			clearBalance();
			return;
		}

		setSelectedContrAgent(value);

		const filters = {
			contr_agent_id: value, // выбранный контрагент
		};

		// Получить имя выбранной компании
		// const externalCompany = externalCompanies?.find(
		// 	(company) => company.id === value
		// );

		// if (externalCompany) {
		// 	setCompanyName(externalCompany.name); // записать имя выбранной компании
		// }

		// Запрос баланса выбранной компании
		if (value) {
			getContrAgentBalance(value);
		} else {
			clearBalance(); // сброс баланса
		}

		addOrderFilter(filters);
	};

	return {
		selectedManager,
		selectedContrAgent,
		contractNumber,
		resetFilters,
		handleManagerChange,
		applyFilters,
		handleContrAgentChange,
		handleContractNumberChange,
	};
};

export default useContractOrdersFilters;
