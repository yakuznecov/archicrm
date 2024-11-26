// Клиенты аустафф
import { get, post, put, patch } from '@/helpers/api_helper';
import { errorToast, successToast } from '@/components';

export const getClientsOutstaff = async () => {
	try {
		const response = await get("/outstaff/client/");

		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке клиентов.');
	}
};

export const getSingleClientOutstaff = async (customerId) => {
	try {
		const response = await get(`/outstaff/client/${customerId}/`);

		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке клиента.');
	}
};

export const addClientOutstaff = async (updatedClient) => {
	try {
		const response = await post("/outstaff/client/", updatedClient);
		const clientId = response.id;

		successToast('Клиент успешно добавлен.');
		return clientId;
	} catch (error) {
		handleError(error);
	}
}

const handleError = (error) => {
	if (error?.response?.data?.phone) {
		errorToast('Клиент с таким номером телефона уже существует.');
	} else {
		errorToast('Произошла ошибка при добавлении клиента.');
	}
}

export const updateClientOutstaff = async ({ updatedClient, id }) => {
	try {
		await put(`/outstaff/client/${id}/`, updatedClient);

		successToast('Данные клиента обновлены.');
	} catch (error) {
		errorToast('Произошла ошибка при обновлении клиента.');
	}
}

export const patchClientOutstaff = async (id, data) => {
	try {
		await patch(`/outstaff/client/${id}/`, data);

		successToast('Документы клиента обновлены.');
	} catch (error) {
		errorToast('Произошла ошибка при обновлении документов клиента.');
	}
}