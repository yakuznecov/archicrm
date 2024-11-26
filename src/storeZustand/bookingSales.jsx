// Доп. услуги
import { create } from 'zustand';
import { getBookingSales, addBookingSales, updateBookingSales } from '@/services';

export const useBookingSalesStore = create((set) => ({
	bookingSalesList: [],
	getBookingSales: async () => {
		const bookingSalesList = await getBookingSales();
		set({ bookingSalesList });
	},
	addBookingSales: async (data) => {
		const bookingSale = await addBookingSales(data);
		set((state) => ({ bookingSalesList: [...state.bookingSalesList, bookingSale] }));
	},
	updateBookingSales: async (data) => {
		const bookingSale = await updateBookingSales(data);
		set((state) => ({ bookingSalesList: [...state.bookingSalesList, bookingSale] }));
	},
	clearBookingSales: () => {
		set({ bookingSalesList: [] });
	}
}))