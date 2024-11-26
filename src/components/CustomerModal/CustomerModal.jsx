// Customer modal
import React, { useState, useMemo } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import MainRadioButtons from '@/components/Common/MainRadioButtons';
import { customersClassesData } from '@/common/data/customersClassesData';
import { convertDate } from '@/helpers/Date/formatDate';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useCustomersStore } from '@/storeZustand';

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

const CustomerModal = ({ isOpen, toggle }) => {
	// Клиенты
	const [addCustomer] = useCustomersStore(
		useShallow((state) => [state.addCustomer])
	);

	const [customer, setCustomer] = useState([]);
	const [phone, setPhone] = useState('');
	const [selectedClass, setSelectedClass] = useState('1');

	const initialValues = useMemo(() => {
		return {
			surname: customer && customer.surname ? customer.surname : '',
			name: customer && customer.name ? customer.name : '',
			secondname: customer && customer.secondname ? customer.secondname : '',
			phone: phone ? phone : '',
			email: customer && customer.email ? customer.email : '',
			dateBirth: customer && customer.dateBirth ? customer.dateBirth : '',
		};
	}, [customer]);

	const validationSchema = Yup.object({
		name: Yup.string().required('Пожалуйста, введите имя'),
		dateBirth: Yup.string().required('Пожалуйста, введите дату рождения'),
	});

	const handleAddSubmit = (values) => {
		const newCustomer = {
			surname: values.surname,
			name: values.name,
			second_name: values.secondname,
			phone,
			email: values.email,
			dob: convertDate(values.dateBirth),
			customer_class: selectedClass === 'null' ? null : selectedClass,
		};

		addCustomer(newCustomer);
		validation.resetForm();
	};

	// validation
	const validation = useFormik({
		enableReinitialize: true,
		initialValues,
		validationSchema,
		onSubmit: (values) => {
			handleAddSubmit(values);
			toggle();
		},
	});

	const handleOnChangePhone = (value) => {
		setPhone(value);
	};

	// смена класса клиента
	const handleRadioChange = (event) => {
		const selectedElement = event.target.value;
		setSelectedClass(selectedElement);
	};

	return (
		<Modal isOpen={isOpen} toggle={toggle}>
			<ModalHeader toggle={toggle} tag='h4'>
				Добавить клиента
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
								<Label className='form-label'>Фамилия</Label>
								<Input
									name='surname'
									type='text'
									value={validation.values.surname ?? ''}
									onChange={validation.handleChange}
								/>
							</div>

							<div className='mb-3'>
								<Label className='form-label'>Имя</Label>
								<Input
									name='name'
									type='text'
									validate={{
										required: { value: true },
									}}
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

							<div className='mb-3'>
								<Label className='form-label'>Отчество</Label>
								<Input
									name='secondname'
									type='text'
									value={validation.values.secondname || ''}
									onChange={validation.handleChange}
								/>
							</div>

							<div className='mb-3'>
								<Label className='form-label'>Телефон</Label>
								<PhoneInput
									value={'+7 (9'}
									countryCodeEditable={false}
									disableDropdown={true}
									onChange={handleOnChangePhone}
								/>
							</div>

							<div className='mb-3'>
								<Label className='form-label'>Email</Label>
								<Input
									name='email'
									type='email'
									value={validation.values.email || ''}
									onChange={validation.handleChange}
								/>
							</div>

							<div className='mb-3'>
								<Label className='form-label'>Дата рождения</Label>
								<Input
									name='dateBirth'
									type='date'
									min='1900-01-01'
									max='2100-12-31'
									validate={{
										required: { value: true },
									}}
									value={validation.values.dateBirth || ''}
									onChange={validation.handleChange}
									onBlur={validation.handleBlur}
									invalid={
										validation.touched.dateBirth && validation.errors.dateBirth
											? true
											: false
									}
								/>
								{validation.touched.dateBirth && validation.errors.dateBirth ? (
									<FormFeedback type='invalid'>
										{validation.errors.dateBirth}
									</FormFeedback>
								) : null}
							</div>

							<div className='mb-3 margin-auto'>
								<MainRadioButtons
									radioOptions={customersClassesData}
									selectedRadio={selectedClass}
									setSelectedRadio={setSelectedClass}
									handleRadioChange={handleRadioChange}
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

export default CustomerModal;
