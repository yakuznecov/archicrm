// ChartDataComponent.js
import {
	series1,
	options1,
	series2,
	options2,
	series3,
	options3,
	series4,
	options4,
} from './ChartData';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useDashboardStore } from '@/storeZustand';

const ChartDataLogic = () => {
	// Панель статистики на главной
	const [dashboard] = useDashboardStore(
		useShallow((state) => [state.dashboard])
	);

	const reports = [
		{
			id: 1,
			icon: 'mdi mdi-arrow-up-bold',
			title: 'Сумма в кассе',
			value: dashboard?.current_cash,
			prefix: '₽ ',
			suffix: '',
			badgeValue: '2.65%',
			decimal: 0,
			charttype: 'bar',
			chartheight: 40,
			chartwidth: 70,
			color: 'success',
			desc: 'с прошлой недели',
			series: series1,
			options: options1,
		},
		{
			id: 2,
			icon: 'mdi mdi-arrow-down-bold',
			title: 'Сумма за дату',
			value: dashboard?.day_payments,
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
			title: 'Сумма наличные',
			value: dashboard?.day_cash,
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
			title: 'Сумма безнал',
			value: dashboard?.day_transfer,
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

export default ChartDataLogic;
