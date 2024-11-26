// Визиты клиентов по абонементам
import { create } from 'zustand';
import { getVisits, getVisitById } from '@/services';

export const useVisitStore = create((set) => ({
	visits: [],
	singleVisit: {},
	getVisits: async () => {
		const visits = await getVisits();
		set({ visits });
	},
	getVisitById: async (id) => {
		const singleVisit = await getVisitById(id);
		set({ singleVisit });
	},
	clearSingleVisit: () => {
		set({ singleVisit: {} });
	},
}));
