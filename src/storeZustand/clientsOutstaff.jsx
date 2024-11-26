// Сотрудники аутстафф
import { create } from 'zustand';
import { getClientsOutstaff, addClientOutstaff } from '@/services';

export const useClientsOutstaffStore = create((set) => ({
	clientsOutstaffList: [],
	loading: false,
	getClientsOutstaff: async () => {
		set({ loading: true });
		const clientsOutstaffList = await getClientsOutstaff();
		set({ clientsOutstaffList, loading: false });
	},
	// Добавить клиента
	addClientOutstaff: async (updatedClient) => {
		const customerId = await addClientOutstaff(updatedClient);
		return customerId;
	},
}));
