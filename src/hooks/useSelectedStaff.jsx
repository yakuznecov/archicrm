import { useState, useEffect, useMemo, useCallback } from 'react';
import { formatDateToIso } from '@/helpers/Date/formatDate';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useDepartmentsStore, useStaffStore } from '@/storeZustand';

const useSelectedStaff = (startTime) => {
	const [selectedStaff, setSelectedStaff] = useState({
		value: '',
		label: '--------',
	});

	const [getDepartmentStaff, departmentStaff, checkBookingExists] =
		useStaffStore(
			useShallow((state) => [
				state.getDepartmentStaff,
				state.departmentStaff,
				state.checkBookingExists,
			])
		); // Сотрудники департамента и свободное время специалиста

	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	); // Выбранный департамент

	useEffect(() => {
		if (selectedDepartment) {
			getDepartmentStaff(selectedDepartment);
		}
	}, [selectedDepartment]);

	// Список найденных сотрудников департамента для селекта
	const staffData = useMemo(() => {
		return (
			departmentStaff?.map(({ id, surname, name }) => ({
				value: id,
				label: `ID: ${id} | ${surname} ${name}`,
			})) ?? []
		);
	}, [departmentStaff]);

	// установить сотрудника
	const setSelectedStaffValue = (data) => {
		setSelectedStaff({
			value: data?.worker?.id ?? '',
			label: `ID: ${data?.worker?.id ?? '----'} | ${
				data?.worker?.surname ?? '----'
			} ${data?.worker?.name ?? '----'}`,
		});
	};

	const handleSelectedStaff = (value) => {
		setSelectedStaff(value);
		handleBookingCheck(startTime, value.value);
	};

	// проверка свободного времени
	const handleBookingCheck = useCallback((date, selectedStaffValue) => {
		if (date) {
			const convertDate = formatDateToIso(date);

			const dataBookingsExists = {
				booking_date: convertDate,
				worker: selectedStaffValue,
			};

			checkBookingExists(dataBookingsExists);
		}
	}, []);

	return {
		staffData,
		selectedStaff,
		setSelectedStaff,
		setSelectedStaffValue,
		handleSelectedStaff,
		handleBookingCheck,
	};
};

export default useSelectedStaff;
