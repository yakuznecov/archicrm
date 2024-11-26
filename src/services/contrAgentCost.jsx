// Расходы внутренних компаний на основе контрагентов
import { post, get } from '@/helpers/api_helper';
import { errorToast, successToast } from '@/components';

export const getContrAgentCost = async ({ start_date, end_date, department_id }) => {
	try {
		const response = await get(`/outstaff/contr_agent_cost/?start_date=${start_date}&end_date=${end_date}&department_id=${department_id}`);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке расходов.');
	}
}

// добавить расход внутренней компании
export const addContrAgentCost = async (data) => {
	try {
		const response = await post(`/outstaff/contr_agent_cost/`, data);
		successToast('Расход добавлен.');
		return response;
	} catch (error) {
		console.log(error);
		errorToast('Произошла ошибка при добавлении расхода.');
	}
}