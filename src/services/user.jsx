// Доверенность
import { get } from '@/helpers/api_helper';
import { errorToast } from '@/components';

export const getUser = async () => {
	try {
		const response = await get('/current/user/');
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке данных пользователя');
	}
}