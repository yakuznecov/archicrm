// addCashierRequest, добавить оплату приход

import { post } from '@/helpers/api_helper';
import { successToast, errorToast } from '@/components';

const addCashierRequest = async (newCashier) => {
	try {
		await post('/cashier/', newCashier);

		successToast('Успешно добавлено.');
	} catch (error) {
		errorToast('Произошла ошибка при добавлении.');
	}
};

export default addCashierRequest;
