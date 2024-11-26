// Личный процент
import { post } from '@/helpers/api_helper';
import { errorToast } from '@/components';

// Сохранение личного процента в таблице зп
export const postManagersRate = async (data) => {
	try {
		const response = await post('/outstaff/managers_rate/', data);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке аналитики по менеджерам.');
	}
};
