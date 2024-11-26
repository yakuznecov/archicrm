import React, { useEffect, useMemo, useState, useCallback } from 'react';
import TableContainer from '@/components/Common/TableContainer';
import Loader from '@/components/Common/Loader';
import ArchiSelect from '@/components/Common/ArchiSelect';
import * as Yup from 'yup';
import { useFormik } from 'formik';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useUserStore,
	useSizeGoodsStore,
	useMaterialGoodsStore,
	useCategoryGoodsStore,
	useNamesGoodsStore,
	useStoreGoods,
} from '@/storeZustand';

import Breadcrumbs from '@/components/Common/Breadcrumb';
import { Id, Name, Comment, Size, Cost } from '@/helpers/Table/check_value';

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

const StoreGoods = () => {
	// Загрузка данных текущего пользователя
	const [isSuperAdmin] = useUserStore(
		useShallow((state) => [state.isSuperAdmin])
	);

	// Получение количества в товаре
	const [
		getStoreGoods,
		storeGoodsList,
		updateStoreGood,
		addStoreGood,
		loading,
	] = useStoreGoods(
		useShallow((state) => [
			state.getStoreGoods,
			state.storeGoodsList,
			state.updateStoreGood,
			state.addStoreGood,
			state.loading,
		])
	);

	// Получение количества в товаре
	const [sizeGoods, getSizeGoods] = useSizeGoodsStore(
		useShallow((state) => [state.sizeGoods, state.getSizeGoods])
	);

	// Получение материала товаров
	const [materialsGoods, getMaterialsGoods] = useMaterialGoodsStore(
		useShallow((state) => [state.materialsGoods, state.getMaterialsGoods])
	);

	// Получение категорий
	const [categoriesGoods, getCategoriesGoods] = useCategoryGoodsStore(
		useShallow((state) => [state.categoriesGoods, state.getCategoriesGoods])
	);

	// Получение названия товара
	const [namesGoods, getNamesGoods] = useNamesGoodsStore(
		useShallow((state) => [state.namesGoods, state.getNamesGoods])
	);

	const [modal, setModal] = useState(false);
	const [isEdit, setIsEdit] = useState(false);

	const [storeGood, setStoreGood] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState({});
	const [selectedMaterial, setSelectedMaterial] = useState({});
	const [selectedSize, setSelectedSize] = useState({});
	const [selectedStoreGoodName, setSelectedStoreGoodName] = useState({}); // выбранное название товара

	// Получение товаров, категорий и кол-во
	useEffect(() => {
		getStoreGoods();
		getCategoriesGoods();
		getMaterialsGoods();
		getSizeGoods();
		getNamesGoods();
	}, []);

	const handleEditSubmit = (values) => {
		const id = storeGood?.id ?? 0;

		const changedStoreGood = {
			sku_name: selectedStoreGoodName.value,
			sku_description: values.comment,
			sku_price: values.price,
			sku_category: selectedCategory.value,
			sku_material: selectedMaterial.value,
			sku_size: selectedSize.value,
		};

		updateStoreGood({ changedStoreGood, id });
		validation.resetForm();
	};

	const handleAddSubmit = (values) => {
		const newStoreGood = {
			sku_name: selectedStoreGoodName,
			sku_description: values.comment,
			sku_price: values.price,
			sku_category: selectedCategory.value,
			sku_material: selectedMaterial.value,
			sku_size: selectedSize.value,
		};

		addStoreGood(newStoreGood);
		validation.resetForm();
	};

	const validationSchema = Yup.object({
		name: Yup.string().required('Пожалуйста, введите название'),
		comment: Yup.string().required('Пожалуйста, добавьте описание'),
		price: Yup.string().required('Пожалуйста, введите цену'),
	});

	const initialValues = {
		name: storeGood?.name ?? '',
		comment: storeGood?.comment ?? '',
		price: storeGood?.price ?? '',
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

	// Список найденных категорий
	const categoriesData = useMemo(() => {
		return (
			categoriesGoods?.map(({ id, category }) => ({
				value: id,
				label: category,
			})) ?? []
		);
	}, [categoriesGoods]);

	// Выбор категории в селекте
	const handleSelectedCategory = (value) => {
		setSelectedCategory(value);
	};

	// Список найденных материалов
	const materialsData = useMemo(() => {
		return (
			materialsGoods?.map(({ id, material }) => ({
				value: id,
				label: material,
			})) ?? []
		);
	}, [materialsGoods]);

	// Выбор материала в селекте
	const handleSelectedMaterial = (value) => {
		setSelectedMaterial(value);
	};

	// Список найденных параметров кол-ва
	const sizeData = useMemo(() => {
		return (
			sizeGoods?.map(({ id, size }) => ({
				value: id,
				label: size,
			})) ?? []
		);
	}, [sizeGoods]);

	// Выбор количества в селекте
	const handleSelectedSize = (value) => {
		setSelectedSize(value);
	};

	// Список найденных названий товаров
	const storeGoodsNameData = useMemo(() => {
		return (
			namesGoods?.map(({ id, name }) => ({
				value: id,
				label: name,
			})) ?? []
		);
	}, [namesGoods]);

	// Выбор материала в селекте
	const handleSelectedStoreGoodsName = (value) => {
		setSelectedStoreGoodName(value);
	};

	const toggle = useCallback(() => {
		if (modal) {
			setModal(false);
			setStoreGood(null);
		} else {
			setModal(true);
		}
	}, [modal]);

	// Получение данных о товаре из строки
	const handleStoreGoodClick = useCallback(
		({
			id,
			sku_name,
			sku_description,
			sku_price,
			sku_category,
			sku_material,
			sku_size,
		}) => {
			setStoreGood({
				id: id ?? null,
				name: sku_name?.name ?? null,
				comment: sku_description ?? null,
				price: sku_price ?? null,
			});

			setSelectedCategory({
				label: sku_category?.category,
				value: sku_category?.id,
			});
			setSelectedMaterial({
				label: sku_material?.material,
				value: sku_material?.id,
			});
			setSelectedSize({ label: sku_size?.size, value: sku_size?.id });

			setIsEdit(true);

			toggle();
		},
		[toggle]
	);

	// Open modal add store good
	const handleStoreGoodAdd = () => {
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
				Header: 'Название',
				accessor: 'sku_name.name',
				filterable: true,
				width: 150,
				Cell: (cellProps) => {
					return <Name {...cellProps} />;
				},
			},
			// {
			// 	Header: "Категория",
			// 	accessor: "sku_category.category",
			// 	filterable: true,
			// 	width: 100,
			// 	Cell: cellProps => {
			// 		return <Category {...cellProps} />
			// 	},
			// },
			// {
			// 	Header: "Материал",
			// 	accessor: "sku_material.material",
			// 	filterable: true,
			// 	width: 70,
			// 	Cell: cellProps => {
			// 		return <Material {...cellProps} />
			// 	},
			// },
			{
				Header: 'Кол-во',
				accessor: 'sku_size.size',
				filterable: true,
				width: 100,
				Cell: (cellProps) => {
					return <Size {...cellProps} />;
				},
			},
			{
				Header: 'Описание',
				accessor: 'sku_description',
				filterable: true,
				width: 300,
				Cell: (cellProps) => {
					return <Comment {...cellProps} />;
				},
			},
			{
				Header: 'Цена',
				accessor: 'sku_price',
				filterable: true,
				width: 50,
				Cell: (cellProps) => {
					return <Cost {...cellProps} />;
				},
			},
			{
				Header: 'Себестоимость',
				// accessor: "sku_price",
				filterable: true,
				width: 50,
				hiddenColumn: true,
				Cell: (cellProps) => {
					if (isSuperAdmin) {
						return <Cost {...cellProps} />;
					}
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
							{isSuperAdmin && (
								<ul className='list-inline font-size-20 contact-links mb-0'>
									{/* edit customer */}
									<li
										className='list-inline-item text-primary cursor-pointer'
										onClick={() => {
											const storeGood = cellProps.row.original;
											console.log('storeGood', storeGood);
											handleStoreGoodClick(storeGood);
										}}
									>
										<EditIcon id={`edittooltip-${cellProps.row.index}`} />
										<UncontrolledTooltip
											placement='top'
											target={`edittooltip-${cellProps.row.index}`}
										>
											Изменить данные заявки
										</UncontrolledTooltip>
									</li>
								</ul>
							)}
						</div>
					);
				},
			},
		],
		[handleStoreGoodClick]
	);

	return (
		<div className='page-content'>
			<div className='container-fluid'>
				<Breadcrumbs
					title='SKU'
					breadcrumbItem='SKU'
					addButtonLabel='Создать SKU'
					onClick={handleStoreGoodAdd}
				/>
				<Row>
					<Col xs='12'>
						<Card>
							<CardBody>
								{loading && <Loader />}
								{!loading && storeGoodsList?.length > 0 && (
									<TableContainer
										columns={columns}
										data={storeGoodsList}
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
						{!!isEdit ? 'Изменить SKU' : 'Создать SKU'}
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
										<Label className='form-label archi-label'>
											Выбрать название
										</Label>
										<ArchiSelect
											options={storeGoodsNameData}
											value={selectedStoreGoodName}
											onChange={handleSelectedStoreGoodsName}
											className='main__select'
											classNamePrefix='main__select'
										/>
										{validation.touched.name && validation.errors.name ? (
											<FormFeedback type='invalid'>
												{validation.errors.name}
											</FormFeedback>
										) : null}
									</div>
									<div className='mb-3'>
										<Label className='form-label archi-label'>Категория</Label>
										<ArchiSelect
											options={categoriesData}
											value={selectedCategory}
											onChange={handleSelectedCategory}
											className='main__select'
											classNamePrefix='main__select'
										/>
									</div>
									<div className='mb-3'>
										<Label className='form-label archi-label'>Материал</Label>
										<ArchiSelect
											options={materialsData}
											value={selectedMaterial}
											onChange={handleSelectedMaterial}
											className='main__select'
											classNamePrefix='main__select'
										/>
									</div>
									<div className='mb-3'>
										<Label className='form-label archi-label'>Количество</Label>
										<ArchiSelect
											options={sizeData}
											value={selectedSize}
											onChange={handleSelectedSize}
											className='main__select'
											classNamePrefix='main__select'
										/>
									</div>
									<div className='mb-3 '>
										<Label className='form-label archi-label'>Описание</Label>
										<Input
											name='comment'
											type='text'
											onChange={validation.handleChange}
											onBlur={validation.handleBlur}
											value={validation.values.comment || ''}
											invalid={
												validation.touched.comment && validation.errors.comment
													? true
													: false
											}
										/>
										{validation.touched.comment && validation.errors.comment ? (
											<FormFeedback type='invalid'>
												{validation.errors.comment}
											</FormFeedback>
										) : null}
									</div>
									<div className='mb-3 w-100'>
										<Label className='form-label archi-label'>Цена</Label>
										<Input
											name='price'
											type='text'
											onChange={validation.handleChange}
											onBlur={validation.handleBlur}
											value={validation.values.price || ''}
											invalid={
												validation.touched.price && validation.errors.price
													? true
													: false
											}
										/>
										{validation.touched.price && validation.errors.price ? (
											<FormFeedback type='invalid'>
												{validation.errors.price}
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

export default StoreGoods;
