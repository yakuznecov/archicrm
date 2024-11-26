// Заказы в договорах клиентов
import { create } from 'zustand';
import {
	getContractOrders,
	getContractOrdersByDate,
	getContractOrdersParams,
	getOrderPayments,
	getOrderPaymentsByDate,
	getOrderPaymentsParams,
	getOrderPaymentsByManager,
} from '@/services';

export const useContractOrdersStore = create((set) => ({
	contractOrdersList: [],
	contractOrderPayments: [], // оплаты
	orderPaymentsByManager: [], // оплаты по менеджеру
	contractById: {}, // заказ клиента
	managerId: null, // id менеджера, когда открывает модальное окно с его оплатами
	selectedOrderAmount: 0, // сумма заказа при редактировании отдельного заказа на главной
	loading: false,
	orderFilters: {},
	getContractOrders: async () => {
		set({ loading: true });
		const contractOrdersList = await getContractOrders();
		set({ contractOrdersList, loading: false });
	},
	// запрос по дате
	getContractOrdersByDate: async (data) => {
		set({ loading: true });
		const contractOrdersList = await getContractOrdersByDate(data);
		set({ contractOrdersList, loading: false });
	},
	// запрос по менеджеру
	getContractOrdersByManager: async (manager_id, contr_agent_id) => {
		set({ loading: true });
		const orderPaymentsByManager = await getOrderPaymentsByManager(
			manager_id,
			contr_agent_id
		);
		set({ orderPaymentsByManager, loading: false });
	},
	// Запрос с параметрами
	getContractOrdersParams: async (filters) => {
		set({ loading: true });
		const contractOrdersList = await getContractOrdersParams(filters);
		set({ contractOrdersList, loading: false });
	},
	// Запрос с оплат
	getOrderPayments: async () => {
		set({ loading: true });
		const contractOrderPayments = await getOrderPayments();
		set({ contractOrderPayments, loading: false });
	},
	// Запрос оплат по дате
	getOrderPaymentsByDate: async (data) => {
		set({ loading: true });
		const contractOrderPayments = await getOrderPaymentsByDate(data);
		set({ contractOrderPayments, loading: false });
	},
	// Запрос оплат с параметрами
	getOrderPaymentsParams: async (filters) => {
		set({ loading: true });
		const contractOrderPayments = await getOrderPaymentsParams(filters);
		set({ contractOrderPayments, loading: false });
	},
	// Добавить фильтр
	addOrderFilter: (filter) =>
		set((state) => ({ orderFilters: { ...state.orderFilters, ...filter } })),
	// Сбросить фильтры
	resetFilters: () => set({ orderFilters: {} }),
	// добавить сумму редактируемого заказа
	addSelectedOrderAmount: (amount) => set({ selectedOrderAmount: amount }),
	// Добавить id менеджера
	addManagerId: (managerId) => set({ managerId }),
}));
