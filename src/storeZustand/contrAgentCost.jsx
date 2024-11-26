// Данные о расходах внутренних компаний
import { create } from 'zustand';
import { getContrAgentCost } from '@/services';

export const useContrAgentCostStore = create((set) => ({
	loading: false,
	contrAgentCostList: [],
	getContrAgentCost: async (data) => {
		set({ loading: true });
		const contrAgentCostList = await getContrAgentCost(data);
		set({ contrAgentCostList, loading: false });
	}
}))