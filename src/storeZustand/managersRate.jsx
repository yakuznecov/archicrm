// Личный процент менеджеров
import { create } from 'zustand';
import { postManagersRate } from '@/services';

export const useManagersRateStore = create((set) => ({
	postManagersRate: async (data) => {
		await postManagersRate(data);
	},
}));
