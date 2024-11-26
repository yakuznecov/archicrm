import { useEffect, useMemo } from 'react';
import { Select } from 'antd';
import { filterOption } from '@/helpers';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useCompaniesStore, useDepartmentsStore } from '@/storeZustand';

const SelectCompany = ({ company }) => {
	// Выбранный департамент
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	// Все компании
	const [ownCompanies, getOwnCompanies, setSelectedCompany, selectedCompany] =
		useCompaniesStore(
			useShallow((state) => [
				state.ownCompanies,
				state.getOwnCompanies,
				state.setSelectedCompany,
				state.selectedCompany,
			])
		);

	useEffect(() => {
		getOwnCompanies(selectedDepartment);
	}, [selectedDepartment]);

	// Выбранная компания при редактировании
	useEffect(() => {
		if (company) {
			setSelectedCompany(company);
		}
	}, [company]); // запрос компании при редактировании клиента

	// Список компаний аустафф
	const companiesData = useMemo(() => {
		return (
			ownCompanies?.map(({ id, name, city }) => ({
				value: id,
				label: `${name} - ${city}`,
			})) ?? []
		);
	}, [ownCompanies]);

	const handleSelectedCompany = (value) => {
		setSelectedCompany(value);
	};

	return (
		<Select
			showSearch
			placeholder='Выбрать компанию'
			optionFilterProp='children'
			style={{ width: '100%' }}
			allowClear
			options={companiesData}
			value={selectedCompany || undefined}
			onChange={handleSelectedCompany}
			filterOption={filterOption}
		/>
	);
};

export default SelectCompany;
