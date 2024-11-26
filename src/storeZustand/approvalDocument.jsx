// Патент

import { create } from 'zustand';
import {
	getApprovalDocuments,
	getSingleDocument,
	addApprovalDocument,
	updateApprovalDocument,
} from '@/services/approvalDocuments';

export const useApprovalDocumentStore = create((set) => ({
	approvalDocuments: [],
	singleDocument: {},
	loading: false,
	getApprovalDocuments: async () => {
		set({ loading: true });
		const approvalDocuments = await getApprovalDocuments();
		set({ approvalDocuments, loading: false });
	},
	getSingleDocument: async (id) => {
		const singleDocument = await getSingleDocument(id);
		set({ singleDocument });
	},
	addApprovalDocument: async (updatedDocument, customerId) => {
		await addApprovalDocument(updatedDocument, customerId);
	},
	updateApprovalDocument: async (updatedDocument, customerId) => {
		await updateApprovalDocument(updatedDocument, customerId);
	},
}));
