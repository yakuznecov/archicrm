// Заявки
import { get, put, patch } from '@/helpers/api_helper';
import { successToast, errorToast } from '@/components';

export const getServiceRequests = async ({ departmentId, selectedStatus }) => {
	try {
		const response = await get(
			`/service_requests/?department_id=${departmentId}&status=${selectedStatus}`
		);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке заявок.');
	}
};

export const updateServiceRequest = async (data) => {
	try {
		const { changedServiceRequest, id } = data;
		await put(`/service_requests/${id}/`, changedServiceRequest);

		successToast('Заявка обновлена.');
	} catch (error) {
		errorToast('Произошла ошибка при обновлении заявки.');
	}
};

export const getServiceRequestById = async (id) => {
	try {
		const response = await get(`/service_requests/${id}/`);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке заявки.');
	}
};

// частичное обновление заявки
export const serviceRequestPatch = async ({ id, changedServiceRequest }) => {
	try {
		await patch(`/service_requests/${id}/`, changedServiceRequest);
		successToast('Заявка обновлена.');
	} catch (error) {
		errorToast('Произошла ошибка при обновлении заявки.');
	}
};
