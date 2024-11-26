import { useEffect, useMemo } from 'react';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useSubscriptionsStore } from '@/storeZustand';

const useSubscriptionsNames = () => {
	const [
		getSubscriptionsName,
		subscriptionsNameList,
		setSelectedSubcriptionsName,
	] = useSubscriptionsStore(
		useShallow((state) => [
			state.getSubscriptionsName,
			state.subscriptionsNameList,
			state.setSelectedSubcriptionsName,
		])
	);

	// get all subscriptionsName
	useEffect(() => {
		getSubscriptionsName();
	}, []);

	// Список найденных названий абонементов
	const subscriptionsNameData = useMemo(() => {
		return (
			subscriptionsNameList?.map(
				({ id, name, month, total_available_visits, price }) => ({
					value: id,
					price,
					label: `${name} - (${month} мес.), визитов: ${total_available_visits}, стоимость: ${price} руб.`,
				})
			) ?? []
		);
	}, [subscriptionsNameList]);

	// Выбор названия абонемента в селекте
	const handleSelectedSubscriptionName = (value) => {
		setSelectedSubcriptionsName(value);
	};

	// Найденное название абонемента при редактировании
	const findSubcriptionsNameInData = (id) => {
		const foundSubName = subscriptionsNameData.find(
			(item) => item.value === id
		);

		if (foundSubName) {
			return {
				value: foundSubName.value,
				label: foundSubName.label,
			};
		}

		return null;
	};

	return {
		subscriptionsNameData,
		handleSelectedSubscriptionName,
		findSubcriptionsNameInData,
		setSelectedSubcriptionsName,
	};
};

export default useSubscriptionsNames;
