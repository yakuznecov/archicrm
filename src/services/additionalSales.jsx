// Доп. услуги
import { get, put } from '@/helpers/api_helper';
import { successToast, errorToast } from '@/components';

export const getAdditionalSales = async () => {
	try {
		const response = await get('/additional_sales/');
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке дополнительных услуг.');
	}
};

// Обновление доп. услуги
export const updateAdditionalSales = async ({ productData, id }) => {
	try {
		const response = await put(`/additional_sales/${id}/`, productData);
		successToast('Дополнительная услуга успешно обновлена.');
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при обновлении дополнительной услуги.');
	}
};
