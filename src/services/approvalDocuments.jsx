// Патенты

import { get, post, put, patch } from '@/helpers/api_helper';
import { successToast, errorToast } from '@/components';

// получить все патенты
export const getApprovalDocuments = async () => {
	try {
		const response = await get('/outstaff/approval/document/');
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке патентов.');
	}
};

// получить один патент
export const getSingleDocument = async (documentId) => {
	try {
		const response = await get(`/outstaff/approval/document/${documentId}/`);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке патента.');
	}
};

// добавить патент
export const addApprovalDocument = async (updatedDocument, customerId) => {
	try {
		const response = await post(
			'/outstaff/approval/document/',
			updatedDocument
		);
		const id = response.id; // id документа

		if (customerId) {
			const updatedDocument = {
				approval_document: id,
			};

			await patch(`/outstaff/client/${customerId}/`, updatedDocument);
		}

		successToast('Патент добавлен.');

		return response;
	} catch (error) {
		errorToast('Произошла ошибка при добавлении патента.');
	}
};

// обновить патент
export const updateApprovalDocument = async ({ id, updatedDocument }) => {
	try {
		await put(`/outstaff/approval/document/${id}/`, updatedDocument);

		successToast('Данные патента обновлены.');
	} catch (error) {
		errorToast('Произошла ошибка при обновлении патента.');
	}
};
