// загрузка и проверка визитов по абонементу

import { get } from '@/helpers/api_helper';
import { errorToast } from '@/components';

export const getVisits = async () => {
	try {
		const response = await get("/visit/subscription/");

		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке визитов клиента.');
	}
};

export const getVisitById = async (subId) => {
	try {
		const response = await get(`/check_visit/${subId}/`);

		return response;
	} catch (error) {
		errorToast('Произошла ошибка при получении визита.');
	}
};