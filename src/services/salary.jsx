// Зарплата сотрудников аутстафф
import { post } from '@/helpers/api_helper';
import { errorToast, successToast } from '@/components';

// список связанных, делопроизводители
export const getSalaryDelo = async (data) => {
	try {
		const response = await post('/salary/result/', data);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке зарплаты делопроизводителей.');
	}
};

// не связанные списки сотрудников, менеджеры
export const getSalaryManagers = async (data) => {
	try {
		const response = await post('/salary/result/', data);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке зарплаты менеджеров.');
		throw error;
	}
};

// зарплата бухгалтеры
export const getSalaryBuh = async (data) => {
	try {
		const response = await post('/salary/result/', data);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке зарплаты бухгалтеров.');
	}
};

// зарплата курьеров
export const getSalaryCourier = async (data) => {
	try {
		const response = await post('/salary/result/', data);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке зарплаты курьеров.');
	}
};

// выплата зарплаты
export const postSalaryPayment = async (data) => {
	try {
		await post('/salary/payment/', data);
		successToast('Выплата добавлена.');
	} catch (error) {
		errorToast('Произошла ошибка при выплате зарплаты.');
	}
};
