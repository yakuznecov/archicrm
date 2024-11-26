// Заказы к договорам
import { get, post, put } from '@/helpers/api_helper';
import { errorToast, successToast } from '@/components';

// Получить заказы договоров
export const getContractOrders = async () => {
	try {
		const response = await get('/outstaff/contract_orders/');
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке заказов.');
	}
};

// Получить заказы по дате
export const getContractOrdersByDate = async ({
	start_date = null,
	end_date = null,
}) => {
	try {
		const response = await get(
			`/outstaff/contract_orders/?start_date=${start_date}&end_date=${end_date}`
		);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке заказов.');
	}
};

// параметры фильтрации заказов
export const getContractOrdersParams = async (...filterObjects) => {
	const combinedFilters = Object.assign({}, ...filterObjects);
	const params = new URLSearchParams();

	for (const key in combinedFilters) {
		if (combinedFilters[key]) {
			params.append(key, combinedFilters[key]);
		}
	}

	const url = `/outstaff/contract_orders/?${params.toString()}`;

	try {
		const response = await get(url);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке заказов.');
	}
};

// Добавить заказ
export const addContractOrder = async (data) => {
	try {
		const response = await post('/outstaff/contract_orders/', data);
		successToast('Заказ добавлен.');
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при добавлении заказа.');
	}
};

// обновить заказ
export const updateContractOrder = async ({ orderId, updatedOrder }) => {
	try {
		await put(`/outstaff/contract_orders/${orderId}/`, updatedOrder);
		successToast('Заказ обновлен.');
	} catch (error) {
		errorToast('Произошла ошибка при обновлении заказа.');
	}
};

// загрузка всех оплат заказов
export const getOrderPayments = async () => {
	try {
		const response = await get('/outstaff/contract_order_payment/');
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке оплат.');
	}
};

// Загрузка оплат с фильтрацией по менеджеру
export const getOrderPaymentsByManager = async (
	manager_id,
	contr_agent_id = ''
) => {
	try {
		const response = await get(
			`/outstaff/contract_order_payment/?manager_id=${manager_id}&contr_agent_id=${contr_agent_id}`
		);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке оплат по менеджеру.');
	}
};

// Загрузка оплат заказов по дате
export const getOrderPaymentsByDate = async ({
	start_date = null,
	end_date = null,
}) => {
	try {
		const response = await get(
			`/outstaff/contract_order_payment/?start_date=${start_date}&end_date=${end_date}`
		);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке оплат.');
	}
};

// параметры фильтрации оплат заказов
export const getOrderPaymentsParams = async (...filterObjects) => {
	const combinedFilters = Object.assign({}, ...filterObjects);
	const params = new URLSearchParams();

	for (const key in combinedFilters) {
		if (combinedFilters[key]) {
			params.append(key, combinedFilters[key]);
		}
	}

	const url = `/outstaff/contract_order_payment?${params.toString()}`;

	try {
		const response = await get(url);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке оплат заказов.');
	}
};

// оплата заказов
export const addContractOrderPayment = async (data) => {
	try {
		const response = await post('/outstaff/contract_order_payment/', data);
		successToast('Заказ оплачен.');
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при оплате заказа.');
	}
};
