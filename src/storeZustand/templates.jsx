// Шаблон документа
import { create } from 'zustand';
import {
	addTemplate,
	getTemplates,
	getTemplatesSet,
	getTemplatesSetById,
	addTemplatesSet,
	updateTemplatesSet,
} from '@/services';

export const useTemplatesStore = create((set) => ({
	templatesList: [], // Шаблоны документов
	templatesSetList: [], // Набор шаблонов
	templatesSetById: {},
	selectedTemplateSet: null, // выбранный набор шаблонов
	selectedTemplateSetFilters: [], // фильтры шаблонов в договорах
	loading: false,
	getTemplates: async () => {
		set({ loading: true });
		const templatesList = await getTemplates();
		set({ templatesList, loading: false });
	},
	// Добавление шаблона
	addTemplate: async (updatedTemplate) => {
		await addTemplate(updatedTemplate);
	},
	getTemplatesSet: async () => {
		set({ loading: true });
		const templatesSetList = await getTemplatesSet();
		set({ templatesSetList, loading: false });
	},
	// Набор шаблонов по id
	getTemplatesSetById: async (id) => {
		const templatesSetById = await getTemplatesSetById(id);
		set({ templatesSetById });
	},
	// Очистка шаблона по id
	clearTemplatesSetById: () => {
		set({ templatesSetById: {} });
	},
	// Добавление набора шаблонов
	addTemplatesSet: async (data) => {
		await addTemplatesSet(data);
	},
	// Обновление набора шаблонов
	updateTemplatesSet: async (data) => {
		await updateTemplatesSet(data);
	},
	// Установить набор шаблонов
	setSelectedTemplateSet: (value) => set({ selectedTemplateSet: value }),
	// Установить фильтры шаблонов в договорах
	setSelectedTemplateSetFilters: (value) =>
		set({ selectedTemplateSetFilters: value }),
	// Очистка набора шаблонов
	clearSelectedTemplateSet: () => set({ selectedTemplateSet: null }),
}));
