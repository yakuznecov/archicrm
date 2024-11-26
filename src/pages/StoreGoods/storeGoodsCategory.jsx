import React, { useEffect, useMemo, useState, useCallback } from 'react';
import TableContainer from '@/components/Common/TableContainer';
import Loader from '@/components/Common/Loader';
import * as Yup from 'yup';
import { useFormik } from 'formik';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useCategoryGoodsStore } from '@/storeZustand';

import Breadcrumbs from '@/components/Common/Breadcrumb';

import { Id, Category } from '@/helpers/Table/check_value';

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
	Card,
	CardBody,
	UncontrolledTooltip,
} from 'reactstrap';

import EditIcon from '@/components/Common/Icons/EditIcon';

const StoreGoodsCategory = () => {
	// Получение категорий
	const [categoriesGoods, getCategoriesGoods, loading] = useCategoryGoodsStore(
		useShallow((state) => [
			state.categoriesGoods,
			state.getCategoriesGoods,
			state.loading,
		])
	);

	const [modal, setModal] = useState(false);
	const [isEdit, setIsEdit] = useState(false);

	const [сategoryGood, setCategoryGood] = useState({});

	// Получение категорий товаров
	useEffect(() => {
		getCategoriesGoods();
	}, []);

	const handleEditSubmit = (values) => {
		const id = сategoryGood?.id ?? 0;

		// const changedCategoryGood = {
		// 	category: values.category,
		// };
		validation.resetForm();
	};

	const handleAddSubmit = (values) => {
		// const newCategoryGood = {
		// 	category: values.category,
		// };
		validation.resetForm();
	};

	const validationSchema = Yup.object({
		category: Yup.string().required('Пожалуйста, введите категорию товара'),
	});

	const initialValues = {
		category: сategoryGood?.category ?? '',
	};

	// validation
	const validation = useFormik({
		enableReinitialize: true,
		initialValues,
		validationSchema,
		onSubmit: (values) => {
			if (isEdit) {
				handleEditSubmit(values);
			} else {
				handleAddSubmit(values);
			}
			toggle();
		},
	});

	const toggle = useCallback(() => {
		if (modal) {
			setModal(false);
		} else {
			setModal(true);
		}
	}, [modal]);

	// Получение данных о категории из строки
	const handleCategoryGoodClick = useCallback(
		({ id, category }) => {
			setCategoryGood({
				id: id ?? null,
				category: category ?? null,
			});

			setIsEdit(true);

			toggle();
		},
		[toggle]
	);

	// Open modal add store good
	const handleCategoryGoodAdd = () => {
		setIsEdit(false);
		toggle();
	};

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
				Header: 'Категория',
				accessor: 'category',
				filterable: true,
				width: 100,
				Cell: (cellProps) => {
					return <Category {...cellProps} />;
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
								<li
									className='list-inline-item text-primary cursor-pointer'
									onClick={() => {
										const categoryGood = cellProps.row.original;
										handleCategoryGoodClick(categoryGood);
									}}
								>
									<EditIcon id={`edittooltip-${cellProps.row.index}`} />

									<UncontrolledTooltip
										placement='top'
										target={`edittooltip-${cellProps.row.index}`}
									>
										Изменить категорию
									</UncontrolledTooltip>
								</li>
							</ul>
						</div>
					);
				},
			},
		],
		[handleCategoryGoodClick]
	);

	return (
		<div className='page-content'>
			<div className='container-fluid'>
				<Breadcrumbs
					title='Категории товаров'
					breadcrumbItem='Категории товаров'
					addButtonLabel='Создать категорию'
					onClick={handleCategoryGoodAdd}
				/>
				<Row>
					<Col xs='12'>
						<Card>
							<CardBody>
								{loading && <Loader />}
								{!loading && categoriesGoods?.length > 0 && (
									<TableContainer
										columns={columns}
										data={categoriesGoods}
										isGlobalFilter={true}
										isAddUsers={true}
										isAddTableWithoutBorderStrap={true}
									/>
								)}
							</CardBody>
						</Card>
					</Col>
				</Row>

				<Modal isOpen={modal} toggle={toggle}>
					<ModalHeader toggle={toggle} tag='h4'>
						{!!isEdit
							? 'Изменить категорию товара'
							: 'Создать категорию товара'}
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
									<div className='mb-3 '>
										<Label className='form-label archi-label'>
											Категория товара
										</Label>
										<Input
											name='category'
											type='text'
											onChange={validation.handleChange}
											onBlur={validation.handleBlur}
											value={validation.values.category || ''}
											invalid={
												validation.touched.category &&
												validation.errors.category
													? true
													: false
											}
										/>
										{validation.touched.category &&
										validation.errors.category ? (
											<FormFeedback type='invalid'>
												{validation.errors.category}
											</FormFeedback>
										) : null}
									</div>
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
			</div>
		</div>
	);
};

export default StoreGoodsCategory;
