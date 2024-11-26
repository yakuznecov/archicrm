// аналитика компаний
import { post } from '@/helpers/api_helper';
import { errorToast } from '@/components';

export const postAnalytics = async (data) => {
	try {
		const response = await post('/outstaff/contr_agent_analytics/', data);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при отправке аналитики.');
	}
}

// запрос с датами
export const postAnalyticsByDate = async (data) => {
	try {
		const response = await post('/outstaff/contr_agent_analytics/', data);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при отправке аналитики.');
	}
}