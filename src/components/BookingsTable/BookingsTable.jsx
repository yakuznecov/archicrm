import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Tooltip, Table, Input } from 'antd';
import { addToTelegram } from '@/services';
import { formatDate, getTimeFromDate } from '@/helpers/Date/formatDate';
import { DataFilter } from '@/containers';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useDepartmentsStore,
	useBookingsStore,
	useSubscriptionsStore,
	usePaymentSubscriptionsStore,
	useCustomersStore,
} from '@/storeZustand';

import {
	StatusCell,
	CustomerCell,
	WorkerCell,
	PaymentTypeCell,
} from '@/helpers';

import PhoneNumber from '@/components/Common/PhoneNumber';
import Loader from '@/components/Common/Loader';
import CustomerProfileModal from '@/components/Common/CustomerProfileModal';
import EditIcon from '@/components/Common/Icons/EditIcon';
import TelegramIcon from '@/components/Common/Icons/TelegramIcon';
import AddTelegramIcon from '@/components/Common/Icons/AddTelegramIcon';

const BookingsTable = () => {
	const { Search } = Input;
	const [searchText, setSearchText] = useState('');
	const [hiddenIcons, setHiddenIcons] = useState({});

	const [bookings, loading, getBookings, setIsEditBooking, getBookingById] =
		useBookingsStore(
			useShallow((state) => [
				state.bookings,
				state.loading,
				state.getBookings,
				state.setIsEditBooking,
				state.getBookingById,
			])
		);
	// console.log('singleBooking >>>', singleBooking);

	const { filteredData } = DataFilter();

	// Абонементы
	const [getSubscriptionsByPhone, cleanNewSubscriptionId] =
		useSubscriptionsStore(
			useShallow((state) => [
				state.getSubscriptionsByPhone,
				state.cleanNewSubscriptionId,
			])
		);

	// Клиенты компании
	const [fetchCustomerBookings, customerBookings] = useCustomersStore(
		useShallow((state) => [state.fetchCustomerBookings, state.customerBookings])
	);

	// Оплаты всех абонементов
	const [
		paymentSubscriptions,
		getPaymentSubscriptions,
		setIsPaymentSubAdded,
		clearNewSubPaymentId,
	] = usePaymentSubscriptionsStore(
		useShallow((state) => [
			state.paymentSubscriptions,
			state.getPaymentSubscriptions,
			state.setIsPaymentSubAdded,
			state.clearNewSubPaymentId,
		])
	);
	// console.log('paymentSubscriptions >>>', paymentSubscriptions);

	// Выбранный департамент
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	// Выбранный клиент из таблицы
	const [customer, setCustomer] = useState({});

	// Modal profile customer
	const [modalProfile, setModalProfile] = useState(false);

	// get all bookings
	useEffect(() => {
		if (filteredData && selectedDepartment) {
			getBookings(filteredData);
		}
	}, [selectedDepartment, filteredData.start_date]);

	// получить оплаты за абонементы
	useEffect(() => {
		if (filteredData && selectedDepartment) {
			getPaymentSubscriptions(filteredData);
		}
	}, [selectedDepartment, filteredData.start_date]);

	// Создаем новый массив, где добавляем объект оплаты за абонемент в запись клиента
	const bookingsData = useMemo(() => {
		return bookings?.map((bookingObj) => {
			const matchingItem = paymentSubscriptions?.find(
				(paymentObj) =>
					paymentObj?.booking?.customer.id === bookingObj?.customer?.id
			);

			if (matchingItem) {
				// Вставляем объект из первого массива в объект из второго массива
				return {
					...bookingObj,
					subscription: matchingItem.subscription, // объект абонемента
					amount: matchingItem.amount, // сумма, оплаченная за абонемент
				};
			}

			return bookingObj;
		});
	}, [paymentSubscriptions, bookings]);

	// console.log('bookingsData >>>', bookingsData);

	// open, close modal profile
	const toggleModalProfile = useCallback(() => {
		setModalProfile((prevState) => !prevState);
	}, []);

	// Данные в карточке клиента и запрос данных
	const handleProfileClick = (id, phone) => {
		// Запрос абонементов клиента по номеру телефона
		getSubscriptionsByPhone(phone);

		// запрос данных о заказах клиента
		fetchCustomerBookings(id);

		// const convertedDate = dob ? formatDate(dob) : null;
		toggleModalProfile();
	};

	// Получение конкретной записи
	const handleSingleBookingClick = useCallback((bookingId, isEditTrue) => {
		getBookingById(bookingId); // запрос одной записи
		setIsEditBooking(isEditTrue); // редактируется ли бронь
		cleanNewSubscriptionId(); // очистка id абонемента
		setIsPaymentSubAdded(false);
		clearNewSubPaymentId(); // очистка id оплаты абонемента
	}, []);

	// добавление юзера в телеграм
	const handleTelegramClick = async (booking_id) => {
		await addToTelegram(booking_id);
		setHiddenIcons((prev) => ({ ...prev, [booking_id]: true }));
	};

	// Функция для определения стиля фона
	const getCellBgStyle = (value) => {
		const isSkuEmpty = value?.sku_sales?.length === 0;
		const isBookingSalesEmpty = value?.booking_sales?.length === 0;
		const isPaid = value.status === 'Оплачено';
		const bgClass = isSkuEmpty && isBookingSalesEmpty && isPaid ? 'cellBg' : '';
		return <div className={bgClass}></div>;
	};

	const columns = useMemo(
		() => [
			// {
			// 	title: 'ID',
			// 	dataIndex: 'id',
			// 	render: (text, record) => (
			// 		<>
			// 			<span>{text}</span>
			// 			{getCellBgStyle(record)}
			// 		</>
			// 	),
			// },
			{
				title: 'Клиент',
				dataIndex: 'customer',
				key: 'customer_cell',
				render: (text, record) => {
					const { id, phone } = text;

					return (
						<>
							<span
								className='customer_cell'
								onClick={() => {
									handleProfileClick(id, phone);
									setCustomer(text); // запись данных клиента для отображения в модальном окне
								}}
								id={`usertooltip-${id}`}
							>
								<Tooltip title='Карточка клиента'>
									<span>
										<CustomerCell value={text} />
									</span>
								</Tooltip>
							</span>
							{getCellBgStyle(record)}
						</>
					);
				},
			},
			{
				title: 'Телефон',
				dataIndex: 'customer',
				key: 'customer_phone',
				render: (customer, record) => (
					<>
						<span>
							<PhoneNumber phone={customer.phone} />
						</span>
						{getCellBgStyle(record)}
					</>
				),
			},
			{
				title: 'Специалист',
				dataIndex: 'worker',
				key: 'worker_cell',
				render: (worker, record) => (
					<>
						<span>
							<WorkerCell value={worker} />
						</span>
						{getCellBgStyle(record)}
					</>
				),
			},
			{
				title: 'Услуга',
				dataIndex: 'service',
				key: 'service_cell',
				render: (_, record) => {
					const serviceNames = record?.service
						?.map((service) => service.name)
						.join(', ');

					return (
						<>
							<span>{serviceNames}</span>
							{getCellBgStyle(record)}
						</>
					);
				},
			},
			{
				title: 'SKU',
				dataIndex: 'sku_sales',
				key: 'sku_cell',
				render: (text, record) => {
					const skuNames = record?.sku_sales
						?.map((sku) => sku.sku.sku_name.name)
						.join(', ');
					return (
						<>
							<span>{skuNames}</span>
							{getCellBgStyle(record)}
						</>
					);
				},
			},
			{
				title: 'Допы',
				dataIndex: 'booking_sales',
				key: 'booking_cell',
				render: (_, record) => {
					const bookingNames = record?.booking_sales
						?.map((item) => item.additional_sales.name)
						.join(', ');

					return (
						<>
							<span>{bookingNames}</span>
							{getCellBgStyle(record)}
						</>
					);
				},
			},
			{
				title: 'Абон.',
				dataIndex: 'subscription',
				key: 'subscription_cell',
				render: (text, record) => (
					<>
						<div>{text?.type?.name}</div>
						<div>{record.amount}</div>
						{getCellBgStyle(record)}
					</>
				),
			},
			{
				title: 'Время',
				dataIndex: 'booking_date',
				key: 'booking_date_cell',
				defaultSortOrder: 'descend', // сортировка по возрастанию
				sorter: (a, b) => new Date(b.booking_date) - new Date(a.booking_date),
				render: (text, record) => (
					<>
						<span>{getTimeFromDate(text)}</span>
						{getCellBgStyle(record)}
					</>
				),
			},
			{
				title: 'Дата',
				dataIndex: 'date_created',
				key: 'date_created_cell',
				render: (text, record) => (
					<>
						<span>{formatDate(text)}</span>
						{getCellBgStyle(record)}
					</>
				),
			},
			{
				title: 'Стоим.',
				dataIndex: 'service_price',
				key: 'service_price_cell',
				render: (text, record) => {
					return (
						<>
							{text}
							{getCellBgStyle(record)}
						</>
					);
				},
			},
			{
				title: 'Тип',
				dataIndex: 'payment_type',
				key: 'payment_type_cell',
				render: (text, record) => (
					<>
						<PaymentTypeCell value={text} />
						{getCellBgStyle(record)}
					</>
				),
			},
			{
				title: 'Статус',
				dataIndex: 'status',
				key: 'status_cell',
				sorter: (a, b) => b.status.length - a.status.length,
				render: (text, record) => (
					<>
						<StatusCell value={text} />
						{getCellBgStyle(record)}
					</>
				),
			},
			{
				title: 'Создатель',
				dataIndex: 'creator',
				key: 'creator_cell',
				sorter: (a, b) => {
					if (a.creator.username < b.creator.username) {
						return -1;
					}
					if (a.creator.username > b.creator.username) {
						return 1;
					}
					return 0;
				},
				render: (text, record) => (
					<>
						{text?.username}
						{getCellBgStyle(record)}
					</>
				),
			},
			{
				title: 'Примечание',
				dataIndex: 'description',
				key: 'description',
				render: (text, record) => (
					<>
						{text}
						{getCellBgStyle(record)}
					</>
				),
			},
			{
				title: 'Действие',
				key: 'actions',
				render: (text) => {
					const { id, customer } = text;
					const isChatId = customer?.chat_id;

					return (
						<div className='d-flex gap-3 users justify-content-center'>
							<ul className='d-flex align-items-center justify-content-around list-inline contact-links mb-0 w-100'>
								{isChatId ? (
									<li className='list-inline-item cursor-pointer'>
										<TelegramIcon id={`telegramicon-${id}`} />
									</li>
								) : (
									<li className='list-inline-item cursor-pointer'>
										{!hiddenIcons[id] && (
											<span onClick={() => handleTelegramClick(id)}>
												<Tooltip title='Добавить в телеграм'>
													<span>
														<AddTelegramIcon id={id} />
													</span>
												</Tooltip>
											</span>
										)}
									</li>
								)}

								{/* add booking */}
								<li className='list-inline-item cursor-pointer'>
									<span
										onClick={() => {
											handleSingleBookingClick(id);
										}}
									>
										<Tooltip title='Добавить запись'>
											<span>
												<i
													className='uil uil-focus-add font-size-20'
													id={`addtooltip-${id}`}
												/>
											</span>
										</Tooltip>
									</span>
								</li>
								{/* edit booking */}
								<li className='list-inline-item cursor-pointer'>
									<span
										onClick={() => {
											handleSingleBookingClick(id, true);
										}}
									>
										<Tooltip title='Редактировать'>
											<span>
												<EditIcon id={`edittooltip-${id}`} />
											</span>
										</Tooltip>
									</span>
								</li>
							</ul>
						</div>
					);
				},
			},
		],
		[handleProfileClick, handleSingleBookingClick]
	);

	const onSearch = (value, _e, info) => setSearchText(value);

	function filterData(data, searchText) {
		const searchTextLowerCase = searchText.toLowerCase();

		function filterObject(obj) {
			return Object.values(obj).some((value) =>
				typeof value === 'object' && value !== null
					? filterObject(value)
					: String(value).toLowerCase().includes(searchTextLowerCase)
			);
		}

		return data?.filter((item) => filterObject(item));
	}

	const filteredSearchData = filterData(bookingsData, searchText);

	return (
		<>
			<div className='mb-2'>
				<Search
					placeholder='Поиск в таблице'
					allowClear
					onSearch={onSearch}
					style={{
						width: 200,
					}}
					enterButton
				/>
			</div>
			{loading && <Loader />}
			{!loading && filteredSearchData && filteredSearchData?.length > 0 && (
				<>
					<Table
						columns={columns}
						dataSource={filteredSearchData}
						pagination={false}
						size='small'
						rowKey='id'
					/>
				</>
			)}

			<CustomerProfileModal
				isOpen={modalProfile}
				toggleModal={toggleModalProfile}
				customerBookings={customerBookings}
				customerData={customer}
			/>
		</>
	);
};

export default BookingsTable;
