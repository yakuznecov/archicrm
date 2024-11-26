import { post } from '@/helpers/api_helper';
import { successToast, errorToast } from '@/components';

const addBookingSeparatePayment = async (
	id,
	sumCash,
	sumCard,
	selectedDepartment,
	staffId
) => {
	try {
		const sendPayment = async (amount, typeId) => {
			const newPayment = {
				amount: amount,
				type: typeId,
				description: '',
				date_updated: new Date(),
				department: selectedDepartment,
				staff: staffId,
				booking: id,
			};

			await post('/payment/booking/', newPayment);

			successToast('Раздельная оплата добавлена.');
		};

		if (sumCash !== '') {
			sendPayment(sumCash, 1);
		}

		if (sumCard !== '') {
			sendPayment(sumCard, 2);
		}
	} catch (error) {
		errorToast('Произошла ошибка при добавлении раздельной оплаты.');
	}
};

export default addBookingSeparatePayment;
