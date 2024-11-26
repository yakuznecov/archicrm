// Документы, которые выводятся как чекбоксы в договоре
import { create } from 'zustand';
import { getNamesDocuments } from '@/services';

export const useNamesDocumentsStore = create((set) => ({
	namesDocuments: [],
	getNamesDocuments: async () => {
		const namesDocuments = await getNamesDocuments();
		set({ namesDocuments });
	},
}))