// Выбор нескольких дат на странице со статистикой
import { create } from 'zustand';
import dayjs from 'dayjs';

export const useDateRangeStore = create((set) => ({
	startDate: dayjs().format('YYYY-MM-DD'), // сегодняшняя дата
	endDate: dayjs().format('YYYY-MM-DD'),
	setStartDate: (date) => set({ startDate: date }),
	setEndDate: (date) => set({ endDate: date }),
}));