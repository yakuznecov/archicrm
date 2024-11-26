// Услуги компании
import { create } from 'zustand';
import { getCompanyServices, getCompanyServicesByDepartment } from '@/services';

export const useCompanyServicesStore = create((set) => ({
	servicesList: [],
	loading: false,
	getCompanyServices: async () => {
		set({ loading: true });
		const servicesList = await getCompanyServices();
		set({ servicesList, loading: false });
	},
	// Загрузка услуг по департаменту
	getCompanyServicesByDepartment: async (departmentId) => {
		set({ loading: true });
		const servicesList = await getCompanyServicesByDepartment(departmentId);
		set({ servicesList, loading: false });
	}
}))