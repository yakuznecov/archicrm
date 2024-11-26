// Договоры клиентов аутстафф
import { get, post, put, patch, del } from '@/helpers/api_helper';
import { errorToast, successToast } from '@/components';

// Получить контракты только за сегодня
export const getContracts = async (selectedCity) => {
	try {
		const response = await get(`/outstaff/contract/?city=${selectedCity}`);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке договоров клиентов.');
	}
};

// Получить контракты только за сегодня и по городу
export const getTodayContracts = async (selectedCity) => {
	const today = new Date().toISOString().split('T')[0]; // сегодняшняя дата
	const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
		.toISOString()
		.split('T')[0]; // дата завтра

	try {
		const response = await get(
			`/outstaff/contract/?start_date=${today}&end_date=${tomorrow}&city=${selectedCity}`
		);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке договоров клиентов.');
	}
};

// параметры фильтрации
export const getContractsParams = async (...filterObjects) => {
	const combinedFilters = Object.assign({}, ...filterObjects);
	const params = new URLSearchParams();
	// console.log('combinedFilters', combinedFilters);

	for (const key in combinedFilters) {
		if (combinedFilters[key]) {
			params.append(key, combinedFilters[key]);
		}
	}

	const url = `/outstaff/contract/?${params.toString()}`;

	try {
		const response = await get(url);
		return response;
	} catch (error) {
		console.log('error', error);
		errorToast('Произошла ошибка при загрузке договоров клиентов.');
	}
};

// Загрузка контракта по id
export const getContractById = async (id) => {
	try {
		const response = await get(`/outstaff/contract/${id}/`);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке договора.');
	}
};

// Добавить договор
export const addContract = async (contract) => {
	try {
		const response = await post('/outstaff/contract/', contract);
		successToast('Договор успешно создан.');
		return response;
	} catch (error) {
		if (error?.response?.data?.contract_number) {
			errorToast('Договор с таким номером уже существует.');
		}

		errorToast('Произошла ошибка при создании договора.');
	}
};

// Обновить договор
export const updateContract = async ({ id, updatedContract }) => {
	try {
		await put(`/outstaff/contract/${id}/`, updatedContract);
		successToast('Данные договора обновлены.');
	} catch (error) {
		errorToast(error?.response?.data?.contract_number);
	}
};

// Обновить частично договор
export const patchContract = async ({ id, updatedContract }) => {
	try {
		await patch(`/outstaff/contract/${id}/`, updatedContract);
		successToast('Данные договора обновлены.');
	} catch (error) {
		errorToast(error?.response?.data?.contract_number);
	}
};

// удалить договор
export const deleteContract = async (id) => {
	try {
		await del(`/outstaff/contract/${id}/`);
		successToast('Договор удален.');
	} catch (error) {
		errorToast('Произошла ошибка при удалении договора.');
	}
};
