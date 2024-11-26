// Учет рабочего времени и бонусы
import { get, post, put, patch } from '@/helpers/api_helper';
import { errorToast, successToast } from '@/components';

export const getWorkingPeriod = async ({ department_id, date }) => {
	try {
		const response = await get(`/working_period/?department_id=${department_id}&date=${date}`);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке данных о рабочем периоде.');
	}
};

export const getWorkingPeriodById = async (id) => {
	try {
		const response = await get(`/working_period/${id}/`);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке данных сотрудника.');
	}
};

// Добавить время
export const addWorkingPeriod = async (newWorkingPeriod) => {
	try {
		await post('/working_period/', newWorkingPeriod);
		successToast('Время добавлено');
	} catch (error) {
		errorToast('Произошла ошибка при добавлении времени.');
	}
}

// Обновить время
export const updateWorkingPeriod = async ({ id, newWorkingPeriod }) => {
	try {
		await put(`/working_period/${id}/`, newWorkingPeriod);
		successToast('Время обновлено');
	} catch (error) {
		errorToast('Произошла ошибка при обновлении времени.');
	}
}

// Обновить данные частично
export const patchWorkingPeriod = async ({ id, newWorkingPeriod }) => {
	try {
		await patch(`/working_period/${id}/`, newWorkingPeriod);
		successToast('Время обновлено');
	} catch (error) {
		errorToast('Произошла ошибка при обновлении времени');
	}
}