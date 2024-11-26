// Данные о приходах контрагентов
import { get } from '@/helpers/api_helper';
import { errorToast } from '@/components';

export const getContrAgentData = async ({ start_date, end_date, department_id }) => {
	try {
		const response = await get(`/outstaff/contr_agent_data/?start_date=${start_date}&end_date=${end_date}&department_id=${department_id}`);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке данных о контрагентах.');
	}
}