// Учет рабочего времени и бонусы
import { create } from 'zustand';
import {
	getWorkingPeriod,
	addWorkingPeriod,
	updateWorkingPeriod,
	patchWorkingPeriod,
	getWorkingPeriodById,
} from '@/services';

export const useWorkingPeriodStore = create((set) => ({
	workingPeriodList: [],
	workingPeriodById: {}, // данные конкретного сотрудника
	loading: false,
	loadingById: false,
	getWorkingPeriod: async (data) => {
		set({ loading: true });
		const workingPeriodList = await getWorkingPeriod(data);
		set({ workingPeriodList, loading: false });
	},
	// получить данные по id
	getWorkingPeriodById: async (id) => {
		set({ loadingById: true });
		const workingPeriodById = await getWorkingPeriodById(id);
		set({ workingPeriodById, loadingById: false });
	},
	// Добавить время начала работы сотрудника
	addWorkingPeriod: async (newWorkingPeriod) => {
		await addWorkingPeriod(newWorkingPeriod);
	},
	updateWorkingPeriod: async (newWorkingPeriod) => {
		await updateWorkingPeriod(newWorkingPeriod);
	},
	patchWorkingPeriod: async ({ id, newWorkingPeriod }) => {
		await patchWorkingPeriod({ id, newWorkingPeriod });
	},
}));
