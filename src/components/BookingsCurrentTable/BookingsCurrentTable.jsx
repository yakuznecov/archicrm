import React, { useEffect, useMemo, useCallback } from 'react';
import Loader from '@/components/Common/Loader';
import Accordion from '@/components/Common/Accordion';
import { Tooltip, Table } from 'antd';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useDepartmentsStore,
	useBookingsStore,
	useSubscriptionsStore,
	usePaymentSubscriptionsStore,
} from '@/storeZustand';

import { DataFilter } from '@/containers';
import { StatusCell } from '@/helpers';
import PhoneNumber from '@/components/Common/PhoneNumber';
import EditIcon from '@/components/Common/Icons/EditIcon';
import { getTimeFromDate } from '@/helpers/Date/formatDate';

const BookingsCurrentTable = () => {
	const [
		setIsEditBooking,
		getBookingById,
		getBookingsCurrent,
		bookingsCurrent,
		loading,
	] = useBookingsStore(
		useShallow((state) => [
			state.setIsEditBooking,
			state.getBookingById,
			state.getBookingsCurrent,
			state.bookingsCurrent,
			state.loading,
		])
	);

	// Абонементы, очистка id абонемента
	const [cleanNewSubscriptionId] = useSubscriptionsStore(
		useShallow((state) => [state.cleanNewSubscriptionId])
	);

	// Выбранный департамент
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	// Оплаты всех абонементов
	const [setIsPaymentSubAdded, clearNewSubPaymentId] =
		usePaymentSubscriptionsStore(
			useShallow((state) => [
				state.setIsPaymentSubAdded,
				state.clearNewSubPaymentId,
			])
		);

	const { filteredData } = DataFilter();

	// copy bookingsCurrent array
	const newBookingsCurrent = bookingsCurrent?.map(({ worker, bookings }) => {
		return {
			bookings: bookings?.map((booking) => {
				return {
					...booking,
					worker,
				};
			}),
		};
	});

	// console.log('newBookingsCurrent >>>', newBookingsCurrent);

	// Запрос списка записей
	useEffect(() => {
		if (filteredData && selectedDepartment) {
			getBookingsCurrent(filteredData);
		}
	}, [selectedDepartment, filteredData.start_date]);

	// get single booking from base
	const handleSingleBookingClick = useCallback((bookingId, isEditTrue) => {
		getBookingById(bookingId);
		setIsEditBooking(isEditTrue); // редактируется ли бронь
		cleanNewSubscriptionId(); // очистка id абонемента
		setIsPaymentSubAdded(false); // Добавлена ли оплата абонемента
		clearNewSubPaymentId(); // очистка id оплаты абонемента
	}, []);

	const columns = useMemo(
		() => [
			// {
			// 	title: 'ID записи',
			// 	dataIndex: 'id',
			// 	key: 'id',
			// },
			{
				title: 'Фамилия',
				dataIndex: 'customer',
				key: 'surname',
				className: 'fw-bold',
				render: (text) => text?.surname,
			},
			{
				title: 'Имя',
				dataIndex: 'customer',
				key: 'name',
				className: 'fw-bold',
				render: (text) => text?.name,
			},
			{
				title: 'Отчество',
				dataIndex: 'customer',
				key: 'second_name',
				className: 'fw-bold',
				render: (text) => text?.second_name,
			},
			{
				title: 'Телефон',
				dataIndex: 'customer',
				key: 'phone',
				render: (text) => <PhoneNumber phone={text?.phone} />,
			},
			{
				title: 'Услуга',
				dataIndex: 'service',
				key: 'service_name',
				render: (text) => text[0]?.name,
			},
			{
				title: 'Время',
				dataIndex: 'booking_date',
				key: 'booking_date',
				defaultSortOrder: 'descend', // сортировка по возрастанию
				sorter: (a, b) => new Date(b.booking_date) - new Date(a.booking_date),
				render: (text) => getTimeFromDate(text),
			},
			{
				title: 'Создатель',
				dataIndex: 'creator',
				key: 'creator',
				render: (text) => text?.username,
			},
			{
				title: 'Примечание',
				dataIndex: 'description',
				key: 'description',
				width: 200,
			},
			{
				title: 'Статус',
				dataIndex: 'status',
				key: 'status',
				render: (text) => <StatusCell value={text} />,
			},
			{
				title: 'Действие',
				key: 'actions',
				render: (text) => {
					const { id } = text;

					return (
						<div className='d-flex gap-3 users justify-content-center'>
							<ul className='d-flex align-items-center justify-content-around list-inline contact-links mb-0 w-100'>
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
													className='uil uil-focus-add font-size-18'
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
		[]
	);

	if (loading) return <Loader />;

	return (
		<>
			{newBookingsCurrent &&
				newBookingsCurrent.length > 0 &&
				newBookingsCurrent?.map((booking, index) => {
					const { surname, name } = booking.bookings[0].worker;
					const bookingCount = booking?.bookings?.length;
					return (
						<Accordion
							key={index}
							title={`${surname} ${name}`}
							count={bookingCount}
						>
							<Table
								columns={columns}
								dataSource={booking.bookings}
								pagination={false}
								size='small'
								rowKey='id'
							/>
						</Accordion>
					);
				})}
		</>
	);
};

export default BookingsCurrentTable;
