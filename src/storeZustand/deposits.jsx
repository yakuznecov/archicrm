// Депозиты компаний
import { create } from 'zustand';
import { getDeposits, addDeposit, getDepositsParams, getSingleCompanyDeposits, getDepositsByDate, updateDeposit } from '@/services';

export const useDepositsStore = create((set) => ({
	depositList: [],
	companyDeposits: [], // депозиты компании
	selectedDeposit: {}, // выбранный депозит
	companyId: null,
	loading: false,
	filters: {},
	getDeposits: async () => {
		set({ loading: true });
		const depositList = await getDeposits();
		set({ depositList, loading: false });
	},
	getSingleCompanyDeposits: async (id) => {
		const companyDeposits = await getSingleCompanyDeposits(id);
		set({ companyDeposits, companyId: id });
	},
	// получить по дате
	getDepositsByDate: async (data) => {
		set({ loading: true });
		const depositList = await getDepositsByDate(data);
		set({ depositList, loading: false });
	},
	// Запрос с параметрами
	getDepositsParams: async (filters) => {
		set({ loading: true });
		const depositList = await getDepositsParams(filters);
		set({ depositList, loading: false });
	},
	addDeposit: async (data) => {
		await addDeposit(data);
	},
	// обновить депозит
	updateDeposit: async (data) => {
		await updateDeposit(data);
	},
	// Добавить фильтр
	addFilter: (filter) => set((state) => ({ filters: { ...state.filters, ...filter } })),
	// Сбросить фильтры
	resetFilters: () => set({ filters: {} }),
	// Выбранный депозит
	setSelectedDeposit: (deposit) => set({ selectedDeposit: deposit }),
}))