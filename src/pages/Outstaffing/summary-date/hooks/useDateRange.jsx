import { useState } from 'react';
import dayjs from 'dayjs';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useDateRangeStore } from '@/storeZustand';

const useDateRange = () => {
	dayjs.locale('ru'); // Настройка локали для dayjs
	const today = dayjs(); // Сегодняшняя дата
	const yesterday = dayjs().subtract(1, 'day'); // Вчерашняя дата
	const startOfWeek = today.startOf('week');
	const endOfWeek = today.endOf('week');

	const [rangeType, setRangeType] = useState('today');

	// Диапазоны дат из Zustand store
	const [startDate, endDate, setStartDate, setEndDate] = useDateRangeStore(
		useShallow((state) => [
			state.startDate,
			state.endDate,
			state.setStartDate,
			state.setEndDate,
		])
	);

	// Обработчик изменения даты в RangePicker
	const updateDateRange = (_, dateString) => {
		if (dateString.length === 2) {
			const [start, end] = dateString;

			setStartDate(start);
			setEndDate(end);
		}
	};

	// Обработчик изменения радиокнопок
	const handleRangePickerChange = (event) => {
		const value = event.target.value;
		setRangeType(value);

		switch (value) {
			case 'today':
				setStartDate(today.format('YYYY-MM-DD'));
				setEndDate(today.format('YYYY-MM-DD'));
				break;
			case 'yesterday':
				setStartDate(yesterday.format('YYYY-MM-DD'));
				setEndDate(yesterday.format('YYYY-MM-DD'));
				break;
			case 'week':
				setStartDate(startOfWeek.format('YYYY-MM-DD'));
				setEndDate(endOfWeek.format('YYYY-MM-DD'));
				break;
			case 'month':
				setStartDate(today.startOf('month').format('YYYY-MM-DD'));
				setEndDate(today.endOf('month').format('YYYY-MM-DD'));
				break;
			case 'last_month':
				setStartDate(
					today.subtract(1, 'month').startOf('month').format('YYYY-MM-DD')
				);
				setEndDate(
					today.subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
				);
				break;
			case 'year':
				setStartDate(today.startOf('year').format('YYYY-MM-DD'));
				setEndDate(today.endOf('year').format('YYYY-MM-DD'));
				break;
			default:
				break;
		}
	};

	return {
		startDate,
		endDate,
		rangeType,
		updateDateRange,
		handleRangePickerChange,
	};
};

export default useDateRange;
