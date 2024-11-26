import { useShallow } from 'zustand/react/shallow';
import { useCalendarStore } from '@/storeZustand';

const useChangeDate = () => {
	const [startDate, handleSetDate] = useCalendarStore(
		useShallow((state) => [state.initialDate, state.handleSetDate])
	);

	// изменение даты в календаре
	const handleDateChange = (selectedDate) => {
		if (selectedDate) {
			const dateString = selectedDate.toISOString();
			handleSetDate(dateString);
		}
	};

	return {
		startDate,
		handleDateChange,
	};
};

export default useChangeDate;
