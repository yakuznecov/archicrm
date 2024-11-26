// Набор шаблонов
import React, { useMemo, useEffect, useState } from 'react';
import TableContainer from '@/components/Common/TableContainer';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Breadcrumbs from '@/components/Common/Breadcrumb';
import { Toaster } from 'react-hot-toast'; // notifications
import ArchiSelect from '@/components/Common/ArchiSelect';
import { useToggle, useSelectedTemplates } from '@/hooks';
import { Name } from '@/helpers/Table/check_value';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useTemplatesStore } from '@/storeZustand';

import {
	Form,
	Col,
	Row,
	Card,
	CardBody,
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

const TemplatesSet = () => {
	const [modal, toggleModal] = useToggle(false);
	const [isEdit, setIsEdit] = useState(false);

	// Шаблоны
	const [
		templatesSetList,
		getTemplatesSet,
		getTemplatesSetById,
		templatesSetById,
		addTemplatesSet,
		updateTemplatesSet,
		clearTemplatesSetById,
		loading,
	] = useTemplatesStore(
		useShallow((state) => [
			state.templatesSetList,
			state.getTemplatesSet,
			state.getTemplatesSetById,
			state.templatesSetById,
			state.addTemplatesSet,
			state.updateTemplatesSet,
			state.clearTemplatesSetById,
			state.loading,
		])
	);

	// получить список шаблонов
	useEffect(() => {
		getTemplatesSet();
	}, []);

	// Выбор шаблонов
	const {
		templatesData,
		selectedTemplates,
		selectedTemplatesIds,
		handleSelectedTemplates,
	} = useSelectedTemplates(templatesSetById);

	const handleSubmit = async (values, isEdit) => {
		const id = isEdit ? templatesSetById?.id : undefined;

		const newTemplateSet = {
			name: values.template_name,
			template_set_position: values.template_position, // позиция
			document_template: selectedTemplatesIds, // id выбранных шаблонов
		};

		if (isEdit) {
			await updateTemplatesSet({ id, newTemplateSet });
		} else {
			await addTemplatesSet(newTemplateSet);
		}

		getTemplatesSet();
	};

	const validationSchema = Yup.object({
		template_name: Yup.string().required('Введите название шаблона'),
		template_position: Yup.number().required('Выберите позицию шаблона'),
	});

	const initialValues = {
		template_name: templatesSetById?.name || '',
		template_position: templatesSetById?.template_set_position || null,
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

	// Добавить набор шаблонов
	const handleTemplatesSetAdd = () => {
		clearForm();
		setIsEdit(false);
		toggleModal();
	};

	// Информация о конкретном наборе шаблонов
	const handleCellClick = (id) => {
		getTemplatesSetById(id); // Набор шаблонов по id
		setIsEdit(true);
		toggleModal();
	};

	// Очистка полей формы
	function clearForm() {
		clearTemplatesSetById(); // очистка шаблона
		handleSelectedTemplates([]); // очистка выбранных шаблонов
	}

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
				Header: 'Документы шаблона',
				accessor: 'document_template',
				filterable: true,
				width: 50,
				Cell: (cellProps) => {
					return cellProps.value.map(({ name }) => name).join(', ');
				},
			},

			{
				Header: 'Позиция шаблона',
				accessor: 'template_set_position',
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
				<Breadcrumbs
					title='Набор шаблонов'
					breadcrumbItem='Набор шаблонов'
					addButtonLabel='Создать набор шаблонов'
					onClick={handleTemplatesSetAdd}
				/>
				<Row>
					<Col xs='12'>
						<Card>
							<CardBody>
								{loading && <Loader />}
								{!loading && templatesSetList?.length > 0 && (
									<TableContainer
										columns={columns}
										data={templatesSetList}
										isGlobalFilter={true}
										isAddUsers={true}
										isAddTableWithoutBorderStrap={true}
									/>
								)}
							</CardBody>
						</Card>
					</Col>
				</Row>

				<Modal isOpen={modal} toggle={toggleModal}>
					<ModalHeader toggle={toggleModal} tag='h4'>
						{isEdit ? 'Изменить набор шаблонов' : 'Создать набор шаблонов'}
					</ModalHeader>
					<ModalBody>
						<Form
							onSubmit={(e) => {
								e.preventDefault();
								validation.handleSubmit();
								return false;
							}}
						>
							<div className='mb-3'>
								<Label className='form-label archi-label'>
									Название шаблона
								</Label>
								<Input
									name='template_name'
									type='text'
									onChange={validation.handleChange}
									onBlur={validation.handleBlur}
									value={validation.values.template_name || ''}
									invalid={
										validation.touched.template_name &&
										validation.errors.template_name
											? true
											: false
									}
								/>
								{validation.touched.template_name &&
								validation.errors.template_name ? (
									<FormFeedback type='invalid'>
										{validation.errors.template_name}
									</FormFeedback>
								) : null}
							</div>
							<Row className='mb-4'>
								<Col className='col-8'>
									<Label className='form-label archi-label'>
										Выбрать шаблоны
									</Label>
									<ArchiSelect
										isMulti={true}
										options={templatesData}
										value={selectedTemplates}
										onChange={handleSelectedTemplates}
										className='main__select'
										classNamePrefix='main__select'
										placeholder={'Нажмите, чтобы выбрать'}
									/>
								</Col>
								<Col className='col-4'>
									<Label className='form-label archi-label'>
										Позиция шаблона
									</Label>
									<Input
										name='template_position'
										type='number'
										onChange={validation.handleChange}
										onBlur={validation.handleBlur}
										value={validation.values.template_position || ''}
										invalid={
											validation.touched.template_position &&
											validation.errors.template_position
												? true
												: false
										}
									/>
									{validation.touched.template_position &&
									validation.errors.template_position ? (
										<FormFeedback type='invalid'>
											{validation.errors.template_position}
										</FormFeedback>
									) : null}
								</Col>
							</Row>
							<div className='text-end'>
								<button type='submit' className='archi__btn archi__btn-green'>
									Сохранить
								</button>
							</div>
						</Form>
					</ModalBody>
				</Modal>
			</div>
			<Toaster position='top-right' reverseOrder={true} />
		</div>
	);
};

export default TemplatesSet;
