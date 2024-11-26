// Контрагенты
import { create } from 'zustand';
import { getContrAgents, addContrAgent } from '@/services';

export const useContrAgentsStore = create((set) => ({
	contrAgentsList: [], // список контрагентов
	contrAgentsLoading: false, // загрузка контрагентов
	selectedContrAgent: {}, // выбранный контрагент
	getContrAgents: async () => {
		set({ contrAgentsLoading: true });
		const contrAgentsList = await getContrAgents();
		set({ contrAgentsList, contrAgentsLoading: false });
	},
	// добавить контрагента
	addContrAgent: async (data) => {
		await addContrAgent(data);
	},
	// выбрать контрагента
	setContrAgent: (data) => set({ selectedContrAgent: data }),
}));
