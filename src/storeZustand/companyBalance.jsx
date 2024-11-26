// Баланс внутренних компаний с приходами от внешних контрагентов
import { create } from 'zustand';
import { getCompanyBalanceData } from '@/services';

export const useCompanyBalanceStore = create((set) => ({
	companyBalanceList: [],
	loading: false,
	getCompanyBalanceData: async (data) => {
		set({ loading: true });
		const companyBalanceList = await getCompanyBalanceData(data);
		set({ companyBalanceList, loading: false });
	}
}))