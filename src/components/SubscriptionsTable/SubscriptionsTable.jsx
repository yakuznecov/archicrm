import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from 'antd';
import { useFormik } from 'formik';
import { DataFilter } from '@/containers';
import { formatDate } from '@/helpers/Date/formatDate';
import ArchiSelect from '@/components/Common/ArchiSelect';
import TableContainer from '@/components/Common/TableContainer';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useDepartmentsStore,
	useUserStore,
	useSubscriptionsStore,
	useCustomersStore,
} from '@/storeZustand';

import {
	Id,
	Surname,
	Name,
	SecondName,
	Department,
	MonthCell,
	Service,
	Notice,
	DateBooking,
	Amount,
	Cost,
} from '@/helpers/Table/check_value';

import { StatusCell } from '@/helpers';
import { useToggle, useSubscriptionsNames } from '@/hooks';

import {
	Col,
	Row,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	Label,
} from 'reactstrap';

import Loader from '@/components/Common/Loader';
import CustomerProfileModal from '@/components/Common/CustomerProfileModal';
import { subscriptionsStatusData } from '@/common/data/subscriptionsStatusData';
import DescriptionArea from '@/components/Common/DescriptionArea';

const SubscriptionsTable = ({ modal, toggle, isEdit, onIsEditChange }) => {
	// Загрузка данных текущего пользователя
	const [isSuperAdmin] = useUserStore(
		useShallow((state) => [state.isSuperAdmin])
	);

	// Абонементы
	const [
		subscriptionsList, // список абонементов
		getSubscriptions, // получить список абонементов
		getSubscriptionsByPhone, // получить список абонементов по номеру телефона
		updateSubscription, // обновить абонемент
		getSingleSubscription, // получить абонемент
		singleSubscription, // один абонемент
		loading,
	] = useSubscriptionsStore(
		useShallow((state) => [
			state.subscriptionsList,
			state.getSubscriptions,
			state.getSubscriptionsByPhone,
			state.updateSubscription,
			state.getSingleSubscription,
			state.singleSubscription,
			state.loading,
		])
	);

	// Поиск клиентов
	const [fetchCustomerBookings, customerBookings] = useCustomersStore(
		useShallow((state) => [state.fetchCustomerBookings, state.customerBookings])
	);

	const { filteredData } = DataFilter();

	// Выбранный департамент
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	// Modal profile customer
	const [modalProfile, toggleModalProfile] = useToggle(false);
	const [isFormValid, setIsFormValid] = useState(false); // проверка валидности отдельных полей ввода в модальном окне записи
	const [selectedSubcriptionsStatus, setSelectedSubcriptionsStatus] = useState({
		value: 'ACTIVE',
		label: 'Активный',
	});
	const [customer, setCustomer] = useState([]);
	const [customerId, setCustomerId] = useState(0);
	const [description, setDescription] = useState('');
	const [creatorId, setCreatorId] = useState(0);
	// console.log('startDate', startDate);
	// console.log('subscriptionData', subscriptionData);

	// get all subscriptions
	useEffect(() => {
		getSubscriptions(filteredData);
	}, [selectedDepartment, filteredData.start_date]);

	// Получить все названия абонементов
	const {
		selectedSubcriptionsName,
		findSubcriptionsNameInData,
		setSelectedSubcriptionsName,
	} = useSubscriptionsNames();

	// editing single subscription
	const subscriptionDataIsEmpty = useMemo(
		() => Object.keys(singleSubscription).length === 0,
		[singleSubscription]
	);

	useEffect(() => {
		if (!subscriptionDataIsEmpty && !modal) {
			const customerPhone = singleSubscription?.customer?.phone;

			setCustomerId(singleSubscription?.customer?.id);
			setCreatorId(singleSubscription?.creator);

			setSelectedSubcriptionsName(
				findSubcriptionsNameInData(singleSubscription?.name?.id)
			);

			// setStartDate(new Date(singleSubscription?.from_date));
			// setEndDate(new Date(singleSubscription?.to_date));

			toggle();
		}
	}, [singleSubscription]);

	const handleEditSubmit = async () => {
		const id = singleSubscription?.id ?? 0;

		const changedSubscription = {
			status: selectedSubcriptionsStatus?.value,
			department: selectedDepartment,
			creator: creatorId,
			description: description,
			name: selectedSubcriptionsName?.value,
			customer: customerId,
		};

		await updateSubscription({ changedSubscription, id });
		await getSubscriptions();
		validation.resetForm();
	};

	const initialValues = {
		description: description,
	};

	// validation
	const validation = useFormik({
		enableReinitialize: true,

		initialValues,
		onSubmit: () => {
			handleEditSubmit();

			toggle();
		},
	});

	// Выбор названия абонемента в селекте
	const handleSelectedSubscriptionStatus = (value) => {
		setSelectedSubcriptionsStatus(value);
	};

	// Данные в карточке клиента и запрос данных
	const handleProfileClick = useCallback(
		(data) => {
			const { id, surname, name, second_name, phone, email, dob, description } =
				data.customer;

			// Запрос абонементов клиента по номеру телефона
			getSubscriptionsByPhone(phone);

			// запрос данных о заказах клиента
			fetchCustomerBookings(id);

			const convertedDate = dob ? formatDate(dob) : null;

			setCustomer({
				id: id ?? '',
				surname: surname ?? '',
				name: name ?? '',
				secondname: second_name ?? '',
				phone: phone ?? '',
				email: email ?? '',
				dateBirth: convertedDate,
				description: description ?? '',
			});

			toggleModalProfile();
		},
		[toggleModalProfile]
	);

	// get single subscription from base
	const handleSingleSubscriptionClick = useCallback((subId) => {
		getSingleSubscription(subId);
		onIsEditChange(true);
	}, []);

	useEffect(() => {
		formValidity();
	}, [description]);

	function formValidity() {
		const isDescriptionValid = description !== '';

		setIsFormValid(isDescriptionValid);
	}

	const handleDescriptionChange = useCallback((e) => {
		setDescription(e.target.value);
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
				Header: 'Фамилия',
				accessor: 'customer.surname',
				filterable: true,
				// width: 100,
				Cell: (cellProps) => {
					return <Surname {...cellProps} />;
				},
			},
			{
				Header: 'Имя',
				accessor: 'customer.name',
				filterable: true,
				// width: 100,
				Cell: (cellProps) => {
					return <Name {...cellProps} />;
				},
			},
			{
				Header: 'Отчество',
				accessor: 'customer.second_name',
				filterable: true,
				// width: 100,
				Cell: (cellProps) => {
					return <SecondName {...cellProps} />;
				},
			},
			{
				Header: 'Департамент',
				accessor: 'department.name',
				filterable: true,
				width: 150,
				Cell: (cellProps) => {
					return <Department {...cellProps} />;
				},
			},
			{
				Header: 'Услуга',
				accessor: 'type.name',
				filterable: true,
				width: 200,
				Cell: (cellProps) => {
					return <Service {...cellProps} />;
				},
			},
			{
				Header: 'Стоим.',
				accessor: 'type.price',
				filterable: true,
				width: 50,
				Cell: (cellProps) => {
					return <Cost {...cellProps} />;
				},
			},
			{
				Header: 'Мес.',
				accessor: 'type.month',
				filterable: true,
				width: 40,
				Cell: (cellProps) => {
					return <MonthCell {...cellProps} />;
				},
			},
			{
				Header: 'Остал. посещ.',
				accessor: 'count',
				filterable: true,
				width: 50,
				Cell: (cellProps) => {
					return <Amount {...cellProps} />;
				},
			},
			{
				Header: 'Оплатить',
				accessor: 'to_pay',
				filterable: true,
				width: 40,
				Cell: (cellProps) => {
					return <Amount {...cellProps} />;
				},
			},
			{
				Header: 'Статус',
				accessor: 'status',
				filterable: true,
				width: 50,
				Cell: (cellProps) => {
					return <StatusCell {...cellProps} />;
				},
			},
			{
				Header: 'Дата созд.',
				accessor: 'date_created',
				filterable: true,
				width: 50,
				Cell: (cellProps) => {
					return <DateBooking {...cellProps} />;
				},
			},
			{
				Header: 'Примечание',
				accessor: 'description',
				filterable: true,
				width: 150,
				Cell: (cellProps) => {
					return <Notice {...cellProps} />;
				},
			},

			{
				Header: 'Действие',
				accessor: 'action',
				disableFilters: true,
				textAlign: 'center',
				width: 50,
				Cell: (cellProps) => {
					return (
						<div className='d-flex gap-3 users justify-content-center'>
							<ul className='d-flex justify-content-around list-inline font-size-20 contact-links mb-0 w-100'>
								{/* Карточка клиента */}
								<li className='list-inline-item cursor-pointer'>
									<span
										onClick={() => {
											const customer = cellProps.row.original;
											// console.log('customer', customer);
											handleProfileClick(customer);
										}}
									>
										<Tooltip title='Карточка клиента'>
											<span>
												<i
													className='uil uil-user font-size-18'
													id={`usertooltip-${cellProps.row.index}`}
												/>
											</span>
										</Tooltip>
									</span>
								</li>

								{/* edit subscription */}
								{isSuperAdmin && (
									<li className='list-inline-item'>
										<Link
											to='#'
											className='text-primary'
											onClick={() => {
												const { id } = cellProps.row.original;
												handleSingleSubscriptionClick(id);
											}}
										>
											<Tooltip title='Редактировать'>
												<span>
													<i
														className='uil uil-pen font-size-18'
														id={`edittooltip-${cellProps.row.index}`}
													/>
												</span>
											</Tooltip>
										</Link>
									</li>
								)}
							</ul>
						</div>
					);
				},
			},
		],
		[handleProfileClick]
	);

	return (
		<>
			{loading && <Loader />}
			{!loading && subscriptionsList && subscriptionsList?.length > 0 && (
				<TableContainer
					columns={columns}
					data={subscriptionsList}
					isGlobalFilter={true}
					isAddUsers={true}
					isAddTableWithoutBorderStrap={true}
				/>
			)}

			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle} tag='h4'>
					{!!isEdit ? 'Изменить абонемент' : 'Создать абонемент'}
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
								<div className='mb-3'>
									<Label className='form-label archi-label'>Статус</Label>
									<ArchiSelect
										options={subscriptionsStatusData}
										value={selectedSubcriptionsStatus}
										onChange={handleSelectedSubscriptionStatus}
										className='main__select'
										classNamePrefix='main__select'
									/>
								</div>

								<div className='mb-3'>
									<Label className='form-label archi-label'>Комментарий</Label>
									<DescriptionArea
										value={description}
										onChange={handleDescriptionChange}
									/>
								</div>
							</Col>
						</Row>
						<Row>
							<Col>
								<div className='text-end'>
									<button
										type='submit'
										className='archi__btn archi__btn-green'
										disabled={!isFormValid}
									>
										Сохранить
									</button>
								</div>
							</Col>
						</Row>
					</Form>
				</ModalBody>
			</Modal>

			<CustomerProfileModal
				isOpen={modalProfile}
				toggleModal={toggleModalProfile}
				customerBookings={customerBookings}
				customerData={customer}
			/>
		</>
	);
};

export default SubscriptionsTable;
