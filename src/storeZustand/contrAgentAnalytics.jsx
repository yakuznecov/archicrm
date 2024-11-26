// Аналитика контрагентов
import { create } from 'zustand';
import { postAnalytics, postAnalyticsByDate } from '@/services';

export const useContrAgentAnalyticsStore = create((set) => ({
	analyticsList: [],
	analyticsListByDate: [],
	loading: false,
	postAnalytics: async (data) => {
		set({ loading: true });
		const analyticsList = await postAnalytics(data);
		set({ analyticsList, loading: false });
	},
	postAnalyticsByDate: async (data) => {
		const analyticsListByDate = await postAnalyticsByDate(data);
		set({ analyticsListByDate });
	}
}))