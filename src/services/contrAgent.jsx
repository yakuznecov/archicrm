// Контрагенты (включают компании или физиков)
import { get, post, patch } from '@/helpers/api_helper';
import { errorToast, successToast } from '@/components';

// Загрузка контрагентов
export const getContrAgents = async () => {
	try {
		const response = await get(`/outstaff/contr_agent/`);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке контрагентов.');
	}
};

// добавить контрагента
export const addContrAgent = async (data) => {
	try {
		const response = await post(`/outstaff/contr_agent/`, data);
		successToast('Контрагент добавлен.');
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при добавлении контрагента.');
	}
};

// получить контрагента по id
export const getContrAgentById = async (id) => {
	try {
		const response = await get(`/outstaff/contr_agent/${id}/`);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке контрагента.');
	}
};

// обновить контрагента по id
export const updateContrAgent = async ({ id, data }) => {
	try {
		await patch(`/outstaff/contr_agent/${id}/`, data);
		successToast('Контрагент обновлен.');
	} catch (error) {
		errorToast('Произошла ошибка при обновлении контрагента.');
	}
};
