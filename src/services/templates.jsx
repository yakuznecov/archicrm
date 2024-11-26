// Шаблон
import { get, post, put } from '@/helpers/api_helper';
import { successToast, errorToast } from '@/components';

export const getTemplates = async () => {
	try {
		const response = await get('/outstaff/template/');
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке шаблонов.');
	}
};

// Добавить шаблон
export const addTemplate = async (newTemplate) => {
	try {
		await post('/outstaff/template/', newTemplate);

		successToast('Шаблон добавлен.');
	} catch (error) {
		errorToast('Произошла ошибка при добавлении шаблона.');
	}
};

// Набор шаблонов
export const getTemplatesSet = async () => {
	try {
		const response = await get('/outstaff/template_set/');
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке набора шаблонов.');
	}
};

// Набор шаблонов по id
export const getTemplatesSetById = async (id) => {
	try {
		const response = await get(`/outstaff/template_set/${id}/`);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке шаблонов.');
	}
};

// Добавить набор шаблонов
export const addTemplatesSet = async (newTemplateSet) => {
	try {
		await post('/outstaff/template_set/', newTemplateSet);
		successToast('Набор шаблонов добавлен.');
	} catch (error) {
		errorToast('Произошла ошибка при добавлении набора шаблона.');
	}
};

// Обновление набора шаблонов
export const updateTemplatesSet = async ({ id, newTemplateSet }) => {
	try {
		await put(`/outstaff/template_set/${id}/`, newTemplateSet);
		successToast('Набор шаблонов обновлен.');
	} catch (error) {
		errorToast('Произошла ошибка при обновлении набора шаблонов.');
	}
};