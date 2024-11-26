// Доверенность
import { create } from 'zustand';
import {
	getProcuratory,
	addProcuratory,
	updateProcuratory,
	getProcuratoryById,
} from '@/services';

export const useProcuratory = create((set) => ({
	procuratory: [],
	procuratoryById: {},
	selectedProcuratory: null,
	loading: false,
	getProcuratory: async () => {
		set({ loading: true });
		const procuratory = await getProcuratory();
		set({ procuratory, loading: false });
	},
	addProcuratory: async (procuratoryData) => {
		set({ loading: true });
		const procuratory = await addProcuratory(procuratoryData);
		set({ procuratory, loading: false });
	},
	getProcuratoryById: async (id) => {
		const procuratoryById = await getProcuratoryById(id);
		set({ procuratoryById });
	},
	updateProcuratory: async ({ id, procuratoryData }) => {
		await updateProcuratory({ id, procuratoryData });
	},
	setSelectedProcuratory: (procuratory) => {
		set({ selectedProcuratory: procuratory });
	},
}));
