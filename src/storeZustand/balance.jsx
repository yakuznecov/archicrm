// Баланс контрагента
import { create } from 'zustand';
import { getContrAgentBalance } from '@/services';

export const useContrAgentBalanceStore = create((set) => ({
	companyBalance: {},
	companyName: '',
	loading: false,
	getContrAgentBalance: async (id) => {
		set({ loading: true });
		const companyBalance = await getContrAgentBalance(id);
		set({ companyBalance });

		setTimeout(() => {
			set({ loading: false });
		}, 700);
	},
	setCompanyName: (name) => set({ companyName: name }),
	// очистить баланс
	clearBalance: () => set({ companyBalance: 0 }),
}));
