// Выбор наборов шаблонов в селекте договора
import { useEffect, useMemo } from 'react';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useTemplatesStore, useContractsStore } from '@/storeZustand';

const useSelectedTemplatesSet = () => {
	// Договоры
	const [contractById] = useContractsStore(
		useShallow((state) => [state.contractById])
	);
	console.log('contractById', contractById);

	// Шаблоны документов
	const [getTemplatesSet, templatesSetList] = useTemplatesStore(
		useShallow((state) => [state.getTemplatesSet, state.templatesSetList])
	);

	// Шаблоны
	const [
		setSelectedTemplateSet, // Установить набор шаблонов
	] = useTemplatesStore(useShallow((state) => [state.setSelectedTemplateSet]));

	useEffect(() => {
		getTemplatesSet(); // список наборов шаблонов
	}, []);

	// Список шаблонов для селекта в модальном окне
	const templatesSetData = useMemo(() => {
		return (
			templatesSetList?.map(({ id, name }) => ({
				value: id,
				label: name,
			})) ?? []
		);
	}, [templatesSetList]);

	// Загрузка набора шаблонов по id при редактировании
	useEffect(() => {
		if (contractById?.id) {
			setSelectedTemplateSet(contractById?.template_set);
		}
	}, [contractById]);

	// выбор набора шаблонов
	const handleSelectedTemplateSet = (value) => {
		setSelectedTemplateSet(value);
	};

	return {
		templatesSetData,
		handleSelectedTemplateSet,
	};
};

export default useSelectedTemplatesSet;
