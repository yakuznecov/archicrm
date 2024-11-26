// Сотрудники аутстафф
import { get } from '@/helpers/api_helper';
import { errorToast } from '@/components';

export const getNamesDocuments = async () => {
	try {
		const response = await get("/outstaff/document/");
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке документов.');
	}
};