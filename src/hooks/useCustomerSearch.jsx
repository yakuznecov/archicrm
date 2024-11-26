import { useState, useEffect, useMemo } from 'react';
import useDebounce from './useDebounce';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useCustomersStore } from '@/storeZustand';

const useCustomerSearch = () => {
	// Поиск клиентов
	const [searchCustomer, customersList, setSelectedCustomer] =
		useCustomersStore(
			useShallow((state) => [
				state.searchCustomer,
				state.customersList,
				state.setSelectedCustomer,
			])
		);

	const [searchInput, setSearchInput] = useState(''); // Поиск по телефону
	const debouncedSearchInput = useDebounce(searchInput, 500);

	useEffect(() => {
		if (debouncedSearchInput && debouncedSearchInput?.length >= 7) {
			searchCustomer(debouncedSearchInput);
		}
	}, [debouncedSearchInput]);

	// Установка первого выбранного клиента
	useEffect(() => {
		if (customersList && customersList?.length > 0) {
			const { id, name, phone } = customersList[0];
			setSelectedCustomer({
				id: id,
				value: phone,
				label: `${name} – ${phone}`,
			});
		} else {
			setSelectedCustomer({
				value: '',
				label: 'Клиента нет в базе данных',
			});
		}
	}, [customersList]);

	// Список найденных клиентов для селекта
	const customersData = useMemo(() => {
		return (
			customersList?.map(({ id, name, phone }) => ({
				id,
				value: phone,
				label: `${name} – ${phone}`,
			})) ?? []
		);
	}, [customersList]);

	const handleSelectedCustomer = (value) => {
		setSelectedCustomer(value);
	};

	return {
		customersList,
		customersData,
		setSearchInput,
		handleSelectedCustomer,
	};
};

export default useCustomerSearch;
