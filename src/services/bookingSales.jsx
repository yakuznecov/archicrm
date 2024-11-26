// Доп. услуги
import { get, post, put } from '@/helpers/api_helper';
import { successToast, errorToast } from '@/components';

export const getBookingSales = async () => {
	try {
		const response = await get('/booking_sales/');
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке дополнительных услуг.');
	}
};

// Добавление доп. услуги
export const addBookingSales = async (data) => {
	try {
		const response = await post('/booking_sales/', data);
		successToast('Дополнительная услуга успешно добавлена.');
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при добавлении дополнительной услуги.');
	}
};

// Обновление доп. услуги
export const updateBookingSales = async ({ productDataUpdate, id }) => {
	try {
		const response = await put(`/booking_sales/${id}/`, productDataUpdate);
		successToast('Дополнительная услуга успешно обновлена.');
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при обновлении дополнительной услуги.');
	}
}