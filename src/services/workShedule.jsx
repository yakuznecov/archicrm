// График сотрудников
import { get, post, put, del } from '@/helpers/api_helper';
import { errorToast, successToast } from '@/components';

export const getWorkShedule = async ({ department_id, start_date, end_date }) => {
	try {
		const response = await get(`/staff_working_schedule/?department_id=${department_id}&start_date=${start_date}&end_date=${end_date}`);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке данных.');
	}
};

export const updateSpecialist = async ({ changedSpecialist, id }) => {
	try {
		await put(`/staff_working_schedule/${id}/`, changedSpecialist);
		successToast('Данные обновлены');
	} catch (error) {
		errorToast('Произошла ошибка при обновлении данных.');
	}
}

export const newDateSpecialist = async (data) => {
	try {
		await post('/staff_working_schedule/', data);
		successToast('Данные добавлены');
	} catch (error) {
		errorToast('Произошла ошибка при добавлении данных.');
	}
}

// удалить данные
export const deleteDate = async (id) => {
	try {
		await del(`/staff_working_schedule/${id}/`);
		successToast('Данные удалены');
	} catch (error) {
		errorToast('Произошла ошибка при удалении данных.');
	}
}



