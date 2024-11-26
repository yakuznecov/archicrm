// SelectCompanyFilters, Выбор компаний в селекте на главной в фильтрах
import { useEffect, useState, useMemo } from 'react';
import { Select } from 'antd';
import { filterOption } from '@/helpers';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useContractsStore,
	useCompaniesStore,
	useDepartmentsStore,
} from '@/storeZustand';

const SelectCompanyFilters = () => {
	// Выбранный департамент
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	// Все компании
	const [
		ownCompanies,
		getOwnCompanies,
		selectedCompanies,
		setSelectedCompanies,
	] = useCompaniesStore(
		useShallow((state) => [
			state.ownCompanies,
			state.getOwnCompanies,
			state.selectedCompanies,
			state.setSelectedCompanies,
		])
	);

	// Договоры клиента
	const [addFilter] = useContractsStore(
		useShallow((state) => [state.addFilter])
	);

	useEffect(() => {
		getOwnCompanies(selectedDepartment);
	}, []);

	// Список компаний аустафф
	const companiesData = useMemo(() => {
		return (
			ownCompanies?.map(({ id, name, city }) => ({
				value: id,
				label: `${name} - ${city}`,
			})) ?? []
		);
	}, [ownCompanies]);

	const handleSelectedCompany = async (value) => {
		setSelectedCompanies(value);

		const filters = {
			client_company_id: value,
		};

		addFilter(filters);
	};

	return (
		<Select
			showSearch
			allowClear
			mode='multiple'
			style={{ width: '100%' }}
			placeholder='Выбрать компанию'
			options={companiesData}
			value={selectedCompanies || undefined}
			onChange={handleSelectedCompany}
			filterOption={filterOption}
			optionFilterProp='children'
		/>
	);
};

export default SelectCompanyFilters;
