// Абонементы
import { get, put } from '@/helpers/api_helper';
import { successToast, errorToast } from '@/components';

export const getSubscriptions = async ({ department_id, start_date, end_date }) => {
	try {
		const response = await get(`/subscription/?department_id=${department_id}&start_date=${start_date}&end_date=${end_date}`);

		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке абонементов.');
	}
};

// Абонемент по id
export const getSingleSubscription = async (subId) => {
	try {
		const response = await get(`/subscription/${subId}/`);

		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке абонемента.');
	}
};

// Абонементы по номеру телефона
export const getSubscriptionsByPhone = async (phone) => {
	try {
		const response = await get(`/subscription/?phone=${phone}`);

		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке абонемента.');
	}
};

// обновление абонемента
export const updateSubscription = async ({ changedSubscription, id }) => {
	try {
		await put(`/subscription/${id}/`, changedSubscription);

		successToast('Абонемент обновлен.');
	} catch (error) {
		errorToast('Произошла ошибка при обновлении абонемента.');
	}
}

// оплата	абонемента
export const getPaymentSubscriptions = async ({ department_id, start_date, end_date }) => {
	try {
		const response = await get(`/payment/subscription/?department_id=${department_id}&start_date=${start_date}&end_date=${end_date}`);

		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке оплат абонементов.');
	}
};

// Оплата по id абонемента
export const getSinglePaymentSubscription = async (paymentId) => {
	try {
		const response = await get(`/payment/subscription/${paymentId}/`);

		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке оплаты абонемента.');
	}
};

// обновление оплаты абонемента
export const updatePaymentSubscription = async ({ changedPaymentSub, id }) => {
	try {
		await put(`/payment/subscription/${id}/`, changedPaymentSub);

		successToast('Оплата абонемента обновлена.');
	} catch (error) {
		errorToast('Произошла ошибка при обновлении оплаты абонемента.');
	}
}

// Получить название абонемента
export const getSubscriptionsName = async () => {
	try {
		const response = await get("/name/subscription/");
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при получении названия абонемента.');
	}
};
