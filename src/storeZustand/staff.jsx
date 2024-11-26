// Сотрудники
import { create } from 'zustand';
import {
	getStaff,
	updateStaff,
	getAdminStaff,
	getStaffByGroup,
	getOutstaffWorkers,
	getCallcenterStaff,
	getDepartmentStaff,
	getSpecialistStaff,
	checkBookingExists,
	getOutstaffManagers,
	getStaffByGroupSingle,
	getOutstaffByDepartment,
	getStaffByCallcenter,
} from '@/services';

export const useStaffStore = create((set) => ({
	staffList: [],
	departmentStaff: [],
	workScheduleStaffList: [], // сотрудники в графике рабочего времени
	specialistStaffList: [], // специалисты компании
	adminStaffList: [], // администраторы компании
	outstaffWorkersList: [], // сотрудники аутстафф
	managersList: [],
	staffByBuhList: [], // сотрудники бухгалтерии
	staffByCourierList: [], // курьеры
	staffDeloList: [], // сотрудники делопроизводства
	staffCallcenter: [], // сотрудники Callcenter
	singleStaff: {}, // сотрудник выбранный
	loading: false,
	loadingStaff: false,
	loadingCallcenter: false,
	loadingCourier: false,
	bookingsExists: false, // свободное время специалиста
	// Получение сотрудников (пока не используется)
	getStaff: async () => {
		set({ loading: true });
		const staffList = await getStaff();
		set({ staffList, loading: false });
	},
	getDepartmentStaff: async (departmentId) => {
		set({ loading: true });
		const departmentStaff = await getDepartmentStaff(departmentId);
		set({ departmentStaff, loading: false });
	},
	// Получение специалистов компании
	getSpecialistStaff: async (departmentId) => {
		set({ loading: true });
		const workScheduleStaffList = await getSpecialistStaff(departmentId);
		set({ workScheduleStaffList, loading: false });
	},
	// Получение администраторов компании
	getAdminStaff: async (departmentId) => {
		set({ loading: true });
		const workScheduleStaffList = await getAdminStaff(departmentId);
		set({ workScheduleStaffList, loading: false });
	},
	// Получение сотрудников Callcenter для графика рабочего времени
	getCallcenterStaff: async () => {
		set({ loading: true });
		const workScheduleStaffList = await getCallcenterStaff();
		set({ workScheduleStaffList, loading: false });
	},
	// Получение сотрудников по группе sanatera и департаменту
	getStaffByGroup: async (departmentId) => {
		set({ loadingStaff: true });
		const staffList = await getStaffByGroup(departmentId);
		set({ staffList, loadingStaff: false });
	},
	// Получение сотрудников Callcenter для учета рабочего времени
	getStaffByCallcenter: async () => {
		set({ loadingCallcenter: true });
		const staffCallcenter = await getStaffByCallcenter();
		set({ staffCallcenter, loadingCallcenter: false });
	},

	// Получение сотрудников Outstaff
	getOutstaffWorkers: async (departmentId) => {
		set({ loading: true });
		const outstaffWorkersList = await getOutstaffWorkers(departmentId);

		// фильтрация по менеджерам
		const managersList = outstaffWorkersList.filter(
			(worker) => worker.profession_name.profession_name === 'Менеджер аутстафф'
		);

		// фильтрация по делопроизводителям
		const staffDeloList = outstaffWorkersList.filter(
			(worker) =>
				worker.profession_name.profession_name === 'Делопроизводитель аутстафф'
		);

		// фильтрация по курьерам
		const staffByCourierList = outstaffWorkersList.filter(
			(worker) => worker.profession_name.profession_name === 'Курьер аутстафф'
		);

		// фильтрация по сотрудникам бухгалтерии
		const staffByBuhList = outstaffWorkersList.filter(
			(worker) => worker.profession_name.profession_name === 'Бухгалтер'
		);

		set({
			outstaffWorkersList,
			loading: false,
			managersList,
			staffDeloList,
			staffByCourierList,
			staffByBuhList,
		});
	},
	getOutstaffByDepartment: async (departmentId) => {
		const departmentStaff = await getOutstaffByDepartment(departmentId);
		set({ departmentStaff });
	},
	// Получение менеджеров аутстафф
	getOutstaffManagers: async (departmentId) => {
		const managersList = await getOutstaffManagers(departmentId);
		set({ managersList });
	},

	// Получение сотрудника по группе sanatera
	getStaffByGroupSingle: async (id) => {
		const singleStaff = await getStaffByGroupSingle(id);
		set({ singleStaff });
	},
	updateStaff: async (staff) => {
		await updateStaff(staff);
	},
	// Проверка свободного времени специалиста
	checkBookingExists: async (data) => {
		const bookingsExists = await checkBookingExists(data);
		set({ bookingsExists, loading: false });
	},
	// Добавление менеджеров
	setManagers: (managersList) => set({ managersList }),
	// Добавление делопроизводителей
	setStaffDelo: (staffDeloList) => set({ staffDeloList }),
	// Добавление курьеров
	setStaffByCourier: (staffByCourierList) => set({ staffByCourierList }),
	// Добавление бухгалтеров
	setStaffByBuh: (staffByBuhList) => set({ staffByBuhList }),
}));
