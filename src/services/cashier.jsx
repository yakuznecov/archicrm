// Касса
import { get } from '@/helpers/api_helper';
import { errorToast } from '@/components';

export const getCashier = async ({ department_id, start_date, end_date }) => {
	try {
		const response = await get(`/cashier/?department_id=${department_id}&start_date=${start_date}&end_date=${end_date}`);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке данных кассы.');
	}
};