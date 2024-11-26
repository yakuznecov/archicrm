// Список клиентов
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import TableContainer from '@/components/Common/TableContainer';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { convertDate, convertModalDate } from '@/helpers/Date/formatDate';
import { get } from '@/helpers/api_helper';
import { UserOutlined } from '@ant-design/icons';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useCustomersStore } from '@/storeZustand';

import ArchiSelect from '@/components/Common/ArchiSelect';
import { Email, Surname, Name, SecondName } from '@/helpers/Table/check_value';
import { useToggle, useCustomerSearch } from '@/hooks';

import { patchCustomer } from '@/services/customers';

import {
	Col,
	Row,
	UncontrolledTooltip,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	Input,
	FormFeedback,
	Label,
	Card,
	CardBody,
} from 'reactstrap';

import PhoneNumber from '@/components/Common/PhoneNumber';
import CustomerProfileModal from '@/components/Common/CustomerProfileModal';

// icons
import saveIcon from '@/assets/images/save/save-comment.svg';
import EditIcon from '@/components/Common/Icons/EditIcon';

const CustomersList = () => {
	// Поиск клиентов
	const [
		selectedCustomer,
		customerBookings,
		updateCustomer,
		fetchCustomerBookings,
	] = useCustomersStore(
		useShallow((state) => [
			state.selectedCustomer,
			state.customerBookings,
			state.updateCustomer,
			state.fetchCustomerBookings,
		])
	);

	// Modal edit and add customer
	const [modal, toggleModal] = useToggle(false);

	// Modal profile customer
	const [modalProfile, toggleModalProfile] = useToggle(false);

	const [customer, setCustomer] = useState([]);
	console.log('customer', customer);

	const { id, surname, name, second_name, phone, email, dob } =
		customer[0] || [];

	// search customer
	const { customersData, handleSelectedCustomer, setSearchInput } =
		useCustomerSearch();

	useEffect(() => {
		if (selectedCustomer.id) {
			const getSingleCustomer = async () => {
				const id = selectedCustomer.id;
				const data = await get(`/customers/${id}/`);
				setCustomer([data]);
			};
			getSingleCustomer();
		}
	}, [selectedCustomer]);

	const initialValues = {
		surname: surname || '',
		name: name || '',
		secondname: second_name || '',
		phone: phone || '',
		email: email || '',
		dateBirth: dob ? convertModalDate(dob) : '',
	};

	const validationSchema = Yup.object({
		name: Yup.string().required('Пожалуйста, введите имя'),
		phone: Yup.string().required('Пожалуйста, введите номер телефона'),
	});

	const handleEditSubmit = (values) => {
		const changedCustomer = {
			surname: values.surname,
			name: values.name,
			second_name: values.secondname,
			phone: values.phone,
			email: values.email,
			dob: convertDate(values.dateBirth), // 1975-12-26T00:00:00+03:00 - (dateStr + "T00:00:00.000Z")
			customer_class: null,
		};
		// update customer
		updateCustomer({ changedCustomer, id });
		validation.resetForm();
	};

	// validation
	const validation = useFormik({
		enableReinitialize: true,
		initialValues,
		validationSchema,
		onSubmit: (values) => {
			handleEditSubmit(values);
			toggleModal();
		},
	});

	// Изменение данных для клиента
	const handleCustomerClick = () => {
		toggleModal();
	};

	// Данные в карточке клиента и запрос данных
	const handleProfileClick = () => {
		fetchCustomerBookings(id);
		toggleModalProfile();
	};

	// Обновление комментария
	const handleUpdateDescription = async (id, value) => {
		const data = {
			description: value,
		};

		await patchCustomer({ id, data });
		const customerData = await get(`/customers/${id}/`);
		setCustomer([customerData]);
	};

	// смена класса клиента
	// const handleRadioChange = (event) => {
	// 	const selectedElement = event.target.value;
	// 	setSelectedClass(selectedElement);
	// };

	const columns = useMemo(
		() => [
			{
				Header: 'Фамилия',
				accessor: 'surname',
				filterable: true,
				width: 100,
				Cell: (cellProps) => {
					return <Surname {...cellProps} />;
				},
			},
			{
				Header: 'Имя',
				accessor: 'name',
				filterable: true,
				width: 100,
				Cell: (cellProps) => {
					return <Name {...cellProps} />;
				},
			},
			{
				Header: 'Отчество',
				accessor: 'second_name',
				filterable: true,
				width: 100,
				Cell: (cellProps) => {
					return <SecondName {...cellProps} />;
				},
			},
			{
				Header: 'Телефон',
				accessor: 'phone',
				filterable: true,
				width: 70,
				Cell: <PhoneNumber phone={phone} />,
			},
			{
				Header: 'Email',
				accessor: 'email',
				filterable: true,
				width: 40,
				Cell: (cellProps) => {
					return <Email {...cellProps} />;
				},
			},
			{
				Header: 'Комментарий',
				accessor: 'description',
				filterable: true,
				width: 200,
				Cell: (cellProps) => {
					const [description, setDescription] = useState(cellProps.value); // комментарий у клиента
					const id = cellProps.row.original.id; // id клиента

					return (
						<Row className='align-items-center'>
							<Col className='col-10'>
								<textarea
									name='description'
									className='input-large form-control'
									rows='2'
									placeholder='Введите комментарий ...'
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								/>
							</Col>
							<Col className='col-2'>
								<span
									className='cursor-pointer'
									id='saveTooltip'
									onClick={() => handleUpdateDescription(id, description)}
								>
									<img src={saveIcon} alt='save' width={40} height={40} />
									<UncontrolledTooltip placement='top' target={'saveTooltip'}>
										Сохранить
									</UncontrolledTooltip>
								</span>
							</Col>
						</Row>
					);
				},
			},
			// {
			// 	Header: "Классы клиента",
			// 	width: 250,
			// 	Cell: () => {
			// 		return (
			// 			<MainRadioButtons
			// 				radioOptions={customersClassesData}
			// 				selectedRadio={selectedClass}
			// 				setSelectedRadio={setSelectedClass}
			// 				handleRadioChange={handleRadioChange}
			// 			/>
			// 		)
			// 	},
			// },
			// {
			// 	Header: "Сохранить класс",
			// 	width: 70,
			// 	Cell: () => {
			// 		return <button
			// 			type="submit"
			// 			className="archi__btn archi__btn-green w-100"
			// 			onClick={handleClassChange}
			// 		>
			// 			Сохранить
			// 		</button>
			// 	},
			// },
			{
				Header: 'Действия',
				accessor: 'action',
				disableFilters: true,
				textAlign: 'center',
				width: 40,
				Cell: (cellProps) => {
					return (
						<div className='d-flex gap-3 users justify-content-center'>
							<ul className='list-inline font-size-20 contact-links mb-0'>
								{/* Карточка клиента */}
								<li className='list-inline-item cursor-pointer'>
									<span
										onClick={() => {
											const customer = cellProps.row.original;
											handleProfileClick(customer);
										}}
									>
										<span id={`usertooltip-${cellProps.row.index}`}>
											<UserOutlined />
										</span>
										<UncontrolledTooltip
											placement='top'
											target={`usertooltip-${cellProps.row.index}`}
										>
											Карточка клиента
										</UncontrolledTooltip>
									</span>
								</li>

								{/* edit customer */}
								<li className='list-inline-item'>
									<Link
										to='#'
										className='text-primary'
										onClick={() => {
											const customer = cellProps.row.original;
											handleCustomerClick(customer);
										}}
									>
										<EditIcon id={`edittooltip-${cellProps.row.index}`} />
										<UncontrolledTooltip
											placement='top'
											target={`edittooltip-${cellProps.row.index}`}
										>
											Редактировать
										</UncontrolledTooltip>
									</Link>
								</li>
							</ul>
						</div>
					);
				},
			},
		],
		[handleCustomerClick, handleProfileClick]
	);

	return (
		<>
			<div className='page-content'>
				<div className='container-fluid'>
					<Row className='mb-3'>
						<Col className='col-2'>
							<Label className='form-label archi-label'>Найти клиента</Label>
							<Input
								name='search'
								type='number'
								onChange={(event) => setSearchInput(event.target.value)}
								placeholder='Введите номер ...'
							/>
						</Col>
						<Col className='col-3'>
							<Label className='form-label archi-label'>
								Найденные совпадения по номеру
							</Label>
							<ArchiSelect
								options={customersData}
								value={selectedCustomer}
								onChange={handleSelectedCustomer}
								className='main__select'
								classNamePrefix='main__select'
							/>
						</Col>
					</Row>
					<Card>
						<CardBody>
							{/* {status === 'loading' && <Loader />} */}
							{customer && (
								<TableContainer
									columns={columns}
									data={customer}
									isGlobalFilter={true}
									isAddUsers={true}
									isAddTableWithoutBorderStrap={true}
									hasPagination={false}
									hasSearch={false}
								/>
							)}
						</CardBody>
					</Card>

					<Modal isOpen={modal} toggle={toggleModal}>
						<ModalHeader toggle={toggleModal} tag='h4'>
							Изменить данные клиента
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
											<Label className='form-label'>Фамилия</Label>
											<Input
												name='surname'
												type='text'
												value={validation.values.surname ?? ''}
												onChange={validation.handleChange}
											/>
										</div>
										<div className='mb-3'>
											<Label className='form-label'>Имя</Label>
											<Input
												name='name'
												type='text'
												validate={{
													required: { value: true },
												}}
												onChange={validation.handleChange}
												onBlur={validation.handleBlur}
												value={validation.values.name || ''}
												invalid={
													validation.touched.name && validation.errors.name
														? true
														: false
												}
											/>
											{validation.touched.name && validation.errors.name ? (
												<FormFeedback type='invalid'>
													{validation.errors.name}
												</FormFeedback>
											) : null}
										</div>
										<div className='mb-3'>
											<Label className='form-label'>Отчество</Label>
											<Input
												name='secondname'
												type='text'
												value={validation.values.secondname || ''}
												onChange={validation.handleChange}
											/>
										</div>
										<div className='mb-3'>
											<Label className='form-label'>Телефон</Label>
											<Input
												name='phone'
												type='text'
												onChange={validation.handleChange}
												onBlur={validation.handleBlur}
												value={validation.values.phone || ''}
												title='Введите номер, начинающийся с цифры 7'
												invalid={
													validation.touched.phone && validation.errors.phone
														? true
														: false
												}
											/>
											{validation.touched.phone && validation.errors.phone ? (
												<FormFeedback type='invalid'>
													{validation.errors.phone}
												</FormFeedback>
											) : null}
										</div>
										<div className='mb-3'>
											<Label className='form-label'>Email</Label>
											<Input
												name='email'
												type='email'
												value={validation.values.email || ''}
												onChange={validation.handleChange}
											/>
										</div>
										<div className='mb-3'>
											<Label className='form-label'>Дата рождения</Label>
											<Input
												name='dateBirth'
												type='date'
												value={validation.values.dateBirth || ''}
												onChange={validation.handleChange}
											/>
										</div>
										<div className='mb-3 margin-auto'></div>
									</Col>
								</Row>
								<Row>
									<Col>
										<div className='text-end'>
											<button
												type='submit'
												className='archi__btn archi__btn-green'
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
						customerData={customer[0]}
					/>
				</div>
			</div>
		</>
	);
};

export default CustomersList;
