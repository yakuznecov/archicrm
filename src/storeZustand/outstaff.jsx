// Сотрудники аустафф
import { create } from 'zustand';
import { getOutStaff, getUploadFiles } from '@/services';

export const useOutStaff = create((set) => ({
	outstaffList: [],
	uploadFilesList: [], // список загруженных файлов по договору клиента
	loading: false,
	getOutStaff: async () => {
		const outstaffList = await getOutStaff();
		set({ outstaffList });
	},
	getUploadFiles: async (contractId) => {
		set({ loading: true });
		const uploadFilesList = await getUploadFiles(contractId);
		set({ uploadFilesList, loading: false });
	},
	// очистить список загруженных файлов
	clearUploadFilesList: () => set({ uploadFilesList: [] }),
}))