// Клиенты компании
import { create } from 'zustand';
import { getCustomers, addCustomer, updateCustomer, patchCustomer, searchCustomer, fetchCustomerBookings } from '@/services';

export const useCustomersStore = create((set) => ({
	customersList: [],
	customerData: {},
	customerBookings: [],
	selectedCustomer: {},
	loading: false,
	getCustomers: async () => {
		set({ loading: true });
		const customersList = await getCustomers();
		set({ customersList, loading: false });
	},
	addCustomer: async (customer) => {
		set({ loading: true });
		const customerData = await addCustomer(customer);
		set({ customerData, loading: false });
	},
	updateCustomer: async ({ changedCustomer, id }) => {
		await updateCustomer({ changedCustomer, id });
	},
	// Обновить класс клиента
	patchCustomer: async ({ id, classData }) => {
		await patchCustomer({ id, classData });
	},
	// Поиск клиента
	searchCustomer: async (phone) => {
		set({ loading: true });
		const customersList = await searchCustomer(phone);
		set({ customersList, loading: false });
	},
	// Записи клиента
	fetchCustomerBookings: async (customerId) => {
		set({ loading: true });
		const customerBookings = await fetchCustomerBookings(customerId);
		set({ customerBookings, loading: false });
	},
	// Выбранный пользователь
	setSelectedCustomer: (customer) => {
		set({ selectedCustomer: customer });
	}
}))