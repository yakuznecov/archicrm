// Панель статистики на главной
import { create } from 'zustand';
import { getDashboard } from '@/services';

export const useDashboardStore = create((set) => ({
	dashboard: {},
	getDashboard: async (idsBookings) => {
		const dashboard = await getDashboard(idsBookings);
		set({ dashboard });
	}
}))