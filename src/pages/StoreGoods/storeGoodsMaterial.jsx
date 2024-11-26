import React, { useEffect, useMemo, useState, useCallback } from 'react';
import TableContainer from '@/components/Common/TableContainer';
import Loader from '@/components/Common/Loader';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { useShallow } from 'zustand/react/shallow';
import { useMaterialGoodsStore } from '@/storeZustand';

import Breadcrumbs from '@/components/Common/Breadcrumb';
import { Id, Material } from '@/helpers/Table/check_value';

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

const StoreGoodsMaterial = () => {
	const [
		materialsGoods,
		getMaterialsGoods,
		loading,
		addMaterialGood,
		updateMaterialGood,
	] = useMaterialGoodsStore(
		useShallow((state) => [
			state.materialsGoods,
			state.getMaterialsGoods,
			state.loading,
			state.addMaterialGood,
			state.updateMaterialGood,
		])
	);

	const [modal, setModal] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [materialGood, setMaterialGood] = useState({});

	// Получение товаров, категорий и кол-во
	useEffect(() => {
		getMaterialsGoods();
	}, []);

	const handleSubmit = async (values, isEdit) => {
		const id = materialGood?.id ?? 0;

		const changedMaterialGood = {
			material: values.material,
		};

		if (isEdit) {
			await updateMaterialGood({ id, changedMaterialGood });
		} else {
			await addMaterialGood(changedMaterialGood);
		}

		getMaterialsGoods();
		validation.resetForm();
	};

	const validationSchema = Yup.object({
		material: Yup.string().required('Пожалуйста, введите название материала'),
	});

	const initialValues = {
		material: materialGood?.material ?? '',
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

	// Получение данных о материале из строки
	const handleMaterialGoodClick = useCallback(
		({ id, material }) => {
			setMaterialGood({
				id: id ?? null,
				material: material ?? null,
			});

			setIsEdit(true);

			toggle();
		},
		[toggle]
	);

	// Open modal add store good
	const handleMaterialGoodAdd = () => {
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
				Header: 'Материал',
				accessor: 'material',
				filterable: true,
				width: 70,
				Cell: (cellProps) => {
					return <Material {...cellProps} />;
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
										const materialGood = cellProps.row.original;
										handleMaterialGoodClick(materialGood);
									}}
								>
									<EditIcon id={`edittooltip-${cellProps.row.index}`} />
									<UncontrolledTooltip
										placement='top'
										target={`edittooltip-${cellProps.row.index}`}
									>
										Изменить материал
									</UncontrolledTooltip>
								</li>
							</ul>
						</div>
					);
				},
			},
		],
		[handleMaterialGoodClick]
	);

	return (
		<div className='page-content'>
			<div className='container-fluid'>
				<Breadcrumbs
					title='Материал'
					breadcrumbItem='Материал'
					addButtonLabel='Создать материал'
					onClick={handleMaterialGoodAdd}
				/>
				<Row>
					<Col xs='12'>
						<Card>
							<CardBody>
								{loading && <Loader />}
								{!loading && materialsGoods?.length > 0 && (
									<TableContainer
										columns={columns}
										data={materialsGoods}
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
						{!!isEdit ? 'Изменить материал' : 'Создать материал'}
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
											Название материала
										</Label>
										<Input
											name='material'
											type='text'
											onChange={validation.handleChange}
											onBlur={validation.handleBlur}
											value={validation.values.material || ''}
											invalid={
												validation.touched.material &&
												validation.errors.material
													? true
													: false
											}
										/>
										{validation.touched.material &&
										validation.errors.material ? (
											<FormFeedback type='invalid'>
												{validation.errors.material}
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

export default StoreGoodsMaterial;
