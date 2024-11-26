// Панель со статистикой
import { post } from '@/helpers/api_helper';
import { errorToast } from '@/components';

export const getDashboard = async (idsBookings) => {
	try {
		const response = await post('/dashboard/', idsBookings);
		return response;
	} catch (error) {
		// errorToast('Произошла ошибка при загрузке статистики.');
	}
};