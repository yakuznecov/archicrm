// Список компаний

import React, { useMemo, useEffect, useCallback, useState } from 'react';
import TableContainer from '@/components/Common/TableContainer';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Breadcrumbs from '@/components/Common/Breadcrumb';
import { Toaster } from 'react-hot-toast'; // notifications
import { useToggle } from '@/hooks';
import { Name } from '@/helpers/Table/check_value';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useFieldsStore, useTemplatesStore } from '@/storeZustand';

import {
	Form,
	Col,
	Row,
	Card,
	CardBody,
	CardTitle,
	Modal,
	ModalHeader,
	ModalBody,
	Label,
	UncontrolledTooltip,
	Input,
	FormFeedback,
} from 'reactstrap';

import Loader from '@/components/Common/Loader';
import EditIcon from '@/components/Common/Icons/EditIcon';

const TemplateFields = () => {
	const [modal, toggleModal] = useToggle(false);
	const [isEdit, setIsEdit] = useState(false);

	// Поля шаблонов
	const [patchField, fieldById, getFieldById] = useFieldsStore(
		useShallow((state) => [
			state.patchField,
			state.fieldById,
			state.getFieldById,
		])
	);

	// Все шаблоны
	const [templatesList, getTemplates, loading] = useTemplatesStore(
		useShallow((state) => [
			state.templatesList,
			state.getTemplates,
			state.loading,
		])
	);

	// получить все шаблоны документов
	useEffect(() => {
		getTemplates();
	}, []);

	const handleSubmit = async (values, isEdit) => {
		const id = isEdit ? fieldById.id : undefined;

		const fieldData = {
			position: values.position,
		};

		if (isEdit) {
			await patchField({ id, fieldData });
		} else {
			// await addCompanyAddress(addressData);
		}

		getTemplates();
	};

	const validationSchema = Yup.object({
		position: Yup.string().required('Установите позицию поля'),
	});

	const initialValues = {
		position: fieldById?.position || null,
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

	// Информация о конкретном поле
	const handleCellClick = useCallback((id) => {
		getFieldById(id);
		setIsEdit(true);
		toggleModal();
	}, []);

	const columns = useMemo(
		() => [
			{
				Header: 'Имя',
				accessor: 'name',
				filterable: true,
				width: 150,
				Cell: (cellProps) => {
					return <Name {...cellProps} />;
				},
			},
			{
				Header: 'Тип',
				accessor: 'type',
				filterable: true,
				width: 100,
				Cell: (cellProps) => {
					return <Name {...cellProps} />;
				},
			},
			{
				Header: 'Мин. длина поля',
				accessor: 'min_length',
				filterable: true,
				width: 50,
				Cell: (cellProps) => {
					return <Name {...cellProps} />;
				},
			},
			{
				Header: 'Макс. длина поля',
				accessor: 'max_length',
				filterable: true,
				width: 50,
				Cell: (cellProps) => {
					return <Name {...cellProps} />;
				},
			},
			{
				Header: 'Обязательное поле',
				accessor: 'required',
				filterable: true,
				width: 50,
				Cell: (cellProps) => {
					return <span>{cellProps.value ? 'Да' : 'Нет'}</span>;
				},
			},
			{
				Header: 'Позиция поля',
				accessor: 'position',
				filterable: true,
				width: 50,
				Cell: (cellProps) => {
					return <Name {...cellProps} />;
				},
			},
			{
				Header: 'Действия',
				accessor: 'action',
				disableFilters: true,
				textAlign: 'center',
				width: 50,
				Cell: (cellProps) => {
					return (
						<div className='d-flex gap-3 users justify-content-center'>
							<ul className='list-inline font-size-20 contact-links mb-0'>
								{/* редактировать поле */}
								<li
									className='list-inline-item text-primary cursor-pointer'
									onClick={() => {
										const { id } = cellProps.row.original;
										handleCellClick(id);
									}}
								>
									<EditIcon id={`edittooltip-${cellProps.row.index}`} />
									<UncontrolledTooltip
										placement='top'
										target={`edittooltip-${cellProps.row.index}`}
									>
										Обновить поле
									</UncontrolledTooltip>
								</li>
							</ul>
						</div>
					);
				},
			},
		],
		[handleCellClick]
	);

	return (
		<div className='page-content'>
			<div className='container-fluid'>
				<Breadcrumbs title='Список шаблонов' breadcrumbItem='Список шаблонов' />
				<Row>
					{templatesList?.map(({ id, name, fields }) => (
						<Card key={id}>
							<CardBody>
								<CardTitle className='mb-1'>{name}</CardTitle>
								{loading && <Loader />}
								{!loading && fields && (
									<TableContainer
										columns={columns}
										data={fields}
										isGlobalFilter={true}
										isAddUsers={true}
										isAddTableWithoutBorderStrap={true}
										hasSearch={false}
										hasPagination={false}
									/>
								)}
							</CardBody>
						</Card>
					))}
				</Row>

				<Modal isOpen={modal} toggle={toggleModal}>
					<ModalHeader toggle={toggleModal} tag='h4'>
						Изменить поле шаблона
					</ModalHeader>
					<ModalBody>
						<Form
							onSubmit={(e) => {
								e.preventDefault();
								validation.handleSubmit();
								return false;
							}}
						>
							<Row className='justify-content-end'>
								<div className='mb-3'>
									<Label className='form-label archi-label'>Позиция поля</Label>
									<Input
										name='position'
										type='text'
										onChange={validation.handleChange}
										onBlur={validation.handleBlur}
										value={validation.values.position || ''}
										invalid={
											validation.touched.position && validation.errors.position
												? true
												: false
										}
									/>
									{validation.touched.position && validation.errors.position ? (
										<FormFeedback type='invalid'>
											{validation.errors.position}
										</FormFeedback>
									) : null}
								</div>
								<div className='text-end'>
									<button type='submit' className='archi__btn archi__btn-green'>
										Сохранить
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

export default TemplateFields;
