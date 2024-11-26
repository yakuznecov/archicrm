// addSubSeparatePayment

import { post } from '@/helpers/api_helper';
import { successToast, errorToast } from '@/components';

const addSubSeparatePayment = async (
	id,
	subId,
	sumSubCash,
	sumSubCard,
	staffId
) => {
	const PAYMENT_TYPE_CASH = 1;
	const PAYMENT_TYPE_CARD = 2;

	try {
		const sendPayment = async (amount, typeId) => {
			const paymentSub = {
				amount: amount,
				type: typeId,
				description: '',
				date_updated: new Date(),
				subscription: subId,
				staff: staffId,
				booking: id,
			};

			await post('/payment/subscription/', paymentSub);

			successToast('Раздельная оплата за абонемент добавлена.');
		};

		if (sumSubCash !== '') {
			sendPayment(sumSubCash, PAYMENT_TYPE_CASH);
		}

		if (sumSubCard !== '') {
			sendPayment(sumSubCard, PAYMENT_TYPE_CARD);
		}
	} catch (error) {
		errorToast(
			'Произошла ошибка при добавлении раздельной оплаты за абонемент.'
		);
	}
};

export default addSubSeparatePayment;
