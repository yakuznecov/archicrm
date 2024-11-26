// Доверенности

import React, { useEffect, useState, useCallback } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Col, Row, Table, Card, Input } from 'antd';
import { Toaster } from 'react-hot-toast'; // notifications

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useCompaniesStore, useProcuratory } from '@/storeZustand';

import Breadcrumbs from '@/components/Common/Breadcrumb';
import CustomDatePicker from '@/components/Common/CustomDatePicker';

import { useToggle } from '@/hooks';
import Loader from '@/components/Common/Loader';
import { Modal, ModalHeader, ModalBody, Form, FormFeedback } from 'reactstrap';
import { formatIsoTimeToString } from '@/helpers/Date/formatDate';
import { convertToISO } from '@/helpers/Date/dateFns';

import EditIcon from '@/components/Common/Icons/EditIcon';
import SelectCompany from './selectCompany';
import SelectOutstaff from './selectOutstaff';

const Procuratory = () => {
	// Modal edit and add customer
	const [modal, toggleModal] = useToggle(false);
	const [isEdit, setIsEdit] = useState(false);
	const [dateIssueProcuratory, setDateIssueProcuratory] = useState();
	const [selectedOutstaff, setSelectedOutstaff] = useState(null); // Выбранный сотрудник

	// Все доверенности
	const [
		procuratory,
		getProcuratory,
		addProcuratory,
		updateProcuratory,
		getProcuratoryById,
		procuratoryById,
		loading,
	] = useProcuratory(
		useShallow((state) => [
			state.procuratory,
			state.getProcuratory,
			state.addProcuratory,
			state.updateProcuratory,
			state.getProcuratoryById,
			state.procuratoryById,
			state.loading,
		])
	);

	// Все компании
	const [selectedCompany] = useCompaniesStore(
		useShallow((state) => [state.selectedCompany])
	);

	// данные доверенности по id
	const { procuratory_date = null, procuratory_number = null } =
		procuratoryById || {};

	const staffId = procuratoryById?.staff?.id;

	// получить список доверенностей
	useEffect(() => {
		getProcuratory();
	}, []);

	// установка доверенности при редактировании
	useEffect(() => {
		if (procuratoryById.id) {
			setDateIssueProcuratory(new Date(convertToISO(procuratory_date)));
		}
	}, [procuratoryById]);

	// Выбранный сотрудник при редактировании
	useEffect(() => {
		if (staffId) {
			setSelectedOutstaff(staffId);
		}
	}, [staffId]);

	const handleSelectedOutstaff = (value) => {
		setSelectedOutstaff(value);
	};

	const handleSubmit = async (values, isEdit) => {
		const id = isEdit ? procuratoryById?.id : undefined;

		const procuratoryData = {
			procuratory_number: values.procuratory_number,
			procuratory_date: formatIsoTimeToString(dateIssueProcuratory),
			staff: selectedOutstaff,
			company: selectedCompany,
		};

		if (isEdit) {
			await updateProcuratory({ id, procuratoryData }); // обновить
		} else {
			await addProcuratory(procuratoryData); // добавить
		}

		getProcuratory();
	};

	const validationSchema = Yup.object({
		procuratory_number: Yup.string().required('Введите номер доверенности'),
	});

	const initialValues = {
		procuratory_number: procuratory_number,
	};

	// validation
	const validation = useFormik({
		enableReinitialize: true,
		initialValues,
		validationSchema,
		onSubmit: (values) => {
			if (isEdit) {
				handleSubmit(values, true);
			} else {
				handleSubmit(values, false);
			}

			toggleModal();
		},
	});

	// Добавить доверенность
	const handleAddProcuratory = () => {
		setIsEdit(false);
		toggleModal();
	};

	// получить конкретную доверенность
	const handleCellClick = useCallback((id) => {
		getProcuratoryById(id);
		setIsEdit(true);
		toggleModal();
	}, []);

	// изменить дату выдачи доверенности
	const onChangeDateIssueProcuratory = (date) => {
		setDateIssueProcuratory(date);
	};

	const columns = [
		{
			title: 'Номер',
			dataIndex: 'procuratory_number',
			key: 'procuratory_number',
		},
		{
			title: 'Компания',
			dataIndex: 'company',
			key: 'company_name',
			render: (company) => company?.name,
		},
		{
			title: 'Город',
			dataIndex: 'company',
			key: 'company_city',
			render: (company) => company?.city,
		},
		{
			title: 'Фамилия',
			dataIndex: 'staff',
			key: 'staff_surname',
			render: (staff) => staff?.surname,
		},
		{
			title: 'Имя',
			dataIndex: 'staff',
			key: 'staff_name',
			render: (staff) => staff?.name,
		},
		{
			title: 'Отчество',
			dataIndex: 'staff',
			key: 'staff_second_name',
			render: (staff) => staff?.second_name,
		},
		{
			title: 'Дата выдачи',
			dataIndex: 'procuratory_date',
			key: 'procuratory_date',
		},
		{
			title: 'Действие',
			key: 'action',
			render: (text) => {
				const { id } = text;

				return (
					<div className='d-flex gap-3 users justify-content-center'>
						<ul className='list-inline font-size-20 contact-links mb-0'>
							{/* edit procuratory */}
							<li
								className='list-inline-item text-primary cursor-pointer'
								onClick={() => {
									handleCellClick(id);
								}}
							>
								<EditIcon id={`editProcuratory-${id}`} />
							</li>
						</ul>
					</div>
				);
			},
		},
	];

	return (
		<div className='page-content'>
			<div className='container-fluid'>
				<Breadcrumbs
					title='Список доверенностей'
					breadcrumbItem='Список доверенностей'
					addButtonLabel='Создать доверенность'
					onClick={handleAddProcuratory}
				/>
				<Row>
					<Col span={24}>
						<Card>
							{loading && <Loader />}
							{!loading && procuratory && procuratory?.length > 0 && (
								<Table
									columns={columns}
									dataSource={procuratory}
									pagination={false}
									size='small'
								/>
							)}
						</Card>
					</Col>
				</Row>

				<Modal isOpen={modal} toggle={toggleModal}>
					<ModalHeader toggle={toggleModal} tag='h4'>
						{!!isEdit ? 'Изменить адрес компании' : 'Создать адрес компании'}
					</ModalHeader>
					<ModalBody>
						<Form
							onSubmit={(e) => {
								e.preventDefault();
								validation.handleSubmit();
								return false;
							}}
						>
							<Row className='mb-4'>
								<Col span={24}>
									{/* Выбор компании */}
									<SelectCompany company={procuratoryById?.company?.id} />
								</Col>
							</Row>
							<Row className='mb-4'>
								<Col span={24}>
									<label className='form-label archi-label'>
										Выбрать сотрудника
									</label>
									<SelectOutstaff
										selectedOutstaff={selectedOutstaff}
										handleSelectedOutstaff={handleSelectedOutstaff}
									/>
								</Col>
							</Row>

							<Row className='mb-4' gutter={16}>
								<Col span={12}>
									<label className='form-label archi-label'>
										Номер доверенности
									</label>
									<i className='bx bxs-star archi-star' />
									<Input
										name='procuratory_number'
										type='text'
										onChange={validation.handleChange}
										onBlur={validation.handleBlur}
										value={validation.values.procuratory_number || ''}
										invalid={
											validation.touched.procuratory_number &&
											validation.errors.procuratory_number
												? true
												: false
										}
									/>
									{validation.touched.procuratory_number &&
									validation.errors.procuratory_number ? (
										<FormFeedback type='invalid'>
											{validation.errors.procuratory_number}
										</FormFeedback>
									) : null}
								</Col>
								<Col span={12}>
									<label className='form-label'>Дата выдачи доверенности</label>
									<i className='bx bxs-star archi-star' />
									<CustomDatePicker
										selected={dateIssueProcuratory}
										setDate={onChangeDateIssueProcuratory}
										showOnlyDate
										showTimeSelect={false}
									/>
								</Col>
							</Row>

							<Row className='justify-content-end'>
								<div className='text-end'>
									<button type='submit' className='archi__btn archi__btn-green'>
										{!!isEdit
											? 'Изменить данные доверенности'
											: 'Сохранить доверенность'}
									</button>
								</div>
							</Row>
						</Form>
					</ModalBody>
				</Modal>
			</div>
			<Toaster position='top-right' reverseOrder={true} />
		</div>
	);
};

export default Procuratory;
