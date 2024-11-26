// Выбор нескольких шаблонов в селекте
import { useEffect, useMemo, useState } from 'react';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useTemplatesStore } from '@/storeZustand';

const useSelectedTemplates = (templatesSetById = {}) => {
	const [selectedTemplate, setSelectedTemplate] = useState({}); // выбранный шаблон
	const [selectedTemplates, setSelectedTemplates] = useState([]); // выбранные шаблоны

	// Выбранные шаблоны в селекте по id
	const selectedTemplatesIds = selectedTemplates?.map(({ id }) => id);

	// Шаблоны документов
	const [getTemplates, templatesList] = useTemplatesStore(
		useShallow((state) => [state.getTemplates, state.templatesList])
	);

	useEffect(() => {
		getTemplates();
	}, []);

	// установка выбранных шаблонов при редактировании
	useEffect(() => {
		if (templatesSetById) {
			setSelectedTemplatesValue(templatesSetById);
		}
	}, [templatesSetById]);

	// Список шаблонов для селекта в модальном окне
	const templatesData = useMemo(() => {
		return (
			templatesList?.map(({ id, name }) => ({
				id,
				value: id,
				label: name,
			})) ?? []
		);
	}, [templatesList]);

	// установка нескольких значений
	const handleSelectedTemplates = (value) => {
		setSelectedTemplates(value);
	};

	// выбор шаблона
	const handleSelectedTemplate = (value) => {
		setSelectedTemplate(value);
	};

	// установка селекта при редактировании
	const setSelectedTemplatesValue = (templatesSetById) => {
		const editTemplates = templatesSetById?.document_template?.map(
			({ id, name }) => ({
				id,
				value: id,
				label: name,
			})
		);

		setSelectedTemplates(editTemplates);
	};

	return {
		templatesData,
		selectedTemplate,
		selectedTemplates,
		selectedTemplatesIds,
		setSelectedTemplates,
		handleSelectedTemplate,
		handleSelectedTemplates,
		setSelectedTemplatesValue,
	};
};

export default useSelectedTemplates;
