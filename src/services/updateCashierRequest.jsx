// updateCashierRequest

import { put } from '@/helpers/api_helper';
import { successToast, errorToast } from '@/components';

const updateCashierRequest = async ({ id, changedCashier }) => {
	try {
		await put(`/cashier/${id}/`, changedCashier);
		successToast('Данные оплаты обновлены.');
	} catch (error) {
		errorToast('Произошла ошибка при обновлении оплаты.');
	}
}

export default updateCashierRequest;
