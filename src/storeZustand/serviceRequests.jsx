// Заявки
import { create } from 'zustand';
import {
	getServiceRequests,
	updateServiceRequest,
	getServiceRequestById,
} from '@/services';

export const useServiceRequestsStore = create((set) => ({
	serviceRequests: [],
	serviceRequest: {}, // одна заявка
	loading: false,
	serviceRequestsCount: 0,
	getServiceRequests: async (data) => {
		set({ loading: true });
		const serviceRequests = await getServiceRequests(data);
		if (data.selectedStatus === '1') {
			set({ serviceRequestsCount: serviceRequests?.length });
		}
		set({ serviceRequests, loading: false });
	},
	updateServiceRequest: async (data) => {
		await updateServiceRequest(data);
	},
	getServiceRequestById: async (id) => {
		const serviceRequest = await getServiceRequestById(id);
		set({ serviceRequest });
	},
	setServiceRequestCount: (count) => set({ serviceRequestsCount: count }),
}));
