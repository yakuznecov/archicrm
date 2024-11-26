import { useState } from 'react';
import { useServiceRequestsGet } from '@/hooks/queries/useServiceRequestsGet';

// Zustand store
import { useDepartmentsStore } from '@/storeZustand';

export const useLoadServiceRequests = () => {
	const [selectedStatus, setSelectedStatus] = useState('1');

	// Загрузка данных департамента
	const selectedDepartment = useDepartmentsStore(
		(state) => state.selectedDepartment
	);

	const statusData = {
		departmentId: selectedDepartment,
		selectedStatus,
	};

	const { data, isFetching } = useServiceRequestsGet(statusData);

	// изменение статуса
	const handleRadioChange = (event) => {
		const selectedElement = event.target.value;
		setSelectedStatus(selectedElement);
	};

	return {
		data,
		isFetching,
		selectedStatus,
		setSelectedStatus,
		handleRadioChange,
	};
};
