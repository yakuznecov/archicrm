// updatePayment, изменение типа оплаты в таблице оплат

import { put } from '@/helpers/api_helper';
import { successToast, errorToast } from '@/components';

const updatePayment = async ({ paymentId, newUpdatePayment }) => {
	try {
		await put(`/payment/booking/${paymentId}/`, newUpdatePayment);

		successToast('Данные оплаты обновлены.');
	} catch (error) {
		errorToast('Произошла ошибка при обновлении оплаты.');
	}
}

export default updatePayment;
