import { useMemo, useState, useEffect } from 'react';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useCompanyServicesStore, useDepartmentsStore } from '@/storeZustand';

const useSelectedServices = (calculateTotalServicesPrice) => {
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	// Услуги компании
	const [getCompanyServices, getCompanyServicesByDepartment, servicesList] =
		useCompanyServicesStore(
			useShallow((state) => [
				state.getCompanyServices,
				state.getCompanyServicesByDepartment,
				state.servicesList,
			])
		);

	// Загрузка услуг по департаменту
	useEffect(() => {
		if (selectedDepartment) {
			getCompanyServicesByDepartment(selectedDepartment);
		}
	}, [selectedDepartment]);

	const [selectedServices, setSelectedServices] = useState([]);

	// Список найденных услуг департамента
	const servicesData = useMemo(() => {
		return (
			servicesList?.map(({ id, name, service_price }) => ({
				value: id,
				label: `ID: ${id} | ${name} – ${service_price}`,
				price: service_price,
			})) ?? []
		);
	}, [servicesList]);

	const handleSelectedServices = (value) => {
		setSelectedServices(value);
		calculateTotalServicesPrice(value);
	};

	return {
		servicesData,
		handleSelectedServices,
		selectedServices,
		setSelectedServices,
	};
};

export default useSelectedServices;
