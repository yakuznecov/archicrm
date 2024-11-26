import React, { useEffect, useMemo, useState, useCallback } from 'react';
import TableContainer from '@/components/Common/TableContainer';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Breadcrumbs from '@/components/Common/Breadcrumb';
import { Id, Name } from '@/helpers/Table/check_value';

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

const StoreGoodsName = () => {
	// Получение названия товара
	// const storeGoodsName = useSelector((state) => state.namesGoods.namesGoods);

	const [modal, setModal] = useState(false);
	const [isEdit, setIsEdit] = useState(false);

	const [nameGood, setNameGood] = useState({});

	// Получение наименований
	useEffect(() => {
		// dispatch(getNamesGoods());
	}, []);

	const handleEditSubmit = (values) => {
		// const id = nameGood?.id ?? 0;

		// const changedNameGood = {
		// 	name: values.name,
		// };
		// dispatch(updateNamesGoods({ changedNameGood, id }));
		validation.resetForm();
	};

	const handleAddSubmit = (values) => {
		const newNameGood = {
			name: values.name,
		};
		// dispatch(addNamesGoods(newNameGood));
		validation.resetForm();
	};

	const validationSchema = Yup.object({
		name: Yup.string().required('Пожалуйста, введите название'),
	});

	const initialValues = {
		name: nameGood?.name ?? '',
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
			setNameGood(null);
		} else {
			setModal(true);
		}
	}, [modal]);

	// Получение данных о товаре из строки
	const handleNameGoodClick = useCallback(
		({ id, name }) => {
			setNameGood({
				id: id ?? null,
				name: name ?? null,
			});

			setIsEdit(true);

			toggle();
		},
		[toggle]
	);

	// Open modal add store good
	const handleNameGoodAdd = () => {
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
				accessor: 'name',
				filterable: true,
				width: 100,
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
								{/* edit name */}
								<li
									className='list-inline-item text-primary cursor-pointer'
									onClick={() => {
										const nameGood = cellProps.row.original;
										handleNameGoodClick(nameGood);
									}}
								>
									<EditIcon id={`edittooltip-${cellProps.row.index}`} />
									<UncontrolledTooltip
										placement='top'
										target={`edittooltip-${cellProps.row.index}`}
									>
										Изменить название
									</UncontrolledTooltip>
								</li>
							</ul>
						</div>
					);
				},
			},
		],
		[handleNameGoodClick]
	);

	const storeGoodsName = [];

	return (
		<div className='page-content'>
			<div className='container-fluid'>
				<Breadcrumbs
					title='Наименование товара'
					breadcrumbItem='Наименование товара'
					addButtonLabel='Создать наименование'
					onClick={handleNameGoodAdd}
				/>
				<Row>
					<Col xs='12'>
						<Card>
							<CardBody>
								{/* {status === 'loading' && <Loader />} */}
								{storeGoodsName?.length > 0 && (
									<TableContainer
										columns={columns}
										data={storeGoodsName}
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
						{!!isEdit ? 'Изменить название' : 'Создать название'}
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
											Наименование материала
										</Label>
										<Input
											name='name'
											type='text'
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

export default StoreGoodsName;
