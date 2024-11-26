// Баланс компании с приходами от внешних контрагентов
import { get } from '@/helpers/api_helper';
import { errorToast } from '@/components';

export const getCompanyBalanceData = async ({ date, department_id }) => {
	try {
		const response = await get(`/outstaff/balance/?date=${date}&department_id=${department_id}`);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке баланса компаний.');
	}
};

