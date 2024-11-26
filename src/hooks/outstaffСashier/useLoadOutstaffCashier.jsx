// логика загрузки кассы аутстафф
import { useEffect } from 'react';
import { format } from 'date-fns';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useOutstaffCashierStore, useCalendarStore } from '@/storeZustand';

const useLoadOutstaffCashier = () => {
	const [startDate] = useCalendarStore((state) => [state.startDate]);
	const formattedStartDate = format(startDate, 'yyyy-MM-dd');

	// Получить данные кассы
	const [
		outstaffCashierList,
		outstaffCashierByDateList, // список по дате
		getOutstaffCashier, // список транзакций
		getOutstaffCashierByDate,
		loading
	] = useOutstaffCashierStore(useShallow((state) => [
		state.outstaffCashierList,
		state.outstaffCashierByDateList,
		state.getOutstaffCashier,
		state.getOutstaffCashierByDate,
		state.loading
	]));

	// get cashier
	useEffect(() => {
		getOutstaffCashier();
	}, []);

	// загрузить кассу по дате
	useEffect(() => {
		getOutstaffCashierByDate({
			start_date: formattedStartDate,
			end_date: formattedStartDate
		});
	}, [startDate]);

	return {
		outstaffCashierList,
		outstaffCashierByDateList,
		loading,
		getOutstaffCashier
	};
};

export default useLoadOutstaffCashier;