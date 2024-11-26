import React, {
	useState,
	useEffect,
	useMemo,
	useCallback,
	useRef,
} from 'react';
import { Link } from 'react-router-dom';
import { post, put } from '@/helpers/api_helper';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { isToday } from 'date-fns'; // дата сегодня
import { Select } from 'antd';

import CustomDatePicker from '@/components/Common/CustomDatePicker';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useUserStore,
	useBookingsStore,
	useBookingSalesStore,
	useStaffStore,
	useVisitStore,
	usePaymentsStore,
	useCalendarStore,
	useSubscriptionsStore,
	usePaymentSubscriptionsStore,
	useSkuSalesStore,
	useCustomersStore,
	useServiceRequestsStore,
} from '@/storeZustand';

import {
	successToast,
	errorToast,
	CommonSelect,
	PrimaryBtn,
	UpdateBtn,
	SecondaryBtn,
	BlueBtn,
	GreenBtn,
} from '@/components';

// функции api
import {
	addBookingPayment,
	addBookingSeparatePayment,
	updateBookingPayment,
	addSubPayment,
} from '@/services';

import { bookingStatusData } from '@/common/data/bookingStatusData';
import { formPaymentData, formPaymentSubData } from '@/common/data/formPayment';
import { Toaster } from 'react-hot-toast'; // notifications

import { DataFilter } from '@/containers';

import {
	useCustomerSearch,
	useSelectedStaff,
	useSelectedDepartment,
	useSelectedSku,
	useSelectedAdditionalSales,
	useTotalSkuAmount,
	useTotalAdditionalAmount,
	useSelectedServices,
	useUpdatePayment,
	useDangerAlert,
	useToggle,
	useAddSubscription,
	useSubscriptionsNames,
	useFormPayment,
	useAudio,
} from '@/hooks';

// Reactstrap
import ProfileMenu from '../CommonForBoth/TopbarDropdown/ProfileMenu';
import CustomerModal from '@/components/CustomerModal/CustomerModal';
import DangerAlert from '@/components/Common/DangerAlert';
import HeaderModal from '@/components/HeaderModal/HeaderModal';
import RangeDatePicker from '@/pages/Outstaffing/summary-date/RangeDatePicker';
import { useServiceRequestsGet } from '@/hooks/queries/useServiceRequestsGet';

