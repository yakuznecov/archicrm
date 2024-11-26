import React, { useEffect, useMemo, useState, useCallback } from 'react';
import TableContainer from '@/components/Common/TableContainer';
import Loader from '@/components/Common/Loader';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { useShallow } from 'zustand/react/shallow';
import { useSizeGoodsStore } from '@/storeZustand';

import Breadcrumbs from '@/components/Common/Breadcrumb';
import { Id, Size } from '@/helpers/Table/check_value';

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

const StoreGoodsSize = () => {
	const [sizeGoods, loading, getSizeGoods, addSizeGood, updateSizeGood] =
		useSizeGoodsStore(
			useShallow((state) => [
				state.sizeGoods,
				state.loading,
				state.getSizeGoods,
				state.addSizeGood,
				state.updateSizeGood,
			])
		);

	const [modal, setModal] = useState(false);
	const [isEdit, setIsEdit] = useState(false);

	const [sizeGood, setSizeGood] = useState({});

	// Получение количества товаров
	useEffect(() => {
		getSizeGoods();
	}, []);

	// обновление размера
	const handleSubmit = async (values, isEdit) => {
		const id = sizeGood?.id ?? 0;

		const changedSizeGood = {
			size: values.size,
		};

		if (isEdit) {
			await updateSizeGood({ id, changedSizeGood });
		} else {
			await addSizeGood(changedSizeGood);
		}

		getSizeGoods();
		validation.resetForm();
	};

	const validationSchema = Yup.object({
		size: Yup.string().required('Пожалуйста, введите количество'),
	});

	const initialValues = {
		size: sizeGood?.size ?? '',
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
			setSizeGood(null);
		} else {
			setModal(true);
		}
	}, [modal]);

	// Добавить размер товара
	const handleSizeGoodAdd = () => {
		setIsEdit(false);
		toggle();
	};

	// Получение данных о товаре из строки
	const handleSizeGoodClick = useCallback(
		({ id, size }) => {
			setSizeGood({
				id: id ?? null,
				size: size ?? null,
			});

			setIsEdit(true);

			toggle();
		},
		[toggle]
	);

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
				Header: 'Кол-во',
				accessor: 'size',
				filterable: true,
				width: 100,
				Cell: (cellProps) => {
					return <Size {...cellProps} />;
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
										const sizeGood = cellProps.row.original;
										handleSizeGoodClick(sizeGood);
									}}
								>
									<EditIcon id={`edittooltip-${cellProps.row.index}`} />
									<UncontrolledTooltip
										placement='top'
										target={`edittooltip-${cellProps.row.index}`}
									>
										Изменить кол-во
									</UncontrolledTooltip>
								</li>
							</ul>
						</div>
					);
				},
			},
		],
		[handleSizeGoodClick]
	);

	return (
		<div className='page-content'>
			<div className='container-fluid'>
				<Breadcrumbs
					title='Количество'
					breadcrumbItem='Количество'
					addButtonLabel='Создать количество'
					onClick={handleSizeGoodAdd}
				/>
				<Row>
					<Col xs='12'>
						<Card>
							<CardBody>
								{loading && <Loader />}
								{!loading && sizeGoods?.length > 0 && (
									<TableContainer
										columns={columns}
										data={sizeGoods}
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
						{!!isEdit ? 'Изменить количество' : 'Создать количество'}
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
										<Label className='form-label archi-label'>Количество</Label>
										<Input
											name='size'
											type='text'
											onChange={validation.handleChange}
											onBlur={validation.handleBlur}
											value={validation.values.size || ''}
											invalid={
												validation.touched.size && validation.errors.size
													? true
													: false
											}
										/>
										{validation.touched.size && validation.errors.size ? (
											<FormFeedback type='invalid'>
												{validation.errors.size}
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

export default StoreGoodsSize;
