// Касса аутстафф
import { get, post, put } from '@/helpers/api_helper';
import { successToast, errorToast } from '@/components';

export const getOutstaffCashier = async () => {
	try {
		const response = await get('/outstaff/cashier2/');
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке данных кассы.');
	}
};

// Загрузить данные кассы по дате
export const getOutstaffCashierByDate = async ({ start_date = null, end_date = null }) => {
	try {
		const response = await get(`/outstaff/cashier2/?start_date=${start_date}&end_date=${end_date}`);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке данных кассы по дате.');
	}
};

// Загрузить данные по кассе наличные по департаменту
export const getOutstaffCashierByDepartment = async ({ department_id = null }) => {
	try {
		const response = await get(`/outstaff/cashier2/?department_id=${department_id}`);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке данных кассы по департаменту.');
	}
};

// Добавить приход или расход
export const postOutstaffCashier = async (data) => {
	try {
		const response = await post('/outstaff/cashier2/', data);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при добавлении операции.');
	}
}

// обновление кассовой операции
export const putOutstaffCashier = async ({ id, changedCashier }) => {
	try {
		await put(`/outstaff/cashier2/${id}/`, changedCashier);
		successToast('Данные оплаты обновлены.');
	} catch (error) {
		errorToast('Произошла ошибка при обновлении кассовой операции.');
	}
}