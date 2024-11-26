// Зарплата аутстафф
import { create } from 'zustand';

export const useSalaryStore = create((set) => ({
	salaryDeloList: [], // список делопроизводителей
	salaryManagersList: [], // список менеджеров
	salaryBuhList: [], // список бухгалтеров
	salaryCourierList: [], // список курьеров
	loadingCourier: false, // лоадер курьеры
	bonusModal: false,
	userInfo: '', // имя и фамилия сотрудника в таблице
	toggleBonusModal: () => set((state) => ({ bonusModal: !state.bonusModal })),
	penaltyModal: false,
	togglePenaltyModal: () =>
		set((state) => ({ penaltyModal: !state.penaltyModal })),
	setUserInfo: (data) => set({ userInfo: data }),
	setSalaryManagersList: (data) => set({ salaryManagersList: data }),
	setSalaryDeloList: (data) => set({ salaryDeloList: data }),
	setSalaryBuhList: (data) => set({ salaryBuhList: data }),
	setSalaryCourierList: (data) => set({ salaryCourierList: data }),
}));
