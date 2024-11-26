// Установка адресов компании для селекта
import { useEffect, useState, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useCompanyAddress } from '@/storeZustand/company';

const useSelectedCompanyAddress = (address) => {
	const [selectedCompanyAddress, setSelectedCompanyAddress] = useState(null);
	const [selectedFactAddress, setSelectedFactAddress] = useState(null);
	const [selectedAddress12, setSelectedAddress12] = useState(null);
	const [selectedAddress34, setSelectedAddress34] = useState(null);
	const [selectedFilingAddress, setSelectedFilingAddress] = useState(null);

	// Все адреса компаний
	const [companyAddress, getCompanyAddress] = useCompanyAddress(
		useShallow((state) => [state.companyAddress, state.getCompanyAddress])
	);

	// получить список адресов компаний
	useEffect(() => {
		getCompanyAddress();
	}, []);

	// Выбранная компания при редактировании адресов
	useEffect(() => {
		const createSelectedAddress = (type) => {
			const foundAddress = address?.find((item) => item.type === type);
			const labelData = `${foundAddress?.name} | ${foundAddress?.type}`;

			if (foundAddress) {
				const selectedAddress = {
					value: foundAddress.id,
					label: labelData,
				};

				return selectedAddress;
			}

			return null;
		};

		const selectedCompanyAddress = createSelectedAddress('Юридический Адрес');
		const selectedFactAddress = createSelectedAddress('Фактический Адрес');
		const selectedAddress12 = createSelectedAddress('Адрес пункта 1.2');
		const selectedAddress34 = createSelectedAddress('Адрес пункта 3.4');
		const selectedFilingAddress = createSelectedAddress(
			'Место подачи в уведомлении'
		);

		setSelectedCompanyAddress(selectedCompanyAddress);
		setSelectedFactAddress(selectedFactAddress);
		setSelectedAddress12(selectedAddress12);
		setSelectedAddress34(selectedAddress34);
		setSelectedFilingAddress(selectedFilingAddress);
	}, [address]);

	// Функция для создания данных для селекта
	const createSelectData = (type) =>
		companyAddress
			?.filter((address) => address.type === type)
			.map(({ id, name, type }) => ({
				value: id,
				label: `${name} | ${type}`,
			}));

	// Список адресов для селекта
	const companyAddressData = useMemo(
		() => createSelectData('Юридический Адрес'),
		[companyAddress]
	);

	const companyFactAddressData = useMemo(
		() => createSelectData('Фактический Адрес'),
		[companyAddress]
	);

	const companyAddress12Data = useMemo(
		() => createSelectData('Адрес пункта 1.2'),
		[companyAddress]
	);

	const companyAddress34Data = useMemo(
		() => createSelectData('Адрес пункта 3.4'),
		[companyAddress]
	);

	const companyFilingAddressData = useMemo(
		() => createSelectData('Место подачи в уведомлении'),
		[companyAddress]
	);

	const handleSelectedCompanyAddress = (value) => {
		setSelectedCompanyAddress(value);
	};

	const handleSelectedFactAddress = (value) => {
		setSelectedFactAddress(value);
	};

	const handleSelectedAddress12 = (value) => {
		setSelectedAddress12(value);
	};

	const handleSelectedAddress34 = (value) => {
		setSelectedAddress34(value);
	};

	const handleSelectedFilingAddress = (value) => {
		setSelectedFilingAddress(value);
	};

	return {
		companyAddressData,
		selectedCompanyAddress,
		handleSelectedCompanyAddress,
		companyFactAddressData,
		selectedFactAddress,
		handleSelectedFactAddress,
		companyAddress12Data,
		selectedAddress12,
		handleSelectedAddress12,
		companyAddress34Data,
		selectedAddress34,
		handleSelectedAddress34,
		companyFilingAddressData,
		selectedFilingAddress,
		handleSelectedFilingAddress,
		getCompanyAddress,
	};
};

export default useSelectedCompanyAddress;
