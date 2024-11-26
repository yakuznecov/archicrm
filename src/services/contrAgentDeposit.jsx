// Депозиты контрагентов
import { get, post, patch } from '@/helpers/api_helper';
import { errorToast, successToast } from '@/components';

// Получить депозиты контрагентов
export const getContrAgentDeposits = async ({ start_date, end_date, department_id }) => {
	try {
		const response = await get(`/outstaff/contr_agent_deposit/?start_date=${start_date}&end_date=${end_date}&department_id=${department_id}`);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке депозитов контрагентов.');
	}
}

// параметры фильтрации
export const getContrAgentDepositsParams = async (...filterObjects) => {
	const combinedFilters = Object.assign({}, ...filterObjects);
	const params = new URLSearchParams();

	for (const key in combinedFilters) {
		if (combinedFilters[key]) {
			params.append(key, combinedFilters[key]);
		}
	}

	const url = `/outstaff/contr_agent_deposit/?${params.toString()}`;

	try {
		const response = await get(url);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке депозитов.');
	}
};

// Получить депозиты по id контрагента
export const getSingleContrAgentDeposits = async (id) => {
	try {
		const response = await get(`/outstaff/contr_agent_deposit/?contr_agent_id=${id}`);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке депозитов контрагента.');
	}
}

// добавить депозит контрагента
export const addContrAgentDeposit = async (data) => {
	try {
		const response = await post(`/outstaff/contr_agent_deposit/`, data);
		successToast('Депозит добавлен.');
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при добавлении депозита контрагента.');
	}
}

// обновить депозит контрагента
export const updateContrAgentDeposit = async ({ id, updatedDeposit }) => {
	try {
		await patch(`/outstaff/contr_agent_deposit/${id}/`, updatedDeposit);
		successToast('Данные депозита контрагента обновлены.');
	} catch (error) {
		errorToast('Произошла ошибка при обновлении депозита контрагента.');
	}
}