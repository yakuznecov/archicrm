// Данные о приходе контрагентов
import { create } from 'zustand';
import { getContrAgentData } from '@/services';

export const useContrAgentDataStore = create((set) => ({
	contrAgentDataList: [],
	loading: false,
	getContrAgentData: async (data) => {
		set({ loading: true });
		const contrAgentDataList = await getContrAgentData(data);
		set({ contrAgentDataList, loading: false });
	}
}))