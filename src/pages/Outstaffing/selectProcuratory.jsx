// Выбор доверенности в селекте в договоре
import { useEffect, useMemo } from 'react';
import { Select } from 'antd';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useCompaniesStore, useProcuratory } from '@/storeZustand';

const filterOption = (input, option) =>
	(option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const SelectProcuratory = () => {
	// Все доверенности
	const [
		procuratory,
		getProcuratory,
		selectedProcuratory,
		setSelectedProcuratory,
	] = useProcuratory(
		useShallow((state) => [
			state.procuratory,
			state.getProcuratory,
			state.selectedProcuratory,
			state.setSelectedProcuratory,
		])
	);

	// получить список доверенностей
	useEffect(() => {
		getProcuratory();
	}, []);

	// Все компании
	const [selectedCompany] = useCompaniesStore((state) => [
		state.selectedCompany,
	]);

	// Выбранная доверенность при редактировании
	useEffect(() => {
		if (selectedCompany) {
			// сначала фильтрация по id компании
			const foundProcuratory = procuratory?.filter(
				(procuratory) => procuratory?.company?.id === selectedCompany
			);

			if (foundProcuratory) {
				setSelectedProcuratory(foundProcuratory[0]?.id);
			}
		}
	}, [selectedCompany]);

	// Список доверенностей для селекта
	const procuratoryData = useMemo(() => {
		return (
			procuratory?.map(({ id, company, staff }) => ({
				value: id,
				label: `${company?.name} | ${company?.city} | ${staff?.name} ${staff?.second_name} ${staff?.surname}`,
			})) ?? []
		);
	}, [selectedCompany]);

	const handleSelectedProcuratory = (value) => {
		setSelectedProcuratory(value);
	};

	return (
		<Select
			showSearch
			placeholder='Выбрать доверенность'
			optionFilterProp='children'
			style={{ width: '100%' }}
			allowClear
			options={procuratoryData}
			value={selectedProcuratory || undefined}
			onChange={handleSelectedProcuratory}
			filterOption={filterOption}
		/>
	);
};

export default SelectProcuratory;
