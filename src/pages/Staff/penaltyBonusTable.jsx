import React, { useEffect, useMemo, useState, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TableContainer from '@/components/Common/TableContainer';
import * as Yup from 'yup';
import { useFormik } from 'formik';
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
	CardTitle,
} from 'reactstrap';
// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { usePenaltyBonusStore } from '@/storeZustand';

import { DataFilter } from '@/containers';
import { Name, formatDateTimeCell } from '@/helpers/Table/check_value';

import { useToggle } from '@/hooks';
import Loader from '@/components/Common/Loader';
import EditIcon from '@/components/Common/Icons/EditIcon';

const PenaltyBonusTable = () => {
	// Фильтр даты и выбор департамента
	const { filteredWorkingPeriod } = DataFilter();

	// Modal edit and add customer
	const [modal, toggleModal] = useToggle(false);

	// Получение бонусов сотрудников
	const [
		penaltyBonusList,
		getPenaltyBonuses,
		addPenaltyBonus,
		getPenaltyBonusById,
		penaltyBonusById,
		updatePenaltyBonus,
		loadingBonus,
	] = usePenaltyBonusStore(
		useShallow((state) => [
			state.penaltyBonusList,
			state.getPenaltyBonuses,
			state.addPenaltyBonus,
			state.getPenaltyBonusById,
			state.penaltyBonusById,
			state.updatePenaltyBonus,
			state.loadingBonus,
		])
	);

	// Загрузка данных рабочего времени и бонусов
	useEffect(() => {
		getPenaltyBonuses(filteredWorkingPeriod); // загрузка бонусов
	}, [filteredWorkingPeriod.date, filteredWorkingPeriod.department_id]);

	// данные выбранного сотрудника при редактировании
	const {
		id = null,
		start_date_time = null,
		finish_date_time = null,
		total_hours_in_day = null,
		bonus_per_day = null,
		description = null,
		staff = null,
	} = penaltyBonusById || {};

	const staffName = `${staff?.name || ''} ${staff?.surname || ''}`; // Данные сотрудника в модальном окне

	// Обновление данных о рабочем времени сотрудника
	const handleSubmit = async (values) => {
		const newWorkingPeriod = {
			finish_date_time: values.finish_date_time,
			total_hours_in_day: values.total_hours_in_day,
			bonus_per_day: values.bonus_per_day,
			description: values.description,
		};

		// данные для добавления бонуса
		const data = {
			amount: values.bonus_per_day,
			staff: staff.id,
			date_of_payment: values.finish_date_time,
		};

		// await patchWorkingPeriod({ id, newWorkingPeriod });
		// await getWorkingPeriod(filteredWorkingPeriod);
		await addPenaltyBonus(data); // Добавить бонус
		await getPenaltyBonuses(filteredWorkingPeriod);
		toggleModal();
	};

	const validationSchema = Yup.object({
		start_date_time: Yup.string().required('Введите дату начала'),
		finish_date_time: Yup.string().required('Введите дату окончания'),
		total_hours_in_day: Yup.string().required('Введите кол-во часов'),
		bonus_per_day: Yup.string().required('Введите бонус'),
		description: Yup.string().required('Введите описание'),
	});

	const initialValues = {
		start_date_time: start_date_time?.slice(0, 16), // удаляем смещение временной зоны
		finish_date_time: finish_date_time?.slice(0, 16),
		total_hours_in_day,
		bonus_per_day,
		description,
	};

	// validation
	const validation = useFormik({
		enableReinitialize: true,
		initialValues,
		validationSchema,
		onSubmit: (values) => {
			handleSubmit(values);
		},
	});

	// Информация о конкретном сотруднике
	const handleCellClick = useCallback((id) => {
		getPenaltyBonusById(id); // запрос по id данных сотрудника
		toggleModal();
	}, []);

	const columns = useMemo(
		() => [
			{
				Header: 'Фамилия',
				accessor: 'staff.surname',
				filterable: true,
				width: 100,
				Cell: (cellProps) => {
					return <Name {...cellProps} />;
				},
			},
			{
				Header: 'Имя',
				accessor: 'staff.name',
				filterable: true,
				width: 100,
				Cell: (cellProps) => {
					return <Name {...cellProps} />;
				},
			},
			{
				Header: 'Сумма',
				accessor: 'amount',
				filterable: true,
				width: 70,
				Cell: (cellProps) => {
					return <Name {...cellProps} />;
				},
			},
			{
				Header: 'Дата',
				accessor: 'date_of_payment',
				disableFilters: true,
				width: 100,
				Cell: (cellProps) => {
					return formatDateTimeCell(cellProps);
				},
			},
			{
				Header: 'Описание',
				accessor: 'description',
				width: 200,
				filterable: true,
				Cell: (cellProps) => {
					return <Name {...cellProps} />;
				},
			},
			// {
			// 	Header: 'Изменить статус',
			// 	accessor: 'action',
			// 	disableFilters: true,
			// 	textAlign: 'center',
			// 	width: 50,
			// 	Cell: (cellProps) => {
			// 		return <PenaltyStatusSelect cellProps={cellProps} />;
			// 	},
			// },
			{
				Header: 'Изменить',
				disableFilters: true,
				width: 40,
				Cell: ({ row }) => {
					return (
						<div
							className='cursor-pointer text-center'
							style={{ color: '#4eb47f' }}
							onClick={() => {
								const { id } = row.original;
								handleCellClick(id);
							}}
						>
							<EditIcon id={`penaltyBonusTooltip-${row.index}`} />
							<UncontrolledTooltip
								placement='top'
								target={`penaltyBonusTooltip-${row.index}`}
							>
								Изменить
							</UncontrolledTooltip>
						</div>
					);
				},
			},
		],
		[]
	);

	return (
		<>
			<Card>
				<CardBody>
					<CardTitle tag='h5'>Бонусы и штрафы</CardTitle>
					{loadingBonus && <Loader />}
					{!loadingBonus && penaltyBonusList?.length > 0 && (
						<TableContainer
							columns={columns}
							data={penaltyBonusList}
							isGlobalFilter={true}
							isAddUsers={true}
							isAddTableWithoutBorderStrap={true}
							hasSearch={false}
							hasPagination={false}
						/>
					)}
				</CardBody>
			</Card>

			<Modal isOpen={modal} toggle={toggleModal}>
				<ModalHeader toggle={toggleModal} tag='h4'>
					Изменить данные
				</ModalHeader>
				<ModalBody>
					<Form
						onSubmit={(e) => {
							e.preventDefault();
							validation.handleSubmit();
							return false;
						}}
					>
						<Row className='mb-3'>
							<h3>{staffName}</h3>
							<Col className='col-5'>
								<Label className='form-label archi-label'>Время начала</Label>
								<Input
									name='start_date_time'
									type='datetime-local'
									onChange={validation.handleChange}
									onBlur={validation.handleBlur}
									value={validation.values.start_date_time || ''}
									invalid={
										validation.touched.start_date_time &&
										validation.errors.start_date_time
											? true
											: false
									}
								/>
								{validation.touched.start_date_time &&
								validation.errors.start_date_time ? (
									<FormFeedback type='invalid'>
										{validation.errors.start_date_time}
									</FormFeedback>
								) : null}
							</Col>
							<Col className='col-5'>
								<Label className='form-label archi-label'>
									Время окончания
								</Label>
								<Input
									name='finish_date_time'
									type='datetime-local'
									onChange={validation.handleChange}
									onBlur={validation.handleBlur}
									value={validation.values.finish_date_time || ''}
									invalid={
										validation.touched.finish_date_time &&
										validation.errors.finish_date_time
											? true
											: false
									}
								/>
								{validation.touched.finish_date_time &&
								validation.errors.finish_date_time ? (
									<FormFeedback type='invalid'>
										{validation.errors.finish_date_time}
									</FormFeedback>
								) : null}
							</Col>
						</Row>
						<Row className='mb-3'>
							<Col className='col-2'>
								<Label className='form-label archi-label'>Часы</Label>
								<Input
									name='total_hours_in_day'
									type='number'
									onChange={validation.handleChange}
									onBlur={validation.handleBlur}
									value={validation.values.total_hours_in_day || ''}
									invalid={
										validation.touched.total_hours_in_day &&
										validation.errors.total_hours_in_day
											? true
											: false
									}
								/>
								{validation.touched.total_hours_in_day &&
								validation.errors.total_hours_in_day ? (
									<FormFeedback type='invalid'>
										{validation.errors.total_hours_in_day}
									</FormFeedback>
								) : null}
							</Col>
							<Col className='col-2'>
								<Label className='form-label archi-label'>Бонус</Label>
								<Input
									name='bonus_per_day'
									type='number'
									onChange={validation.handleChange}
									onBlur={validation.handleBlur}
									value={validation.values.bonus_per_day || ''}
									invalid={
										validation.touched.bonus_per_day &&
										validation.errors.bonus_per_day
											? true
											: false
									}
								/>
								{validation.touched.bonus_per_day &&
								validation.errors.bonus_per_day ? (
									<FormFeedback type='invalid'>
										{validation.errors.bonus_per_day}
									</FormFeedback>
								) : null}
							</Col>
							<Col className='col-8'>
								<Label className='form-label archi-label'>Описание</Label>
								<Input
									name='description'
									type='text'
									onChange={validation.handleChange}
									onBlur={validation.handleBlur}
									value={validation.values.description || ''}
									invalid={
										validation.touched.description &&
										validation.errors.description
											? true
											: false
									}
								/>
								{validation.touched.description &&
								validation.errors.description ? (
									<FormFeedback type='invalid'>
										{validation.errors.description}
									</FormFeedback>
								) : null}
							</Col>
						</Row>
						<div className='text-end'>
							<button type='submit' className='btn btn-success save-user'>
								Сохранить
							</button>
						</div>
					</Form>
				</ModalBody>
			</Modal>
		</>
	);
};

export default PenaltyBonusTable;
