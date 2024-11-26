// Услуги компании
import { get } from '@/helpers/api_helper';
import { errorToast } from '@/components';

export const getCompanyServices = async () => {
	try {
		const response = await get("/service/online-bookings/");
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке услуг.');
	}
};

export const getCompanyServicesByDepartment = async (departmentId) => {
	try {
		const response = await get(`/service/online-bookings/?department_id=${departmentId}`);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке услуг.');
	}
}
