// SelectTemplateSetFilters Выбор набора шаблонов в селекте на главной в фильтрах
import { useEffect, useMemo } from 'react';
import { Select } from 'antd';
import { filterOption } from '@/helpers';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useTemplatesStore, useContractsStore } from '@/storeZustand';

const SelectTemplateSetFilters = () => {
	// Шаблоны документов
	const [
		getTemplatesSet,
		templatesSetList,
		selectedTemplateSetFilters,
		setSelectedTemplateSetFilters,
	] = useTemplatesStore(
		useShallow((state) => [
			state.getTemplatesSet,
			state.templatesSetList,
			state.selectedTemplateSetFilters,
			state.setSelectedTemplateSetFilters,
		])
	);

	// Договоры клиента
	const [addFilter, filters] = useContractsStore(
		useShallow((state) => [state.addFilter, state.filters])
	);

	useEffect(() => {
		getTemplatesSet(); // список наборов шаблонов
	}, []);

	// Список шаблонов для селекта
	const templatesList = useMemo(() => {
		return (
			templatesSetList?.map((template) => ({
				value: template.id,
				label: template.name,
			})) ?? []
		);
	}, [templatesSetList]);

	const handleTemplateSetFetch = async (value) => {
		setSelectedTemplateSetFilters(value);

		const filters = {
			template_set_id: value,
		};

		addFilter(filters);
	};

	return (
		<Select
			showSearch
			mode='multiple'
			placeholder='Шаблоны'
			style={{ width: '100%' }}
			allowClear
			value={selectedTemplateSetFilters || undefined}
			onChange={handleTemplateSetFetch}
			options={templatesList}
			optionFilterProp='children'
			filterOption={filterOption}
		/>
	);
};

export default SelectTemplateSetFilters;
