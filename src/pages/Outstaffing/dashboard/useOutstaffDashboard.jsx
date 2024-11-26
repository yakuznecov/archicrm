// Загрузка данных для дашборда аутстафф
import { useEffect } from 'react';
import {
	series1,
	options1,
	series2,
	options2,
	series3,
	options3,
	series4,
	options4,
} from './chartDashboardData';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useOutstaffDashboardStore,
	useContrAgentBalanceStore,
} from '@/storeZustand';

const useOutstaffDashboard = () => {
	// Панель статистики на странице заказов аустафф
	const [dashboardList, getOutstaffDashboard] = useOutstaffDashboardStore(
		useShallow((state) => [state.dashboardList, state.getOutstaffDashboard])
	);

	// Баланс компании
	const [companyBalance, companyName] = useContrAgentBalanceStore(
		useShallow((state) => [state.companyBalance, state.companyName])
	);

	useEffect(() => {
		getOutstaffDashboard();
	}, []);

	const reports = [
		{
			id: 1,
			icon: 'mdi mdi-arrow-up-bold',
			title: 'Наличные',
			value: dashboardList?.cash_paid,
			prefix: '₽ ',
			suffix: '',
			badgeValue: '2.65%',
			decimal: 0,
			charttype: 'radialBar',
			chartheight: 45,
			chartwidth: 70,
			color: 'success',
			desc: 'с прошлой недели',
			series: series1,
			options: options1,
		},
		{
			id: 2,
			icon: 'mdi mdi-arrow-down-bold',
			title: 'Безнал',
			value: dashboardList?.transfer_paid,
			decimal: 0,
			charttype: 'radialBar',
			chartheight: 45,
			chartwidth: 45,
			prefix: '₽ ',
			suffix: '',
			badgeValue: '0.82%',
			color: 'danger',
			desc: 'с прошлой недели',
			series: series2,
			options: options2,
		},
		{
			id: 3,
			icon: 'mdi mdi-arrow-down-bold',
			title: 'Неоплачено',
			value: dashboardList?.not_paid_contract,
			decimal: 0,
			charttype: 'radialBar',
			chartheight: 45,
			chartwidth: 45,
			prefix: '₽ ',
			suffix: '',
			badgeValue: '0.82%',
			color: 'danger',
			desc: 'с прошлой недели',
			series: series3,
			options: options3,
		},
		{
			id: 4,
			icon: 'mdi mdi-arrow-down-bold',
			title: `Баланс: ${companyName}`,
			value: companyBalance?.balance,
			decimal: 0,
			charttype: 'radialBar',
			chartheight: 45,
			chartwidth: 45,
			prefix: '₽ ',
			suffix: '',
			badgeValue: '0.82%',
			color: 'danger',
			desc: 'с прошлой недели',
			series: series4,
			options: options4,
		},
	];

	return reports;
};

export default useOutstaffDashboard;
