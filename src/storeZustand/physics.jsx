// Физики
import { create } from 'zustand';
import { getPhysics, updatePhysic } from '@/services';

export const usePhysicsStore = create((set) => ({
	physicsList: [], // список физиков
	physicsCount: 0, // количество физиков
	loading: false,
	selectedPhysic: {}, // выбранный физик в процессе редактирования
	getPhysics: async () => {
		set({ loading: true });
		const physicsList = await getPhysics();
		set({ physicsList, loading: false, physicsCount: physicsList.length });
	},
	// обновить физика
	updatePhysic: async ({ id, data }) => {
		await updatePhysic({ id, data });
	},
	// выбранный физик
	setSelectedPhysic: (physic) => {
		set({ selectedPhysic: physic });
	}
}))