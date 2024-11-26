// SKU товары
import { create } from 'zustand';
import { addSkuSales, updateSkuSales } from '@/services';

export const useSkuSalesStore = create((set) => ({
	skuSalesList: [],
	addSkuSales: async (data) => {
		const sku = await addSkuSales(data);
		set((state) => ({ skuSalesList: [...state.skuSalesList, sku] }));
	},
	updateSkuSales: async (data) => {
		const sku = await updateSkuSales(data);
		set((state) => ({ skuSalesList: [...state.skuSalesList, sku] }));
	},
	clearSkuSales: () => {
		set({ skuSalesList: [] });
	}
}))