// Панель статистики на странице оплат аутстафф
import { create } from 'zustand';
import { getOutstaffDashboard } from '@/services';

export const useOutstaffDashboardStore = create((set) => ({
	dashboardList: {},
	getOutstaffDashboard: async (filters) => {
		const dashboardList = await getOutstaffDashboard(filters);
		set({ dashboardList });
	}
}))