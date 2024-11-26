// addSubPayment, добавление оплаты за абонемент

import { post } from '@/helpers/api_helper';
import { successToast, errorToast } from '@/components';

const addSubPayment = async (subId, bookingId, sumSubscription, selectedFormSubPayment, staffId) => {
	try {
		const paymentSub = {
			amount: sumSubscription,
			type: selectedFormSubPayment?.value,
			description: '',
			date_updated: new Date(),
			subscription: subId, // id записи
			staff: staffId,
			booking: bookingId,
		};

		await post("/payment/subscription/", paymentSub);

		successToast('Оплата за абонемент добавлена.');
	} catch (error) {
		errorToast('Произошла ошибка при добавлении оплаты за абонемент.');
	}
}

export default addSubPayment;
