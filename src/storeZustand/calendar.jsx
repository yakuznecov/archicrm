// календарь

import { create } from 'zustand';

const today = new Date();

export const useCalendarStore = create((set) => ({
	startDate: today,
	handleSetDate: (date) => {
		set({ startDate: date })
	},
}))