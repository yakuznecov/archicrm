// Создание поля для документа
import { get, post, put, patch } from '@/helpers/api_helper';
import { successToast, errorToast } from '@/components';

export const getFields = async () => {
	try {
		const response = await get('/outstaff/field/');

		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке полей.');
	}
};

// Получить доверенность по id
export const getFieldById = async (id) => {
	try {
		const response = await get(`/outstaff/field/${id}`);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при получении поля.');
	}
};

export const addField = async (updatedField) => {
	try {
		const response = await post('/outstaff/field/', updatedField);

		return response;
	} catch (error) {
		errorToast(error?.response?.data?.name);
	}
};

// обновление поля
export const updateField = async ({ id, fieldData }) => {
	try {
		await put(`/outstaff/field/${id}/`, fieldData);

		successToast('Поле шаблона обновлено.');
	} catch (error) {
		errorToast('Произошла ошибка при обновлении поля.');
	}
}

// Обновить часть значений поля
export const patchField = async ({ id, fieldData }) => {
	try {
		await patch(`/outstaff/field/${id}/`, fieldData);

		successToast('Поле шаблона обновлено.');
	} catch (error) {
		errorToast('Произошла ошибка при обновлении поля.');
	}
}