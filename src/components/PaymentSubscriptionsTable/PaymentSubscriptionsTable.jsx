import React, { useEffect, useMemo, useState, useCallback } from 'react';
import TableContainer from '@/components/Common/TableContainer';
import { Tooltip } from 'antd';
import * as Yup from 'yup';
import { useFormik } from 'formik';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useDepartmentsStore,
	useUserStore,
	usePaymentSubscriptionsStore,
} from '@/storeZustand';

import { updatePaymentSubscription } from '@/services';

import {
	Col,
	Row,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	Input,
	FormFeedback,
	Label,
} from 'reactstrap';

import {
	Id,
	Department,
	DateCell,
	Service,
	Amount,
	Description,
} from '@/helpers/Table/check_value';

import {
	CustomerCell,
	WorkerCell,
	PaymentTypeCell,
	StatusCell,
} from '@/helpers';
import { DataFilter } from '@/containers';
import { formatDateToIso } from '@/helpers/Date/formatDate';
import EditIcon from '@/components/Common/Icons/EditIcon';

import Loader from '@/components/Common/Loader';

const PaymentSubscriptionsTable = () => {
	// Загрузка данных текущего пользователя
	const [staffId, isSuperUser] = useUserStore(
		useShallow((state) => [state.staffId, state.isSuperUser])
	);

	// Оплаты всех абонементов
	const [
		paymentSubscriptions,
		getSinglePaymentSubscription,
		getPaymentSubscriptions,
		setIsEditSubPayment,
		singleSubPayment,
		loading,
	] = usePaymentSubscriptionsStore(
		useShallow((state) => [
			state.paymentSubscriptions,
			state.getSinglePaymentSubscription,
			state.getPaymentSubscriptions,
			state.setIsEditSubPayment,
			state.singleSubPayment,
			state.loading,
		])
	);

	const { filteredData } = DataFilter();
	const currentDate = formatDateToIso(new Date());

	// Выбранный департамент
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	const [modal, setModal] = useState(false);
	const [selectedType, setSelectedType] = useState('1');
	const [amount, setAmount] = useState(0);
	const [subPaymentId, setSubPaymentId] = useState(0);
	const [bookingId, setBookingId] = useState(0);
	const [subscriptionNameId, setSubscriptionNameId] = useState(0);
	// console.log('subPaymentId >>>', subPaymentId);
	// console.log('subscriptionNameId >>>', subscriptionNameId);

	// get payments subscriptions
	useEffect(() => {
		if (filteredData) {
			getPaymentSubscriptions(filteredData);
		}
	}, [selectedDepartment, filteredData.start_date]);

	// Loading data when editing a payment subscription
	useEffect(() => {
		const paymentSubDataIsEmpty = Object.keys(singleSubPayment).length === 0;

		if (!paymentSubDataIsEmpty) {
			setAmount(singleSubPayment?.amount);
			setSubPaymentId(singleSubPayment?.id);
			setSelectedType((singleSubPayment?.type).toString());
			setBookingId(singleSubPayment?.booking?.id);
			setSubscriptionNameId(singleSubPayment?.subscription?.id);
		}
	}, [singleSubPayment]);

	const handleOptionChange = (event) => {
		setSelectedType(event.target.value);
	};

	const initialValues = {
		description: '',
		amount: amount,
		subPaymentId: subPaymentId,
		subscriptionNameId: subscriptionNameId,
		bookingId,
	};

	const validationSchema = Yup.object({
		description: Yup.string().required('Пожалуйста, напишите комментарий'),
	});

	const handleEditSubmit = async (values) => {
		const changedPaymentSub = {
			amount: values.amount,
			type: Number(selectedType),
			description: values.description,
			date_updated: currentDate,
			subscription: subscriptionNameId,
			staff: staffId,
			booking: bookingId,
		};

		try {
			await updatePaymentSubscription({ id: subPaymentId, changedPaymentSub });
			getPaymentSubscriptions(filteredData); // обновляем список оплат абонементов
		} catch (error) {
			console.log(error);
		}

		validation.resetForm();
	};

	// validation
	const validation = useFormik({
		enableReinitialize: true,
		initialValues,
		validationSchema,
		onSubmit: (values) => {
			handleEditSubmit(values);

			toggle();
		},
	});

	// open, close modal edit
	const toggle = useCallback(() => {
		setModal((prevState) => !prevState);
	}, []);

	// get single payment subscription
	const handleSingleSubPaymentClick = useCallback((paymentId, isEditTrue) => {
		getSinglePaymentSubscription(paymentId);
		setIsEditSubPayment(isEditTrue);

		toggle();
	}, []);

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
				filterable: true,
				width: 20,
				Cell: (cellProps) => {
					return <Id {...cellProps} />;
				},
			},
			{
				Header: 'ID Записи',
				accessor: 'booking.id',
				filterable: true,
				width: 20,
				Cell: (cellProps) => {
					return <Id {...cellProps} />;
				},
			},
			{
				Header: 'Департамент',
				accessor: 'subscription.department.name',
				filterable: true,
				width: 150,
				Cell: (cellProps) => {
					return <Department {...cellProps} />;
				},
			},
			{
				Header: 'Сотрудник',
				accessor: 'staff',
				filterable: true,
				width: 200,
				Cell: (cellProps) => {
					return <WorkerCell {...cellProps} />;
				},
			},
			{
				Header: 'Тип',
				accessor: 'type',
				filterable: true,
				width: 50,
				Cell: (cellProps) => {
					return <PaymentTypeCell {...cellProps} />;
				},
			},
			{
				Header: 'Сумма',
				accessor: 'amount',
				filterable: true,
				width: 40,
				Cell: (cellProps) => {
					return <Amount {...cellProps} />;
				},
			},
			{
				Header: 'Клиент',
				accessor: 'booking.customer',
				filterable: true,
				width: 200,
				Cell: (cellProps) => {
					return <CustomerCell {...cellProps} />;
				},
			},
			{
				Header: 'Услуга',
				accessor: 'booking.service[0].name',
				filterable: true,
				width: 200,
				Cell: (cellProps) => {
					return <Service {...cellProps} />;
				},
			},
			{
				Header: 'Описание',
				accessor: 'description',
				filterable: true,
				width: 200,
				Cell: (cellProps) => {
					return <Description {...cellProps} />;
				},
			},
			{
				Header: 'Дата',
				accessor: 'date_created',
				filterable: true,
				width: 50,
				Cell: (cellProps) => {
					return <DateCell {...cellProps} />;
				},
			},
			{
				Header: 'Статус',
				accessor: 'booking.status',
				filterable: true,
				width: 50,
				Cell: (cellProps) => {
					return <StatusCell {...cellProps} />;
				},
			},
			{
				Header: 'Действие',
				accessor: 'action',
				disableFilters: true,
				textAlign: 'center',
				width: 50,
				Cell: (cellProps) => {
					const { id } = cellProps.row.original;
					return (
						<div className='d-flex gap-3 users justify-content-center'>
							{isSuperUser && (
								<ul className='d-flex justify-content-around list-inline font-size-20 contact-links mb-0 w-100'>
									<li
										className='list-inline-item cursor-pointer text-primary'
										onClick={() => {
											handleSingleSubPaymentClick(id, true);
										}}
									>
										<Tooltip title='Редактировать'>
											<span>
												<EditIcon id={`edittooltip-${id}`} />
											</span>
										</Tooltip>
									</li>
								</ul>
							)}
						</div>
					);
				},
			},
		],
		[handleSingleSubPaymentClick]
	);

	return (
		<>
			{loading && <Loader />}
			{!loading && paymentSubscriptions && paymentSubscriptions?.length > 0 && (
				<TableContainer
					columns={columns}
					data={paymentSubscriptions}
					isGlobalFilter={true}
					isAddUsers={true}
					isAddTableWithoutBorderStrap={true}
				/>
			)}

			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle} tag='h4'>
					Изменить данные оплаты
				</ModalHeader>
				<ModalBody>
					<Form
						onSubmit={(e) => {
							e.preventDefault();
							validation.handleSubmit();
							return false;
						}}
					>
						<Row>
							<Col className='col-12'>
								<div className='mb-3 paymentId'>
									ID Записи: <span>{validation.values.bookingId ?? ''}</span>
								</div>
								<div className='mb-5 d-flex align-items-center gap-4'>
									<Label className='d-flex align-items-center' check>
										<Input
											className='archi__radio _coming'
											type='radio'
											name='radioOption'
											value='1'
											checked={selectedType === '1'}
											onChange={handleOptionChange}
										/>
										Наличные
									</Label>
									<Label className='d-flex align-items-center' check>
										<Input
											className='archi__radio'
											type='radio'
											name='radioOption'
											value='2'
											checked={selectedType === '2'}
											onChange={handleOptionChange}
										/>
										Безнал
									</Label>
								</div>

								<div className='mb-3'>
									<Label className='form-label'>Сумма</Label>
									<Input
										name='amount'
										type='text'
										validate={{
											required: { value: true },
										}}
										onChange={validation.handleChange}
										onBlur={validation.handleBlur}
										value={validation.values.amount || ''}
										invalid={
											validation.touched.amount && validation.errors.amount
												? true
												: false
										}
									/>
									{validation.touched.amount && validation.errors.amount ? (
										<FormFeedback type='invalid'>
											{validation.errors.amount}
										</FormFeedback>
									) : null}
								</div>

								<div className='mb-3'>
									<Label className='form-label archi-label'>Комментарий</Label>
									<textarea
										name='description'
										className='input-large form-control'
										id='message'
										rows='7'
										placeholder='Напишите причину изменения метода оплаты'
										value={validation.values.description ?? ''}
										onChange={validation.handleChange}
									/>
								</div>
							</Col>
						</Row>
						<Row>
							<Col>
								<div className='text-end'>
									<button type='submit' className='archi__btn archi__btn-green'>
										Сохранить
									</button>
								</div>
							</Col>
						</Row>
					</Form>
				</ModalBody>
			</Modal>
		</>
	);
};

export default PaymentSubscriptionsTable;
