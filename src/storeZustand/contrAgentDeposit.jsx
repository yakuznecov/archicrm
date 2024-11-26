// Депозиты контрагентов
import { create } from 'zustand';
import {
	getContrAgentDeposits,
	addContrAgentDeposit,
	updateContrAgentDeposit,
	getSingleContrAgentDeposits,
	getContrAgentDepositsParams,
} from '@/services';

export const useContrAgentDepositsStore = create((set) => ({
	contrAgentDepositsList: [], // список депозитов контрагентов
	selectedContrAgentDeposit: {}, // выбранный депозит контрагента
	singleContrAgentDeposit: {}, // один депозит контрагента
	contrAgentId: null,
	loading: false,
	filters: {}, // фильтры для параметров в запросе
	getContrAgentDeposits: async (data) => {
		set({ loading: true });
		const contrAgentDepositsList = await getContrAgentDeposits(data);
		set({ contrAgentDepositsList, loading: false });
	},
	getSingleContrAgentDeposits: async (id) => {
		const singleContrAgentDeposit = await getSingleContrAgentDeposits(id);
		set({ singleContrAgentDeposit, contrAgentId: id });
	},
	// Запрос с параметрами
	getContrAgentDepositsParams: async (filters) => {
		set({ loading: true });
		const contrAgentDepositsList = await getContrAgentDepositsParams(filters);
		set({ contrAgentDepositsList, loading: false });
	},
	// добавить депозит контрагента
	addContrAgentDeposit: async (data) => {
		await addContrAgentDeposit(data);
	},
	// обновить депозит контрагента
	updateContrAgentDeposit: async (data) => {
		await updateContrAgentDeposit(data);
	},
	// Выбранный депозит
	setSelectedContrAgentDeposit: (data) => {
		set({ selectedContrAgentDeposit: data });
	},
	// Добавить фильтр
	addFilter: (filter) =>
		set((state) => ({ filters: { ...state.filters, ...filter } })),
	// Сбросить фильтры
	resetFilters: () => set({ filters: {} }),
}));
