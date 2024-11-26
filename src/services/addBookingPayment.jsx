// addBookingPayment

import { post } from '@/helpers/api_helper';
import { successToast, errorToast } from '@/components';

const addBookingPayment = async (
	id,
	initialValues,
	selectedFormPayment,
	selectedDepartment,
	staffId
) => {
	try {
		const newPayment = {
			amount: initialValues.servicesPrice,
			type: selectedFormPayment,
			description: '',
			date_updated: new Date(),
			department: selectedDepartment,
			staff: staffId,
			booking: id,
		};

		await post('/payment/booking/', newPayment);

		successToast('Оплата добавлена.');
	} catch (error) {
		errorToast('Произошла ошибка при добавлении оплаты.');
	}
};

export default addBookingPayment;
