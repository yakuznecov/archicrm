// Клиенты мед центров
import { get, post, put, patch } from '@/helpers/api_helper';
import { errorToast, successToast } from '@/components';

export const getCustomers = async () => {
	try {
		const response = await get("/customers/");
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке клиентов.');
	}
};

// Добавить клиента
export const addCustomer = async (customer) => {
	try {
		await post("/customers/", customer);
		successToast('Клиент успешно добавлен.');
	} catch (error) {
		errorToast('Произошла ошибка при добавлении клиента.');
	}
}

// Обновить клиента
export const updateCustomer = async ({ changedCustomer, id }) => {
	try {
		await put(`/customers/${id}/`, changedCustomer);

		successToast('Данные клиента обновлены.');
	} catch (error) {
		errorToast('Произошла ошибка при обновлении клиента.');
	}
}

// Поиск клиента
export const searchCustomer = async (phone) => {
	try {
		const response = await get(`/customer/search?phone=${phone}`);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при поиске клиента.');
	}
};

// Записи клиента
export const fetchCustomerBookings = async (customerId) => {
	try {
		const response = await get(`/customer_bookings?customer=${customerId}`);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке записей клиента.');
	}
};

// Обновить комментарий клиента
export const patchCustomer = async ({ id, data }) => {
	try {
		await patch(`/customers/${id}/`, data);
		successToast('Комментарий обновлен.');
	} catch (error) {
		errorToast('Произошла ошибка при обновлении комментария.');
	}
}