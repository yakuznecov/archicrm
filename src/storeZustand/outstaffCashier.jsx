// Касса аутстафф
import { create } from 'zustand';
import { getOutstaffCashier, getOutstaffCashierByDate, getOutstaffCashierByDepartment } from '@/services';

export const useOutstaffCashierStore = create((set) => ({
	outstaffCashierList: [],
	outstaffCashierByDateList: [], // список по дате
	outstaffCashierByDepartment: 0,
	loading: false,
	loadingBalance: false,
	getOutstaffCashier: async () => {
		set({ loading: true });
		const outstaffCashierList = await getOutstaffCashier();
		set({ outstaffCashierList, loading: false });
	},
	// загрузка кассы по дате
	getOutstaffCashierByDate: async (data) => {
		set({ loading: true });
		const outstaffCashierByDateList = await getOutstaffCashierByDate(data);
		set({ outstaffCashierByDateList, loading: false });
	},
	// загрузка кассы по департаменту
	getOutstaffCashierByDepartment: async (data) => {
		set({ loadingBalance: true });
		const outstaffCashierByDepartment = await getOutstaffCashierByDepartment(data);
		set({
			outstaffCashierByDepartment: outstaffCashierByDepartment.cash_balance, loadingBalance: false
		});
	}
}))