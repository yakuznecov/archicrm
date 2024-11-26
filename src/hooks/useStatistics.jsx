import { useEffect } from 'react';
import { startOfToday, format, subDays } from 'date-fns';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useBookingsStore, useDepartmentsStore } from '@/storeZustand';

const today = startOfToday(); // текущая дата
const startDate = subDays(today, 60); // дата 30 дней назад
const formattedStartDate = format(startDate, 'yyyy-MM-dd');
const formattedEndDate = format(today, 'yyyy-MM-dd'); // текущая дата

const useStatistics = () => {
	// Выбранный департамент
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	// загрузка записей
	const [bookings, getBookings, loading] = useBookingsStore(
		useShallow((state) => [state.bookings, state.getBookings, state.loading])
	);

	useEffect(() => {
		const filteredData = {
			department_id: selectedDepartment,
			start_date: formattedStartDate,
			end_date: formattedEndDate,
		};

		if (filteredData && selectedDepartment) {
			getBookings(filteredData);
		}
	}, [selectedDepartment]);

	// Все уникальные создатели записей
	const creators =
		bookings?.length > 0 && bookings.map((booking) => booking.creator.username);
	const uniqueCreators = creators ? [...new Set(creators)] : [];

	// Подсчет количества совпадений
	const usernameCounter = bookings?.reduce((acc, item) => {
		const username = item.creator.username;
		acc[username] = (acc[username] || 0) + 1;
		return acc;
	}, {});
	console.log('usernameCounter', usernameCounter);

	const result = uniqueCreators.map(
		(username) => usernameCounter[username] || 0
	);

	function generateRandomColor() {
		return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
			Math.random() * 256
		)}, ${Math.floor(Math.random() * 256)}, 0.3)`;
	}

	const uniqueCreatorsBg = uniqueCreators.map(() => generateRandomColor());
	const uniqueCreatorsBorders = uniqueCreatorsBg?.map((item) =>
		item.replace('0.3', '1')
	);

	const data = {
		labels: uniqueCreators,
		datasets: [
			{
				label: 'Количество записей',
				data: result,
				backgroundColor: uniqueCreatorsBg,
				borderColor: uniqueCreatorsBorders,
				borderWidth: 1,
			},
		],
	};

	return {
		data,
		loading,
	};
};

export default useStatistics;
