// Доп. услуги
import { create } from 'zustand';
import { getAdditionalSales, updateAdditionalSales } from '@/services';

export const useAdditionalSalesStore = create((set) => ({
	additionalSalesList: [],
	getAdditionalSales: async () => {
		const additionalSalesList = await getAdditionalSales();
		set({ additionalSalesList });
	},
	updateAdditionalSales: async (data) => {
		await updateAdditionalSales(data);
	},
}));
