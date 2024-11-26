// Учет рабочего времени и бонусы
import { create } from 'zustand';
import { getWorkShedule, updateSpecialist, newDateSpecialist, deleteDate } from '@/services';

export const useWorkSheduleStore = create((set) => ({
	workShedule: [],
	loading: false,
	getWorkShedule: async (data) => {
		set({ loading: true });
		const workShedule = await getWorkShedule(data);
		set({ workShedule, loading: false });
	},
	updateSpecialist: async (data) => {
		await updateSpecialist(data);
	},
	newDateSpecialist: async (data) => {
		await newDateSpecialist(data);
	},
	deleteDate: async (id) => {
		await deleteDate(id);
	},
	clearWorkShedule: () => set({ workShedule: [] }),
}))