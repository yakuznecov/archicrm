// Департаменты
import { create } from 'zustand';
import { getDepartments } from '@/services';
import { getDepartmentId } from '@/helpers/localStorageUtils';

export const useDepartmentsStore = create((set) => ({
	departments: [],
	selectedDepartment: getDepartmentId() || null, // id департамента
	departmentStatus: 'idle',
	getDepartments: async () => {
		const departments = await getDepartments();
		set({ departments, departmentStatus: 'success' });
	},
	setSelectedDepartment: (department) => {
		set({ selectedDepartment: department });
	},
}));
