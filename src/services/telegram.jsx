// telegram, add customer

import { get } from '@/helpers/api_helper';
import { successToast, errorToast } from '@/components';

export const addToTelegram = async (booking_id) => {
	try {
		await get(`/customer/send_link/${booking_id}/`);
		successToast('Клиенту отправлено уведомление в телеграм.');
	} catch (error) {
		errorToast('Произошла ошибка отправки уведомления клиенту.');
	}
}