import { useEffect } from 'react';
import { DataFilter } from '@/containers';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { usePaymentsStore } from '@/storeZustand';

const useUpdatePayment = (bookingId) => {
	// Список оплат записей
	const [getPayments, paymentsList] = usePaymentsStore(
		useShallow((state) => [state.getPayments, state.paymentsList])
	);

	const { filteredData } = DataFilter();

	// get payments
	useEffect(() => {
		if (filteredData?.department_id) {
			getPayments(filteredData);
		}
	}, [filteredData.start_date, filteredData.department_id, bookingId]);

	const selectedPayment = paymentsList?.filter(
		(payment) => payment.booking.id === bookingId
	);

	const paymentIds = selectedPayment?.map(({ id }) => id);

	return {
		paymentIds,
	};
};

export default useUpdatePayment;
