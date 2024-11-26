// Бонусы сотрудников
import { create } from 'zustand';
import {
	getPenaltyBonuses,
	getPenaltyBonusById,
	addPenaltyBonus,
	updatePenaltyBonus,
	patchPenaltyBonus,
	getPenaltyBonusByStaffId,
} from '@/services';

export const usePenaltyBonusStore = create((set) => ({
	penaltyBonusList: [],
	penaltyBonusById: {},
	penaltyBonusByStaffId: [],
	staffId: null,
	loading: false,
	isPenalty: false, // открыто ли окно штрафов
	getPenaltyBonuses: async (data) => {
		set({ loading: true });
		const penaltyBonusList = await getPenaltyBonuses(data);
		set({ penaltyBonusList, loading: false });
	},
	addPenaltyBonus: async (data) => {
		await addPenaltyBonus(data);
	},
	// бонусы по id
	getPenaltyBonusById: async (id) => {
		const penaltyBonusById = await getPenaltyBonusById(id);
		set({ penaltyBonusById });
	},
	getPenaltyBonusByStaffId: async (id, month, year) => {
		set({ loading: true, staffId: id });
		const penaltyBonusByStaffId = await getPenaltyBonusByStaffId(
			id,
			month,
			year
		);
		set({ penaltyBonusByStaffId, loading: false });
	},
	updatePenaltyBonus: async ({ id, data }) => {
		await updatePenaltyBonus({ id, data });
	},
	// частичное обновление бонусов и штрафов
	patchPenaltyBonus: async ({ id, data }) => {
		await patchPenaltyBonus({ id, data });
	},
	// открыто окно штрафов
	setIsPenalty: (value) => set({ isPenalty: value }),
}));
