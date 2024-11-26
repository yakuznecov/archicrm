// Записи к специалистам
import { get } from '@/helpers/api_helper';
import { errorToast } from '@/components';

export const getBookings = async ({
	department_id = null,
	start_date,
	end_date,
}) => {
	try {
		const response = await get(
			`/bookings/?department_id=${department_id}&start_date=${start_date}&end_date=${end_date}`
		);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке записей.');
	}
};

export const getBookingById = async (bookingId) => {
	try {
		const response = await get(`/bookings/${bookingId}/`);

		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке записи.');
	}
};

// Записи к конкретным специалистам
export const getBookingsCurrent = async ({
	department_id,
	start_date,
	end_date,
}) => {
	try {
		const response = await get(
			`/bookings_current/?department_id=${department_id}&start_date=${start_date}&end_date=${end_date}`
		);

		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке записей к специалистам.');
	}
};
