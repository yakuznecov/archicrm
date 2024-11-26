// Оплаты записей
import { get } from '@/helpers/api_helper';
import { errorToast } from '@/components';

export const getPayments = async ({ department_id, start_date, end_date }) => {
	try {
		const response = await get(`/payment/booking/?department_id=${department_id}&start_date=${start_date}&end_date=${end_date}`);

		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке оплат.');
	}
};

// Получить оплату по id
export const getPaymentById = async (id) => {
	try {
		const response = await get(`/payment/booking/${id}/`);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке оплаты.');
	}
}