const HeaderContent = () => {
	// Загрузка данных текущего пользователя
	const [
		staffId,
		userId,
		isPersonalkin,
		isAutstaffkin,
		isSuperAdminOut,
		isSanatera,
		isCallCenter,
		isSuperAdmin,
		isBuh,
		isOutstaff,
	] = useUserStore(
		useShallow((state) => [
			state.staffId,
			state.userId,
			state.isPersonalkin,
			state.isAutstaffkin,
			state.isSuperAdminOut,
			state.isSanatera,
			state.isCallCenter,
			state.isSuperAdmin,
			state.isBuh,
			state.isOutstaff,
		])
	);

	// Поиск клиентов
	const [searchCustomer, selectedCustomer] = useCustomersStore(
		useShallow((state) => [state.searchCustomer, state.selectedCustomer])
	);

	// Записи к специалистам
	const [
		getBookings,
		setIsEditBooking,
		clearSingleBooking,
		singleBooking,
		isEditBooking,
		getBookingsCurrent,
	] = useBookingsStore(
		useShallow((state) => [
			state.getBookings,
			state.setIsEditBooking,
			state.clearSingleBooking,
			state.singleBooking,
			state.isEditBooking,
			state.getBookingsCurrent,
		])
	);

	// Абонементы
	const [
		cleanSelectedSubscription,
		cleanSubscriptionsByPhone,
		cleanNewSubscriptionId,
		selectedSubscription,
		selectedSubcriptionsName,
		cleanSelectedSubcriptionsName,
	] = useSubscriptionsStore(
		useShallow((state) => [
			state.cleanSelectedSubscription,
			state.cleanSubscriptionsByPhone,
			state.cleanNewSubscriptionId,
			state.selectedSubscription,
			state.selectedSubcriptionsName,
			state.cleanSelectedSubcriptionsName,
		])
	);

	// Загрузка заявок и счетчик
	const [setServiceRequestCount] = useServiceRequestsStore(
		useShallow((state) => [state.setServiceRequestCount])
	);

	// Оплаты всех абонементов
	const [setIsPaymentSubAdded, paymentSubscriptions] =
		usePaymentSubscriptionsStore(
			useShallow((state) => [
				state.setIsPaymentSubAdded,
				state.paymentSubscriptions,
			])
		);

	// Доп. услуги
	const [bookingSalesList, clearBookingSales] = useBookingSalesStore(
		useShallow((state) => [state.bookingSalesList, state.clearBookingSales])
	);
	// console.log('bookingSalesList', bookingSalesList);

	// SKU
	const [skuSalesList, clearSkuSales] = useSkuSalesStore(
		useShallow((state) => [state.skuSalesList, state.clearSkuSales])
	);

	const [bookingsExists] = useStaffStore(
		useShallow((state) => [state.bookingsExists])
	);

	// Состояние модального окна
	const [isModalOpen] = usePaymentsStore(
		useShallow((state) => [state.isModalOpen])
	);

	const { filteredData } = DataFilter();

	const { clearSingleVisit } = useVisitStore();

	const [modal, setModal] = useState(false);

	const [bookingId, setBookingId] = useState('');
	const [creatorId, setCreatorId] = useState(null); // id создателя записи

	const [isFormValid, setIsFormValid] = useState(false); // проверка валидности отдельных полей ввода в модальном окне записи
	const [booking, setBooking] = useState([]);
	const [description, setDescription] = useState(''); // комментарий записи
	const [startTime, setStartTime] = useState(); // selected booking time in modal
	const [buttonProductClicked, setButtonProductClicked] = useState(false); // button product clicked
	const [totalServicesPrice, setTotalServicesPrice] = useState(0);
	const [selectedBookingStatus, setSelectedBookingStatus] = useState({
		value: '',
		label: '-------',
	});
	// console.log('selectedBookingStatus >>>>>', selectedBookingStatus);
	const [totalSubscriptionPrice, setTotalSubscriptionPrice] = useState(0);
	// console.log('totalSubscriptionPrice >>>>>', totalSubscriptionPrice);

	const [sumCash, setSumCash] = useState(''); // сумма наличные
	const [sumCard, setSumCard] = useState(''); // сумма карта

	const [isAlertDanger, setIsAlertDanger] = useState(false);

	// Модальное окно добавления клиента
	const [customerModal, toggleCustomerModal] = useToggle(false);

	const [bookingSalesIdsList, setBookingSalesIdsList] = useState([]);
	const [skuSalesIdsList, setSkuSalesIdsList] = useState([]); // список id выбранных sku
	// console.log('skuSalesIdsList >>>', skuSalesIdsList);
	// console.log('bookingSalesIdsList >>>>', bookingSalesIdsList);
	// console.log('totalServicesPrice', totalServicesPrice);
	const [isCheckedVisit, setIsCheckedVisit] = useState(false);
	// console.log('isCheckedVisit', isCheckedVisit);
	const [isPaymentStatusError, setIsPaymentStatusError] = useState(false); // статус "Оплачено" может быть только сегодня

	// получение суммы оплаченного абонемента при редактировании по id записи
	useEffect(() => {
		if (singleBooking?.id && paymentSubscriptions?.length) {
			const filteredSubPayment = paymentSubscriptions?.filter(
				(item) => item?.booking?.id === singleBooking?.id
			);
			// console.log('filteredSubPayment >>>', filteredSubPayment);

			const totalAmount = filteredSubPayment.reduce(
				(sum, obj) => sum + parseFloat(obj.amount),
				0
			);

			setTotalSubscriptionPrice(totalAmount);
		}
	}, [singleBooking]);

	// установка данных при редактировании
	useEffect(() => {
		setBookingId(singleBooking?.id);
		setDescription(singleBooking?.description); // комментарий записи при ее редактировании
	}, [singleBooking?.id]);

	const inputRef = useRef(null);

	// общая сумма за услуги
	const calculateTotalServicesPrice = (selectedServices) => {
		const totalPrice = selectedServices.reduce((sum, item) => {
			const price = parseFloat(item.price);
			return sum + price;
		}, 0);

		setTotalServicesPrice(totalPrice);
	};

	// Форма оплаты в модальном окне
	const { selectedFormPayment, setSelectedFormPayment, handleOptionPayment } =
		useFormPayment();

	// danger alert if customer phone is in the database
	const { dangerAlert, toggleDangerAlert } = useDangerAlert();

	// Поиск клиента
	const { handleSelectedCustomer } = useCustomerSearch();

	// selected staff
	const {
		staffData,
		selectedStaff,
		setSelectedStaff,
		setSelectedStaffValue,
		handleSelectedStaff,
		handleBookingCheck,
	} = useSelectedStaff(startTime);

	// selected department
	const {
		authorizedDepartments,
		selectedDepartment,
		handleSelectedDepartment,
	} = useSelectedDepartment();

	// данные для запроса заявок
	const statusData = {
		departmentId: selectedDepartment,
		selectedStatus: '1',
	};

	const { data } = useServiceRequestsGet(statusData);

	useEffect(() => {
		setServiceRequestCount(data?.length);
	}, [data]);

	// selected sku
	const {
		skuData,
		selectedSku,
		setSelectedSku,
		handleSelectedSku,
		setSelectedSkuValue,
		updateSelectedSku,
	} = useSelectedSku(handleRemoveItem);

	// selected additional sales
	const {
		additionalSalesData,
		selectedAdditionalSales,
		setSelectedAdditionalSales,
		setSelectedAdditionalSalesValue,
		handleSelectedAdditionalSales,
	} = useSelectedAdditionalSales();

	// selected services
	const {
		servicesData,
		selectedServices,
		setSelectedServices,
		handleSelectedServices,
	} = useSelectedServices(calculateTotalServicesPrice);

	// Общая сумма sku
	const { totalSkuAmount, setTotalSkuAmount } = useTotalSkuAmount(
		selectedSku,
		skuSalesIdsList,
		skuSalesList,
		buttonProductClicked,
		setButtonProductClicked,
		singleBooking
	);

	// total additional amount
	const { totalAdditionalAmount, setTotalAdditionalAmount } =
		useTotalAdditionalAmount(
			bookingSalesList,
			bookingSalesIdsList,
			selectedAdditionalSales,
			buttonProductClicked,
			setButtonProductClicked,
			singleBooking
		);

	// get all subscriptions names
	const { subscriptionsNameData, handleSelectedSubscriptionName } =
		useSubscriptionsNames();

	// add subscription
	const {
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
	} = useAddSubscription(isCheckedVisit);

	// Выбор даты
	const [startDate, handleSetDate] = useCalendarStore(
		useShallow((state) => [state.startDate, state.handleSetDate])
	);
	// console.log('startDate', startDate);

	// update payment
	const { paymentIds } = useUpdatePayment(bookingId);

	// update total price selectedServices when editing
	useEffect(() => {
		calculateTotalServicesPrice(selectedServices);
	}, [selectedServices]);

	// Function to handle new object and extract its booking sales ID
	const handleNewObjectBookingSales = (newObjectsArray) => {
		const newIds = newObjectsArray.map((obj) => obj.id);

		// Update the state with the new ID added to the existing list
		setBookingSalesIdsList(newIds);
	};

	// Function to handle new object and extract its sku sales ID
	const handleNewObjectSkuSales = (newObjectsArray) => {
		const newIds = newObjectsArray.map((obj) => obj.id);

		// Update the state with the new ID added to the existing list
		setSkuSalesIdsList(newIds);
	};

	// получить новые id допов и sku
	useEffect(() => {
		if (bookingSalesList && bookingSalesList?.length > 0) {
			handleNewObjectBookingSales(bookingSalesList);
		} else {
			setBookingSalesIdsList([]); // очистить массив id, если нет допов
		}

		if (skuSalesList && skuSalesList?.length > 0) {
			// запись в массив id sku
			handleNewObjectSkuSales(skuSalesList);
		} else {
			setSkuSalesIdsList([]); // очистить массив id, если нет sku
		}
	}, [bookingSalesList, skuSalesList]);

	// Start: Загрузка данных при редактировании записи
	const bookingDataIsEmpty = useMemo(
		() => Object.keys(singleBooking).length === 0,
		[singleBooking]
	);

	// телефон клиента
	const customerPhone = singleBooking?.customer?.phone;
	const selectedPaymentType = singleBooking?.payment_type?.toString() || ''; // выбранный метод оплаты
	// console.log('selectedPaymentType >>>', selectedPaymentType);

	// Загрузка и установка данных при редактировании
	useEffect(() => {
		// Поиск клиента по телефону
		if (customerPhone) {
			searchCustomer(customerPhone);
		}

		if (!bookingDataIsEmpty && !isModalOpen) {
			if (isEditBooking) {
				setSelectedStaffValue(singleBooking);
				setCreatorId(singleBooking?.creator?.id); // загрузка и установка создателя записи

				setSelectedServicesValue(singleBooking?.service);

				// установить метод оплаты записи
				setSelectedFormPayment(selectedPaymentType);

				setSelectedSkuValue(singleBooking?.sku_sales);

				setSelectedAdditionalSalesValue(singleBooking?.booking_sales);

				setSelectedBookingStatus(findStatusInData(singleBooking.status));

				// Установка времени записи
				const bookingDate = singleBooking?.booking_date;
				const startTime = bookingDate ? new Date(bookingDate) : null;
				setStartTime(startTime);
			}

			toggleRef.current();
		}
	}, [singleBooking]);
	// End: Загрузка данных при редактировании записи

	// Добавление записи
	const addBooking = async (newBooking) => {
		const isPaymentValid =
			selectedBookingStatus.label === 'Оплачено' && selectedFormPayment !== '3';
		const isSeparatePayment =
			selectedBookingStatus.label === 'Оплачено' && selectedFormPayment === '3';

		// если выбран абонемент с суммой,
		const isSubscriptionValid =
			selectedBookingStatus.label === 'Оплачено' &&
			Object.keys(selectedSubscription).length === 0 &&
			sumSubscription > 0;

		// Если выбран абонемент клиента и нужно взять доплату
		const isSubscriptionCurrent =
			selectedBookingStatus.label === 'Оплачено' &&
			Object.keys(selectedSubscription).length !== 0;

		try {
			const response = await post('/bookings/', newBooking);
			const id = response.id; // id новой записи

			getBookingsRequests(); // обновление записей на странице

			// добавление оплаты
			if (isPaymentValid) {
				await addBookingPayment(
					id,
					initialValues,
					selectedFormPayment,
					selectedDepartment,
					staffId
				);
			}

			// добавление раздельной оплаты
			if (isSeparatePayment) {
				await addBookingSeparatePayment(
					id,
					sumCash,
					sumCard,
					selectedDepartment,
					staffId
				);
			}

			// добавление абонемента
			if (isSubscriptionValid) {
				handleAddSubscription(id);
			}

			// добавление оплаты за текущий абонемент
			if (isSubscriptionCurrent) {
				addSubPayment(
					selectedSubscription.value,
					id,
					sumSubscription,
					selectedFormSubPayment,
					staffId
				);
			}

			successToast('Запись успешно добавлена.');
		} catch (error) {
			errorToast('Произошла ошибка при добавлении записи.');
		}
	};

	// Обновление записи
	const updateBooking = async ({ id, changedBooking }) => {
		const isPaymentValid =
			selectedBookingStatus.label === 'Оплачено' && selectedFormPayment !== '3';
		const isPaidBooking = singleBooking.status === 'Оплачено';
		// для раздельной оплаты
		const isSeparatePayment =
			selectedBookingStatus.label === 'Оплачено' && selectedFormPayment === '3';
		const isCancel = selectedBookingStatus.label === 'Отмена';

		try {
			await put(`/bookings/${id}/`, changedBooking);

			getBookingsRequests(); // обновление записей на странице

			// добавление оплаты
			if (isPaymentValid && !isPaidBooking) {
				await addBookingPayment(
					id,
					initialValues,
					selectedFormPayment,
					selectedDepartment,
					staffId
				);
			}

			// обновление оплаты
			if (isPaidBooking && isPaymentValid && !isCancel) {
				await updateBookingPayment(
					id,
					selectedBookingStatus,
					initialValues,
					selectedFormPayment,
					selectedDepartment,
					staffId,
					paymentIds
				);
			}

			// обновление раздельной оплаты
			if (isSeparatePayment) {
				await addBookingSeparatePayment(
					id,
					sumCash,
					sumCard,
					selectedDepartment,
					staffId
				);
			}

			// обновление оплаты при отмене
			if (isCancel) {
				await updateBookingPayment(
					id,
					selectedBookingStatus,
					initialValues,
					selectedFormPayment,
					selectedDepartment,
					staffId,
					paymentIds
				);
			}

			successToast('Запись успешно обновлена.');
		} catch (error) {
			errorToast('Произошла ошибка при обновлении записи.');
		}
	};

	// Добавление или редактирование записи
	const handleSubmit = async (values, isEdit) => {
		const id = isEdit ? singleBooking?.id : undefined;
		const customerValue = isEdit
			? selectedCustomer.id
			: { phone: selectedCustomer.value };
		const creatorValue = isEdit ? creatorId : userId; // если редактирование записи, то создатель изначальный, иначе текущий пользователь добавляет запись

		// сумма за услуги и абонементы
		const totalPrice = values.price || 0;

		const service_price = String(totalPrice); // общая цена для записи

		// если выбран абонемент с суммой,
		const isSubscriptionValid =
			selectedBookingStatus.label === 'Оплачено' &&
			Object.keys(selectedSubscription).length === 0 &&
			sumSubscription > 0;

		// Если выбран абонемент клиента и нужно взять доплату
		const isSubscriptionCurrent =
			selectedBookingStatus.label === 'Оплачено' &&
			Object.keys(selectedSubscription).length !== 0;

		// Выбранные услуги и объединение в один массив
		const selectedServicesList =
			selectedServices && selectedServices?.map((obj) => obj.value);

		const changedBooking = {
			service_price: isEdit ? values.price : service_price,
			description: values.description,
			booking_date: startTime,
			status: selectedBookingStatus.label,
			department: selectedDepartment,
			customer: customerValue,
			worker: selectedStaff.value,
			creator: creatorValue,
			service: selectedServicesList,
			payment_type: selectedFormPayment === '3' ? '1' : selectedFormPayment,
			booking_sales: bookingSalesIdsList,
			sku_sales: skuSalesIdsList,
		};

		if (isEdit) {
			await updateBooking({ changedBooking, id }); // обновить запись
		} else {
			await addBooking(changedBooking); // добавить запись
		}

		// добавление абонемента при редактировании
		if (isSubscriptionValid && isEdit) {
			handleAddSubscription(id);
		}

		// добавление оплаты за текущий абонемент
		if (isSubscriptionCurrent) {
			addSubPayment(
				selectedSubscription.value,
				id,
				sumSubscription,
				selectedFormSubPayment,
				staffId
			);
		}

		setIsEditBooking(false);
		await getBookingsRequests();

		validation.resetForm();
	};

	// Одновременное получение новых записей и записей к специалистам
	const getBookingsRequests = () => {
		const getBookingsPromise = new Promise((resolve, reject) => {
			getBookings(filteredData).then(resolve).catch(reject);
		});

		const getBookingsCurrentPromise = new Promise((resolve, reject) => {
			getBookingsCurrent(filteredData).then(resolve).catch(reject);
		});

		return Promise.all([getBookingsPromise, getBookingsCurrentPromise]);
	};

	const validationSchema = Yup.object({
		datePickerValue: Yup.date().required('Выберите дату и время'),
	});

	const initialValues = {
		surname: booking?.surname ?? '',
		description: description ? description : singleBooking?.description,
		secondname: booking?.secondname ?? '',
		servicesPrice: totalServicesPrice + totalSkuAmount + totalAdditionalAmount,
		price:
			totalServicesPrice +
				totalSkuAmount +
				totalAdditionalAmount +
				(totalSubscriptionPrice || 0) +
				Number(sumSubscription) || 0,
		datePickerValue: startTime || null,
	};

	const clearFormBooking = () => {
		setSelectedServices([]);
		setSelectedAdditionalSales([]);
		setSelectedSku([]);
		setSelectedStaff({ value: '', label: '--------' });
		handleSelectedCustomer({ value: '', label: 'Клиент не выбран' }); // очистка найденного клиента в селекте
		setTotalAdditionalAmount(0);
		setTotalSubscriptionPrice(0);
		setTotalSkuAmount(0);
		setSkuSalesIdsList([]);
		setBookingSalesIdsList([]);
		clearSkuSales(); // Очистить список SKU
		clearBookingSales();
		cleanSelectedSubscription(); // очистка выбранного абонемента
		cleanSubscriptionsByPhone(); // очистка списка абонементов по телефону
		cleanSelectedSubcriptionsName();
		clearSingleVisit(); // очистка счетчика посещений по абонементу
		setIsAlertDanger(false);
		initialValues.price = 0;
		validation.resetForm(); // очистка форм
		setDescription('');
		setSumSubscription('');
	};

	// Обновляем состояние валидности формы
	useEffect(() => {
		updateFormValidity();
	}, [
		selectedSku,
		skuSalesIdsList,
		selectedAdditionalSales,
		bookingSalesIdsList,
		selectedServices,
		selectedStaff,
		selectedBookingStatus,
		selectedCustomer,
		selectedSubcriptionsName,
		isPaymentStatusError,
	]);

	// Функция валидности формы
	function updateFormValidity() {
		const isServicesValid = selectedServices.length > 0;
		// console.log('isServicesValid', isServicesValid);
		const isStaffValid = selectedStaff.value !== '';
		// console.log('isStaffValid', isStaffValid);
		const isStatusValid = selectedBookingStatus.value !== '';
		// console.log('isStatusValid', isStatusValid);
		const isSelectedCustomerValid = selectedCustomer.value !== '';
		// console.log('isSelectedCustomerValid', isSelectedCustomerValid);
		const isSkuValid = selectedSku.length === skuSalesIdsList.length;
		// console.log('isSkuValid', isSkuValid);
		const isAdditionalValid =
			selectedAdditionalSales.length === bookingSalesIdsList.length;
		// console.log('isAdditionalValid', isAdditionalValid);
		const isPaymentStatusValid = !isPaymentStatusError; // Если статус оплачено на другой дате, кроме сегодняшней, то статус оплачено не применяется
		// console.log('isPaymentStatusValid', isPaymentStatusValid);

		const isSelectedSubValid =
			selectedSubcriptionsName ||
			(selectedSubcriptionsName &&
				typeof selectedSubcriptionsName === 'object' &&
				Object.keys(selectedSubcriptionsName).length === 0) ||
			selectedSubcriptionsName === null;
		// console.log('isSelectedSubValid', isSelectedSubValid);

		// Обновляем состояние валидности формы
		setIsFormValid(
			isSkuValid &&
				isAdditionalValid &&
				isServicesValid &&
				isStaffValid &&
				isStatusValid &&
				isSelectedCustomerValid &&
				isSelectedSubValid &&
				isPaymentStatusValid
		);
	}

	// validation
	const validation = useFormik({
		enableReinitialize: true,
		initialValues,
		validationSchema,
		onSubmit: (values) => {
			if (bookingsExists.booking) {
				setIsAlertDanger(true);
				return;
			}

			if (isEditBooking) {
				handleSubmit(values, true);
			} else {
				handleSubmit(values, false);
			}

			toggle();
		},
	});

	// Choosing the time of an appointment with a specialist
	const onChangeTime = (date) => {
		if (selectedBookingStatus.value === '5' && !isToday(date)) {
			setIsPaymentStatusError(true);
		} else {
			setIsPaymentStatusError(false);
		}

		setStartTime(date);
		setIsAlertDanger(false);
		validation.setFieldValue('datePickerValue', date);

		// проверка на доступность записи
		handleBookingCheck(date, selectedStaff.value);
	};

	const toggle = useCallback(() => {
		if (modal) {
			setModal(false);
			setBooking(null);

			setTimeout(() => {
				clearFormBooking();
			}, 2000);
		} else {
			setModal(true);
		}
	}, [modal]);

	// Открыть окно записи
	const handleBookingAdd = () => {
		setIsEditBooking(false);
		cleanNewSubscriptionId(); // очистка id абонемента
		setIsPaymentSubAdded(false);
		clearSingleBooking(); // очистка записи
		toggle();
	};

	const handleModalOpened = () => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	// set selectedServices
	const setSelectedServicesValue = (data) => {
		const editServices = data?.map(({ id, name, service_price }) => ({
			value: id,
			label: `ID: ${id} | ${name}`,
			price: service_price,
		}));

		setSelectedServices(editServices);
	};

	// поиск статуса в данных и установка в селекте
	const findStatusInData = (status) => {
		const foundStatus = bookingStatusData.find((item) => item.label === status);

		if (foundStatus) {
			return {
				value: foundStatus.value,
				label: foundStatus.label,
			};
		}

		return null;
	};

	const toggleRef = useRef(toggle);

	// Выбор статуса записи и запрет оплаты, если дата не сегодня
	const handleSelectedStatus = (value) => {
		if (value.value === '5' && !isToday(validation.values.datePickerValue)) {
			setIsPaymentStatusError(true);
		} else {
			setIsPaymentStatusError(false);
		}
		setSelectedBookingStatus(value);
	};

	// Сумма к оплате наличными
	const handleSumCash = (event) => {
		setSumCash(event.target.value);
	};

	// Сумма к оплате безнал
	const handleSumCard = (event) => {
		setSumCard(event.target.value);
	};

	// Define the function to update the SelectedAdditionalSales array
	const updateSelectedAdditionalSales = (id, newTotalAmount) => {
		setSelectedAdditionalSales((prevSelectedAdditionalSales) =>
			prevSelectedAdditionalSales?.map((item) =>
				item.id === id ? { ...item, totalAmount: newTotalAmount } : item
			)
		);
	};

	// delete id from selectedSku and selectedAdditionalSales array
	function handleRemoveItem(idToRemove, isSku) {
		if (isSku) {
			setSkuSalesIdsList((prevSkuSales) =>
				prevSkuSales.filter((item) => item !== idToRemove)
			);
			setSelectedSku((prevSelectedSku) =>
				prevSelectedSku.filter((item) => item.id !== idToRemove)
			);
		} else {
			setBookingSalesIdsList((prevBookingSales) =>
				prevBookingSales.filter((item) => item !== idToRemove)
			);
			setSelectedAdditionalSales((prevSelectedAdditionalSales) =>
				prevSelectedAdditionalSales.filter((item) => item.id !== idToRemove)
			);
		}
	}

	return (
		<>
			<div className='navbar-header'>
				{(isSanatera || isCallCenter || isSuperAdmin) && (
					<div className='archi__header_datePicker'>
						<CustomDatePicker
							selected={startDate}
							setDate={handleSetDate}
							showTimeSelect={false}
							showOnlyDate={true}
						/>
					</div>
				)}

				{isOutstaff && <RangeDatePicker />}

				{/* Выбор департамента */}
				<div className='header__archi_select'>
					<CommonSelect
						defaultValue='1'
						options={authorizedDepartments}
						value={selectedDepartment}
						onChange={handleSelectedDepartment}
					/>
				</div>

				{/* Кнопка поиска клиента */}
				{(isSanatera || isCallCenter) && (
					<Link to='/customers-list'>
						<BlueBtn>Найти клиента</BlueBtn>
					</Link>
				)}

				{/* Кнопка добавления записи к специалисту */}
				{(isSanatera || isCallCenter) && (
					<div>
						<PrimaryBtn onClick={handleBookingAdd}>Добавить запись</PrimaryBtn>
					</div>
				)}

				{(isSanatera || isCallCenter) && (
					<div>
						<GreenBtn onClick={toggleCustomerModal}>Добавить клиента</GreenBtn>
					</div>
				)}

				<div className='d-flex'>
					<ProfileMenu />
				</div>
			</div>

			<HeaderModal
				modal={modal}
				isEdit={isEditBooking}
				toggle={toggle}
				handleModalOpened={handleModalOpened}
				validation={validation}
				isFormValid={isFormValid}
				selectedServices={selectedServices}
				handleSelectedServices={handleSelectedServices}
				staffData={staffData}
				servicesData={servicesData}
				bookingStatusData={bookingStatusData}
				selectedBookingStatus={selectedBookingStatus}
				selectedSku={selectedSku}
				updateSelectedSku={updateSelectedSku}
				handleSelectedSku={handleSelectedSku}
				handleSelectedStatus={handleSelectedStatus}
				selectedStaff={selectedStaff}
				handleSelectedStaff={handleSelectedStaff}
				inputRef={inputRef}
				updateSelectedAdditionalSales={updateSelectedAdditionalSales}
				selectedAdditionalSales={selectedAdditionalSales}
				selectedFormSubPayment={selectedFormSubPayment}
				sumCash={sumCash}
				sumCard={sumCard}
				skuData={skuData}
				handleRemoveItem={handleRemoveItem}
				setButtonProductClicked={setButtonProductClicked}
				additionalSalesData={additionalSalesData}
				handleSelectedAdditionalSales={handleSelectedAdditionalSales}
				selectedCustomer={selectedCustomer}
				formPaymentData={formPaymentData}
				formPaymentSubData={formPaymentSubData}
				handleSelectedFormSubPayment={handleSelectedFormSubPayment}
				handleSumCash={handleSumCash}
				handleSumCard={handleSumCard}
				onChangeTime={onChangeTime}
				isAlertDanger={isAlertDanger}
				subscriptionsNameData={subscriptionsNameData}
				handleSelectedSubscriptionName={handleSelectedSubscriptionName}
				selectedSubcriptionsName={selectedSubcriptionsName}
				setDescription={setDescription}
				handleSumSubscriptions={handleSumSubscriptions}
				sumSubscription={sumSubscription}
				handleSumSubCash={handleSumSubCash}
				sumSubCash={sumSubCash}
				handleSumSubCard={handleSumSubCard}
				sumSubCard={sumSubCard}
				isCheckedVisit={isCheckedVisit}
				setIsCheckedVisit={setIsCheckedVisit}
				selectedFormPayment={selectedFormPayment}
				handleOptionPayment={handleOptionPayment}
				isPaymentStatusError={isPaymentStatusError} // показывать ошибку при статусе Оплачено, если не сегодня
			/>

			{/* Модальное окно клиента */}
			<CustomerModal isOpen={customerModal} toggle={toggleCustomerModal} />

			<DangerAlert
				isOpen={dangerAlert}
				toggle={toggleDangerAlert}
				text='Номер телефона уже существует в базе'
			/>

			<Toaster position='top-right' reverseOrder={true} />
		</>
	);
};

export default HeaderContent;
