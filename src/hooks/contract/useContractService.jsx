// useOutstaffService, Выбор услуги аутстафф в договоре
import { useEffect, useState } from 'react';
import { getContractServices } from '@/services';

const useContractService = (contract_service) => {
	// Список услуг аутстафф
	const [contractServices, setContractServices] = useState([]);
	// Выбранная услуга
	const [selectedContractService, setSelectedContractService] = useState();
	// Выбранная доп услуга
	const [selectedAdditionalService, setSelectedAdditionalService] = useState(
		[]
	);
	// console.log('selectedContractService', selectedContractService);
	// console.log('selectedAdditionalService', selectedAdditionalService);

	// получение списка внешних компаний
	useEffect(() => {
		const fetchData = async () => {
			const services = await getContractServices();
			setContractServices(services);
		};
		fetchData();
	}, []);

	// Выбранная услуга при редактировании
	useEffect(() => {
		if (!contract_service) return;

		// console.log('contract_service', contract_service);

		// функция для получения списка id выбранных услуг
		const getSelectedServiceIds = (type) => {
			return contract_service
				?.filter((service) => service.service_type === type)
				?.map((service) => service.id);
		};

		// получить список id выбранных услуг
		const contractServiceIds = getSelectedServiceIds(1);

		// получить список id выбранных доп услуг
		const additionalServiceIds = getSelectedServiceIds(2);

		if (contract_service) {
			setSelectedContractService(contractServiceIds[0]);
			setSelectedAdditionalService(additionalServiceIds);
		}
	}, [contract_service]);

	// Универсальная функция для создания списка услуг на основе типа услуги
	const createServiceList = (serviceType) => {
		if (!contractServices) return [];
		return contractServices.reduce((acc, service) => {
			if (service.service_type === serviceType) {
				acc.push({
					value: service.id,
					label: `${service.name} (${service.price})`,
				});
			}
			return acc;
		}, []);
	};

	// Список услуг аутстафф для селекта
	const contractServicesList = createServiceList(1);

	// Список доп услуг для селекта
	const additionalServicesList = createServiceList(2);

	// Выбранная услуга
	const handleServiceChange = (value) => {
		setSelectedContractService(value);
	};

	// Выбранная доп услуга
	const handleAdditionalServiceChange = (value) => {
		setSelectedAdditionalService(value);
	};

	// Объединение массива доп услуг с выбранной услугой
	// const selectedAllServices = [...selectedAdditionalService, selectedContractService];
	const selectedAllServices = [
		...selectedAdditionalService,
		...(selectedContractService !== undefined ? [selectedContractService] : []),
	];

	// console.log('selectedAllServices', selectedAllServices);

	// Новый массив всех услуг со стоимостью
	const allServicesWithPrice = contractServices?.filter((item) =>
		selectedAllServices.includes(item.id)
	);
	// console.log('allServicesWithPrice', allServicesWithPrice);

	return {
		contractServicesList,
		additionalServicesList,
		selectedContractService,
		handleServiceChange,
		selectedAllServices,
		selectedAdditionalService,
		handleAdditionalServiceChange,
		allServicesWithPrice,
	};
};

export default useContractService;
