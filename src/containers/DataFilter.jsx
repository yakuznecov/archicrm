import { useMemo } from 'react';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useDepartmentsStore, useCalendarStore } from '@/storeZustand';

import { convertModalDate, addOneDayToDate } from '@/helpers/Date/formatDate';

const DataFilter = () => {
	const [startDate] = useCalendarStore((state) => [state.startDate]);

	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	const newDate = startDate.toISOString();

	const convertStartDate = convertModalDate(newDate);
	const endDateBooking = addOneDayToDate(convertStartDate);

	const filteredData = useMemo(
		() => ({
			department_id: selectedDepartment,
			start_date: convertStartDate,
			end_date: endDateBooking,
		}),
		[selectedDepartment, convertStartDate, endDateBooking]
	);

	const filteredWorkingPeriod = useMemo(
		() => ({
			department_id: selectedDepartment,
			date: convertStartDate,
		}),
		[selectedDepartment, convertStartDate]
	);

	return { filteredData, filteredWorkingPeriod };
};

export default DataFilter;
