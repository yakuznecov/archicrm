// Менеджеры аутстафф, аналитика
import { get } from '@/helpers/api_helper';
import { errorToast } from '@/components';

// Получить аналитику по менеджерам, продажи
export const getManagersAnalytics = async ({
	start_date = null,
	end_date = null,
	department_id,
}) => {
	try {
		const response = await get(
			`/outstaff/managers/?start_date=${start_date}&end_date=${end_date}&department_id=${department_id}&profession_id=15`
		);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке аналитики по менеджерам.');
	}
};
