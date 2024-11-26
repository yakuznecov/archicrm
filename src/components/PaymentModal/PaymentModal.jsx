// Payment modal

import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useDepartmentsStore,
	useBookingsStore,
	useUserStore,
	usePaymentsStore,
} from '@/storeZustand';

import {
	Modal,
	ModalHeader,
	ModalBody,
	Row,
	Col,
	Form,
	Input,
	Label,
	FormFeedback,
} from 'reactstrap';

const PaymentModal = () => {
	// Загрузка данных сотрудника
	const [staffId] = useUserStore(useShallow((state) => [state.staffId]));

	// Состояние модального окна
	const [isModalOpen, setIsModalOpen] = usePaymentsStore(
		useShallow((state) => [state.isModalOpen, state.setIsModalOpen])
	);

	const [singleBooking] = useBookingsStore(
		useShallow((state) => [state.singleBooking])
	);

	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	); // Выбранный департамент

	const { id, service_price } = singleBooking;

	const [selectedType, setSelectedType] = useState('1');
	// console.log('selectedType >>>', selectedType);

	const handleOptionChange = (event) => {
		setSelectedType(event.target.value);
	};

	const togglePaymentModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	const initialValues = {
		amount: service_price || '',
		description: '',
	};

	const validationSchema = Yup.object({
		amount: Yup.string().required('Пожалуйста, введите сумму'),
	});

	const handleAddSubmit = (values) => {
		const newPayment = {
			amount: values.amount,
			type: selectedType,
			description: values.description,
			date_updated: new Date(),
			department: selectedDepartment,
			staff: staffId,
			booking: id,
		};

		validation.resetForm();
	};

	// validation
	const validation = useFormik({
		enableReinitialize: true,

		initialValues,
		validationSchema,
		onSubmit: (values) => {
			handleAddSubmit(values);

			togglePaymentModal();
		},
	});

	return (
		<Modal isOpen={isModalOpen} toggle={togglePaymentModal}>
			<ModalHeader toggle={togglePaymentModal} tag='h4'>
				Добавить оплату
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
								<Label className='form-label'>Сумма</Label>
								<Input
									name='amount'
									type='number'
									validate={{
										required: { value: true },
									}}
									onChange={validation.handleChange}
									onBlur={validation.handleBlur}
									value={validation.values.amount || ''}
									invalid={
										validation.touched.amount && validation.errors.amount
											? true
											: false
									}
								/>
								{validation.touched.amount && validation.errors.amount ? (
									<FormFeedback type='invalid'>
										{validation.errors.amount}
									</FormFeedback>
								) : null}
							</div>
							<div className='mb-5 d-flex align-items-center gap-4'>
								<Label className='d-flex align-items-center' check>
									<Input
										className='archi__radio _coming'
										type='radio'
										name='radioOption'
										value='1'
										checked={selectedType === '1'}
										onChange={handleOptionChange}
									/>
									Нал
								</Label>
								<Label className='d-flex align-items-center' check>
									<Input
										className='archi__radio'
										type='radio'
										name='radioOption'
										value='2'
										checked={selectedType === '2'}
										onChange={handleOptionChange}
									/>
									Безнал
								</Label>
							</div>
							<div className='mb-3'>
								<Label className='form-label archi-label'>Комментарий</Label>
								<textarea
									name='description'
									className='input-large form-control'
									id='message'
									rows='7'
									value={validation.values.description ?? ''}
									onChange={validation.handleChange}
								/>
							</div>
						</Col>
					</Row>
					<Row>
						<Col>
							<div className='text-end'>
								<button type='submit' className='archi__btn archi__btn-green'>
									Сохранить
								</button>
							</div>
						</Col>
					</Row>
				</Form>
			</ModalBody>
		</Modal>
	);
};

export default PaymentModal;
