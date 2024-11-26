// Доверенность
import { get, post, put } from '@/helpers/api_helper';
import { successToast, errorToast } from '@/components';

export const getProcuratory = async () => {
	try {
		const response = await get('/outstaff/procuratory/');

		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке доверенностей.');
	}
};

export const addProcuratory = async (procuratoryData) => {
	try {
		const response = await post('/outstaff/procuratory/', procuratoryData);

		successToast('Доверенность добавлена.');

		return response;
	} catch (error) {
		errorToast('Произошла ошибка при сохранении доверенности.');
	}
};

export const updateProcuratory = async ({ id, procuratoryData }) => {
	try {
		await put(`/outstaff/procuratory/${id}/`, procuratoryData);

		successToast('Доверенность обновлена.');

	} catch (error) {
		errorToast('Произошла ошибка при обновлении доверенности.');
	}
}

// Получить доверенность по id
export const getProcuratoryById = async (id) => {
	try {
		const response = await get(`/outstaff/procuratory/${id}`);

		return response;
	} catch (error) {
		errorToast('Произошла ошибка при получении доверенности.');
	}
};