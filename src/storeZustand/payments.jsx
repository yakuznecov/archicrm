// Оплаты записей
import { create } from 'zustand';
import { getPayments, getPaymentById } from '@/services';

export const usePaymentsStore = create((set) => ({
	paymentsList: [],
	paymentById: {}, // выбранная оплата по id
	isModalOpen: false,
	loading: false,
	getPayments: async (filteredData) => {
		set({ loading: true });
		const paymentsList = await getPayments(filteredData);
		set({ paymentsList, loading: false });
	},
	getPaymentById: async (id) => {
		const paymentById = await getPaymentById(id);
		set({ paymentById });
	},
	setIsModalOpen: (value) => set({ isModalOpen: value }),
}))