// Физики
import { get, post, put } from '@/helpers/api_helper';
import { errorToast, successToast } from '@/components';

// Получить физиков
export const getPhysics = async () => {
	try {
		const response = await get(`/outstaff/physic/`);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке физиков.');
	}
}

// добавить физика
export const addPhysic = async (data) => {
	try {
		const response = await post(`/outstaff/physic/`, data);
		successToast('Физик добавлен.');
		return response.id;
	} catch (error) {
		errorToast('Произошла ошибка при добавлении физика.');
	}
}

// обновить физика
export const updatePhysic = async ({ id, data }) => {
	try {
		const response = await put(`/outstaff/physic/${id}/`, data);
		successToast('Физик обновлен.');
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при обновлении физика.');
	}
}
