// Касса
import { create } from 'zustand';
import { getCashier } from '@/services';

export const useCashierStore = create((set) => ({
	cashList: [],
	loading: false,
	cashierStatus: '',
	getCashier: async ({ department_id, start_date, end_date }) => {
		set({ loading: true, cashierStatus: 'pending' });
		const cashList = await getCashier({ department_id, start_date, end_date });
		set({ cashList, loading: false, cashierStatus: 'success' });
	}
}))