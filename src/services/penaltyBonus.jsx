// Бонусы сотрудников
import { get, post, put, patch, del } from '@/helpers/api_helper';
import { successToast, errorToast } from '@/components';

export const getPenaltyBonuses = async ({ department_id, date }) => {
	try {
		const response = await get(
			`/penalty_bonus/?department_id=${department_id}&date=${date}`
		);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке данных.');
	}
};

// Получить бонус по id
export const getPenaltyBonusById = async (id) => {
	try {
		const response = await get(`/penalty_bonus/${id}/`);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке данных о бонусе.');
	}
};

// Получить бонусы по id сотрудника
export const getPenaltyBonusByStaffId = async (id, month, year) => {
	try {
		const response = await get(
			`/penalty_bonus/?staff_id=${id}&month=${month}&year=${year}`
		);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке данных о бонусах.');
	}
};

// Добавить бонус
export const addPenaltyBonus = async (data) => {
	try {
		await post('/penalty_bonus/', data);
		successToast('Данные добавлены.');
	} catch (error) {
		errorToast('Произошла ошибка при добавлении данных.');
	}
};

// Обновить бонус
export const updatePenaltyBonus = async ({ id, data }) => {
	try {
		await put(`/penalty_bonus/${id}/`, data);
		successToast('Бонус успешно обновлен.');
	} catch (error) {
		errorToast('Произошла ошибка при обновлении бонуса.');
	}
};

// patch бонуса
export const patchPenaltyBonus = async ({ id, data }) => {
	try {
		await patch(`/penalty_bonus/${id}/`, data);
		successToast('Бонус успешно обновлен.');
	} catch (error) {
		errorToast('Произошла ошибка при обновлении бонуса.');
	}
};

// Обновить статус бонуса
export const updatePenaltyBonusStatus = async ({ id, status }) => {
	try {
		await patch(`/penalty_bonus/${id}/`, status);
		successToast('Статус бонуса успешно обновлен.');
	} catch (error) {
		errorToast('Произошла ошибка при обновлении статуса бонуса.');
	}
};

// удалить бонус или штраф
export const deletePenaltyBonus = async (id) => {
	try {
		await del(`/penalty_bonus/${id}/`);
		successToast('Данные удалены.');
	} catch (error) {
		errorToast('Произошла ошибка при удалении данных.');
	}
};
