// addBookingPayment

import { put } from '@/helpers/api_helper';
import { successToast, errorToast } from '@/components';

const updateContract = async ({ contractId, updatedContract }) => {
	try {
		await put(`/outstaff/contract/${contractId}/`, updatedContract);
		successToast('Данные договора обновлены.');
	} catch (error) {
		errorToast(error?.response?.data?.contract_number);
	}
}

export default updateContract;