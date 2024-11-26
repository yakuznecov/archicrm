// Депозиты компаний
import { get, post, patch } from '@/helpers/api_helper';
import { successToast, errorToast } from '@/components';

export const getDeposits = async () => {
	try {
		const response = await get('/outstaff/deposit/');
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке депозитов.');
	}
}

export const getDepositsByDate = async ({ start_date = null, end_date = null }) => {
	try {
		const response = await get(`/outstaff/deposit/?start_date=${start_date}&end_date=${end_date}`);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке депозитов.');
	}
}

// Получить депозиты по id компании
export const getSingleCompanyDeposits = async (id) => {
	try {
		const response = await get(`/outstaff/deposit/?contr_agent_id=${id}`);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке депозитов компании.');
	}
}

// параметры фильтрации
export const getDepositsParams = async (...filterObjects) => {
	const combinedFilters = Object.assign({}, ...filterObjects);
	const params = new URLSearchParams();

	for (const key in combinedFilters) {
		if (combinedFilters[key]) {
			params.append(key, combinedFilters[key]);
		}
	}

	const url = `/outstaff/deposit/?${params.toString()}`;

	try {
		const response = await get(url);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке депозитов.');
	}
};

// Добавить бонус
export const addDeposit = async (data) => {
	try {
		await post('/outstaff/deposit/', data);
		successToast('Депозит успешно добавлен.');
	} catch (error) {
		errorToast('Произошла ошибка при добавлении депозита.');
	}
}

// обновить депозит
export const updateDeposit = async ({ id, depositData }) => {
	try {
		await patch(`/outstaff/deposit/${id}/`, depositData);
		successToast('Депозит успешно обновлен.');
	} catch (error) {
		errorToast('Произошла ошибка при обновлении депозита.');
	}
}