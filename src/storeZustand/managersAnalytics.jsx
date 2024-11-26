// Аналитика менеджеров
import { create } from 'zustand';
import { getManagersAnalytics } from '@/services';

export const useManagersAnalyticsStore = create((set) => ({
	managersAnalyticsList: [],
	loading: false,
	getManagersAnalytics: async (data) => {
		set({ loading: true });
		const managersAnalyticsList = await getManagersAnalytics(data);
		set({ managersAnalyticsList, loading: false });
	}
}))