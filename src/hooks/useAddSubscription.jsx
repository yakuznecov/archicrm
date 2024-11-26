import { useState } from 'react';
import { post } from '@/helpers/api_helper';
import { successToast, errorToast } from '@/components';
import { addSubPayment, addSubSeparatePayment, addSubVisit } from '@/services';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useDepartmentsStore,
	useUserStore,
	useSubscriptionsStore,
	useCustomersStore,
} from '@/storeZustand';

const useAddSubscription = (isCheckedVisit) => {
	// Загрузка данных текущего пользователя
	const [userId, staffId] = useUserStore(
		useShallow((state) => [state.userId, state.staffId])
	);

	// Выбранный клиент
	const [selectedCustomer] = useCustomersStore(
		useShallow((state) => [state.selectedCustomer])
	);

	// Абонементы по номеру телефона
	const [getSubscriptionsByPhone, selectedSubcriptionsName] =
		useSubscriptionsStore(
			useShallow((state) => [
				state.getSubscriptionsByPhone,
				state.selectedSubcriptionsName,
			])
		);

	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	); // Выбранный департамент

	const [sumSubscription, setSumSubscription] = useState(''); // сумма за абонемент
	const [selectedFormSubPayment, setSelectedFormSubPayment] = useState({
		value: 1,
		label: 'Наличные',
	}); // для абонементов
	const [sumSubCash, setSumSubCash] = useState(''); // сумма наличные абонемент
	const [sumSubCard, setSumSubCard] = useState(''); // сумма карта абонемент

	const handleAddSubscription = async (bookingId) => {
		try {
			const newSubscription = {
				description: 'New',
				from_date: null,
				to_date: null,
				status: 'NEW',
				department: selectedDepartment,
				creator: userId, // создатель записи (текущий пользователь)
				type: selectedSubcriptionsName?.value,
				customer: selectedCustomer?.id,
			};

			const response = await post('/subscription/', newSubscription);
			const subId = response.id;

			// списание визита за абонемент
			if (isCheckedVisit) addSubVisit(subId);

			// добавление оплаты за абонемент
			if (selectedFormSubPayment.value !== 3) {
				await addSubPayment(
					subId,
					bookingId,
					sumSubscription,
					selectedFormSubPayment,
					staffId
				); // добавление оплаты за абонемент
			} else {
				await addSubSeparatePayment(
					bookingId,
					subId,
					sumSubCash,
					sumSubCard,
					staffId
				); // добавление раздельной оплаты за абонемент
			}

			getSubscriptionsByPhone(selectedCustomer.value); // абонементы по номеру телефона
			successToast('Абонемент добавлен.');
		} catch (error) {
			errorToast('Произошла ошибка при добавлении абонемента.');
		}
	};

	// Выбор формы оплаты за абонемент
	const handleSelectedFormSubPayment = (value) => {
		setSelectedFormSubPayment(value);
	};

	// Сумма к оплате наличными
	const handleSumSubCash = (event) => {
		setSumSubCash(event.target.value);
	};

	// Сумма к оплате безнал
	const handleSumSubCard = (event) => {
		setSumSubCard(event.target.value);
	};

	// Сумма за абонемент
	const handleSumSubscriptions = (event) => {
		setSumSubscription(event.target.value);
	};

	return {
		handleAddSubscription,
		handleSelectedFormSubPayment,
		handleSumSubCash,
		handleSumSubCard,
		handleSumSubscriptions,
		setSumSubscription,
		sumSubscription,
		selectedFormSubPayment,
		sumSubCash,
		sumSubCard,
	};
};

export default useAddSubscription;
