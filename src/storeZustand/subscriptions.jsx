// Абонементы
import { create } from 'zustand';
import { getSubscriptions, getSingleSubscription, getSubscriptionsByPhone, updateSubscription, getPaymentSubscriptions, getSinglePaymentSubscription, updatePaymentSubscription, getSubscriptionsName } from '@/services';

export const useSubscriptionsStore = create((set) => ({
	subscriptionsList: [],
	subscriptionsByPhone: [],
	subscriptionsNameList: [],
	singleSubscription: {},
	selectedSubscription: {}, // выбранная опция в селекте
	selectedSubcriptionsName: {},
	newSubscriptionId: null, // id нового созданного абонемента
	loading: false,
	getSubscriptions: async ({ department_id, start_date, end_date }) => {
		set({ loading: true });
		const subscriptionsList = await getSubscriptions({ department_id, start_date, end_date });
		set({ subscriptionsList, loading: false });
	},
	// Абонементы по номеру телефона
	getSubscriptionsByPhone: async (phone) => {
		const subscriptionsByPhone = await getSubscriptionsByPhone(phone);
		set({ subscriptionsByPhone });
	},
	// Абонемент по id
	getSingleSubscription: async (id) => {
		const singleSubscription = await getSingleSubscription(id);
		set({ singleSubscription });
	},
	// Добавление нового абонемента
	getSubscriptionsName: async () => {
		const subscriptionsNameList = await getSubscriptionsName();
		set({ subscriptionsNameList });
	},
	// Обновление абонемента
	updateSubscription: async ({ changedSubscription, id }) => {
		await updateSubscription({ changedSubscription, id });
	},
	// выбрать абонемент
	setSelectedSubscription: (selectedSubscription) => {
		set({ selectedSubscription });
	},
	// Установить название абонемента
	setSelectedSubcriptionsName: (selectedSubcriptionsName) => {
		set({ selectedSubcriptionsName });
	},
	// очистка выбранного абонемента
	cleanSelectedSubscription: () => {
		set({ selectedSubscription: {} });
	},
	// очистка списка абонементов по телефону
	cleanSubscriptionsByPhone: () => {
		set({ subscriptionsByPhone: [] });
	},
	cleanSelectedSubcriptionsName: () => {
		set({ selectedSubcriptionsName: {} });
	},
	// очистка id абонемента
	cleanNewSubscriptionId: () => {
		set({ newSubscriptionId: null });
	}
}))

// Оплаты абонементов
export const usePaymentSubscriptionsStore = create((set) => ({
	paymentSubscriptions: [],
	singleSubPayment: {},
	isEditSubPayment: false,
	isPaymentSubAdded: false, // создан абонемент
	newSubPaymentId: null, // id новой оплаты абонемента
	loading: false,
	getPaymentSubscriptions: async (data) => {
		set({ loading: true });
		const paymentSubscriptions = await getPaymentSubscriptions(data);
		set({ paymentSubscriptions, loading: false });
	},
	// Оплата абонемента по id
	getSinglePaymentSubscription: async (id) => {
		const singleSubPayment = await getSinglePaymentSubscription(id);
		set({ singleSubPayment });
	},
	// Обновление оплаты абонемента
	updatePaymentSubscription: async (data) => {
		await updatePaymentSubscription(data);
	},
	// очистка id оплаты абонемента
	clearNewSubPaymentId: () => {
		set({ newSubPaymentId: null });
	},
	setIsEditSubPayment: (isEditSubPayment) => {
		set({ isEditSubPayment });
	},
	setIsPaymentSubAdded: (isPaymentSubAdded) => {
		set({ isPaymentSubAdded });
	}
}))