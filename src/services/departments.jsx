// Департаменты
import { get } from '@/helpers/api_helper';
import { errorToast } from '@/components';

export const getDepartments = async () => {
	try {
		const response = await get('/department/');
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке департаментов.');
	}
};