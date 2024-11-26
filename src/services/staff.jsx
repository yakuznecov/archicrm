// Сотрудники компании
import { get, post, put, patch } from '@/helpers/api_helper';
import { successToast, errorToast } from '@/components';

export const getStaff = async () => {
	try {
		const response = await get('/staff/');
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке сотрудников.');
	}
};

export const getDepartmentStaff = async (departmentId) => {
	try {
		const response = await get(`/staff/?department_id=${departmentId}`);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке сотрудников департамента.');
	}
};

// Запрос админов компании, которые работают с клиентами
export const getAdminStaff = async (departmentId) => {
	try {
		const response = await get(
			`/staff_by_profession/?department_id=${departmentId}&profession_name=1`
		);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке админов департамента.');
	}
};

// Запрос специалистов компании (напр. подологи)
export const getSpecialistStaff = async (departmentId) => {
	try {
		const response = await get(
			`/staff_by_profession/?department_id=${departmentId}&profession_name=4`
		);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке специалистов департамента.');
	}
};

// Запрос сотрудников колл-центра
export const getCallcenterStaff = async () => {
	try {
		const response = await get(`/staff_by_profession/?department_id=9`);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке сотрудников колл-центра.');
	}
};

// Запрос сотрудников по группе sanatera
export const getStaffByGroup = async (departmentId) => {
	try {
		const response = await get(
			`/staff_by_group/?group_name=sanatera&department_id=${departmentId}`
		);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке сотрудников.');
	}
};

// Запрос сотрудников по группе outstaff
export const getOutstaffWorkers = async (departmentId) => {
	try {
		const response = await get(
			`/staff_by_group/?group_name=outstaff&department_id=${departmentId}`
		);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке сотрудников.');
	}
};

// Запрос сотрудников callcenter
export const getStaffByCallcenter = async () => {
	try {
		const response = await get('/staff_by_group/?group_name=callcenter');
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке сотрудников коллцентра.');
	}
};

// Запрос сотрудников outstaff по департаменту
export const getOutstaffByDepartment = async (departmentId) => {
	try {
		const response = await get(
			`/staff_by_group/?group_name=outstaff&department_id=${departmentId}`
		);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке сотрудников аутстафф.');
	}
};

// Запрос менеджеров outstaff по департаменту
export const getOutstaffManagers = async (departmentId) => {
	try {
		const response = await get(
			`/staff_by_group/?group_name=outstaff_manager&department_id=${departmentId}`
		);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке менеджеров аутстафф.');
	}
};

// Запрос сотрудника из группы sanatera по id
export const getStaffByGroupSingle = async (id) => {
	try {
		const response = await get(`/staff_by_group/${id}/`);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке сотрудника.');
	}
};

// обновление сотрудника
export const updateStaff = async (staff) => {
	try {
		await put(`/staff/${staff.id}`, staff);

		successToast('Данные сотрудника обновлены.');
	} catch (error) {
		errorToast('Произошла ошибка при обновлении сотрудника.');
	}
};

// частичное обновление сотрудника
export const patchStaff = async (id, dataRate) => {
	try {
		await patch(`/staff/${id}/`, dataRate);
		successToast('Данные сотрудника обновлены.');
	} catch (error) {
		errorToast('Произошла ошибка при обновлении сотрудника.');
	}
};

// проверка свободного времени специалиста
export const checkBookingExists = async (data) => {
	try {
		const response = await post('/booking_exists/', data);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке времени специалиста.');
	}
};
