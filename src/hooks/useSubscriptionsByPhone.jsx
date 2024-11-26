import { useEffect, useMemo } from 'react';

// Zuztand store
import { useShallow } from 'zustand/react/shallow';
import { useVisitStore, useSubscriptionsStore } from '@/storeZustand';

const useSubscriptionsByPhone = (phone) => {
	// Все адреса компаний
	const [getVisitById, singleVisit] = useVisitStore(
		useShallow((state) => [state.getVisitById, state.singleVisit])
	);

	// Абонементы
	const [
		getSubscriptionsByPhone,
		setSelectedSubscription,
		subscriptionsByPhone,
		selectedSubscription,
	] = useSubscriptionsStore(
		useShallow((state) => [
			state.getSubscriptionsByPhone,
			state.setSelectedSubscription,
			state.subscriptionsByPhone,
			state.selectedSubscription,
		])
	);

	// Все абонементы клиента по номеру телефона
	useEffect(() => {
		if (phone) {
			getSubscriptionsByPhone(phone); // Загрузка абонементов по номеру телефона
		}
	}, [phone]);

	// Список найденных названий абонементов
	const subscriptionsByPhoneData = useMemo(() => {
		return (
			subscriptionsByPhone?.map((item) => ({
				value: item.id,
				label: `${item?.type?.name} - (${item?.type?.month} мес.). Общее кол-во посещений - ${item?.type?.total_available_visits}`,
			})) ?? []
		);
	}, [subscriptionsByPhone]);

	// Выбор названия абонемента в селекте
	const handleSelectedSubscriptionByPhone = (value) => {
		setSelectedSubscription(value); // Выбор абонемента
		getVisitById(value.value);
	};

	return {
		subscriptionsByPhoneData,
		handleSelectedSubscriptionByPhone,
		selectedSubscription,
		singleVisit,
	};
};

export default useSubscriptionsByPhone;
