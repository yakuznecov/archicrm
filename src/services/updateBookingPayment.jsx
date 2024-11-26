// updateBookingPayment

import { put } from '@/helpers/api_helper';
import { successToast, errorToast } from '@/components';

const updateBookingPayment = async (id, selectedBookingStatus, initialValues, selectedFormPayment, selectedDepartment, staffId, paymentIds) => {
	try {
		for (const paymentId of paymentIds) {
			const newPayment = {
				amount: selectedBookingStatus.label === 'Отмена' ? 0 : initialValues.servicesPrice,
				type: selectedFormPayment,
				description: initialValues.description,
				date_updated: new Date(),
				department: selectedDepartment,
				staff: staffId,
				booking: id,
			};

			await put(`/payment/booking/${paymentId}/`, newPayment);

			successToast('Оплата обновлена.');
		};

	} catch (error) {
		errorToast('Произошла ошибка при обновлении оплаты.');
	}
}

export default updateBookingPayment;
