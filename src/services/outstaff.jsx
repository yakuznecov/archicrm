// Сотрудники аутстафф
import { get, post } from '@/helpers/api_helper';
import { errorToast } from '@/components';

export const getOutStaff = async () => {
	try {
		const response = await get('/staff_by_group?group_name=outstaff');
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке сотрудников.');
	}
};

// Загрузка файлов с сервера по id договора
export const getUploadFiles = async (contractId) => {
	try {
		const response = await get(`/outstaff/upload/?contract_id=${contractId}`);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке файлов с сервера.');
	}
}

// Загрузка файла по id
export const getUploadFileById = async (id) => {
	try {
		const response = await get(`/outstaff/upload/${id}/`);
		return response.path; // путь к файлу
	} catch (error) {
		errorToast('Произошла ошибка при загрузке файла.');
	}
}

// Загрузка файлов на сервер аутстафф
export const uploadFile = async (formData) => {
	try {
		const response = await post('/outstaff/upload/', formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			}
		});
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке файла.');
	}
}

// загрузка услуг аутстафф
export const getContractServices = async () => {
	try {
		const response = await get('/outstaff/contract_service/');
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке услуг.');
	}
}

// загрузка дашборда и финансовых данных по заказам
export const getOutstaffDashboard = async (...filterObjects) => {
	const combinedFilters = Object.assign({}, ...filterObjects);
	const params = new URLSearchParams();

	for (const key in combinedFilters) {
		if (combinedFilters[key]) {
			params.append(key, combinedFilters[key]);
		}
	}

	const url = `/outstaff/dashboard/?${params.toString()}`;

	try {
		const response = await get(url);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке финансовых данных.');
	}
}

// Баланс контрагента
export const getContrAgentBalance = async (id) => {
	try {
		const response = await get(`/outstaff/contr_agent/balance/${id}/`);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке баланса.');
	}
}