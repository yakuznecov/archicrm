// Поля для документа
import { create } from 'zustand';
import { getFields, addField, updateField, patchField, getFieldById } from '@/services';

export const useFieldsStore = create((set) => ({
	fieldsList: [],
	fieldById: {},
	loading: false,
	getFields: async () => {
		set({ loading: true });
		const fieldsList = await getFields();
		set({ fieldsList, loading: false });
	},
	// Поле по ID
	getFieldById: async (id) => {
		const fieldById = await getFieldById(id);
		set({ fieldById });
	},
	// Добавление нового поля
	addField: async (newField) => {
		const field = await addField(newField);
		return field;
	},
	// Обновление поля
	updateField: async ({ id, fieldData }) => {
		await updateField({ id, fieldData });
	},
	// Обновление некоторых полей
	patchField: async ({ id, fieldData }) => {
		await patchField({ id, fieldData });
	}
}))