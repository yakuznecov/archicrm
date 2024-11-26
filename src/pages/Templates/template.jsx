// Шаблон, создание
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Breadcrumbs from '@/components/Common/Breadcrumb';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useFieldsStore, useTemplatesStore } from '@/storeZustand';

import {
	Table,
	Col,
	Row,
	Card,
	CardBody,
	Form,
	Input,
	Label,
	FormFeedback,
	Button,
	Fade,
} from 'reactstrap';

const Template = () => {
	const [name, setName] = useState('');
	const [minLength, setMinLength] = useState('');
	const [maxLength, setMaxLength] = useState('');
	const [type, setType] = useState('default');
	const [isRequired, setIsRequired] = useState(false);
	const [fields, setFields] = useState([]);

	// сохранение полей в массив и отображение в таблице
	const handleSave = () => {
		if (name !== '' && minLength !== '' && maxLength !== '') {
			const formData = {
				id: fields?.length + 1,
				name,
				type,
				min_length: minLength,
				max_length: maxLength,
				required: isRequired,
			};

			setFields((prevFields) => [...prevFields, formData]);
		}

		// Сброс значений
		setName('');
		setMinLength('');
		setMaxLength('');
		setType('default');
		setIsRequired(false);
	};

	// удаление созданных полей из локальной таблицы
	const handleDelete = (id) => {
		setFields((prevFields) => prevFields.filter((field) => field.id !== id));
	};

	// id созданных полей и добавление
	const [addField] = useFieldsStore(useShallow((state) => [state.addField]));

	// Добавление шаблона
	const [addTemplate] = useTemplatesStore(
		useShallow((state) => [state.addTemplate])
	);

	const handleAddTemplate = async (templateName, fieldsIds) => {
		const updatedTemplate = {
			name: templateName,
			fields: fieldsIds,
		};

		await addTemplate(updatedTemplate);
	};

	const handleSubmit = async (values) => {
		const fieldPromises = fields?.map(async (field) => {
			const newField = {
				name: field.name,
				type: field.type,
				min_length: field.min_length,
				max_length: field.max_length,
				required: field.required,
			};

			const fieldObj = await addField(newField);
			return fieldObj.id; // Собираем все id созданных полей
		});

		// Ожидание завершения всех асинхронных вызовов
		const resolvedFieldIds = await Promise.all(fieldPromises);

		await handleAddTemplate(values.templateName, resolvedFieldIds);
	};

	const validationSchema = Yup.object({
		templateName: Yup.string().required('Введите название шаблона'),
	});

	const initialValues = {
		// name: templateName || '',
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

	return (
		<div className='page-content'>
			<div className='container-fluid'>
				<Breadcrumbs title='Шаблон' breadcrumbItem='Создать шаблон документа' />
				<Form
					onSubmit={(e) => {
						e.preventDefault();
						validation.handleSubmit();
						return false;
					}}
				>
					<Row>
						<Col xs='9'>
							<Card>
								<CardBody>
									<Row className='mb-4 justify-content-between align-items-center'>
										<Col className='col-3'>
											<Label className='form-label archi-label'>
												Название шаблона
											</Label>
											<i className='bx bxs-star archi-star' />
											<Input
												name='templateName'
												type='text'
												onChange={validation.handleChange}
												onBlur={validation.handleBlur}
												value={validation.values.templateName || ''}
												invalid={
													validation.touched.templateName &&
													validation.errors.templateName
														? true
														: false
												}
											/>
											{validation.touched.templateName &&
											validation.errors.templateName ? (
												<FormFeedback type='invalid'>
													{validation.errors.templateName}
												</FormFeedback>
											) : null}
										</Col>
										<Col className='col-3'>
											<div className='text-end'>
												<button
													type='submit'
													className='archi__btn archi__btn-green'
												>
													Сохранить шаблон
												</button>
											</div>
										</Col>
									</Row>
									<div className='divider'></div>

									<div className='table-responsive mb-4'>
										{fields?.length > 0 && (
											<Table className='table table-striped mb-0'>
												<thead>
													<tr>
														<th style={{ color: '#6063aa' }}>Название поля</th>
														<th style={{ color: '#6063aa' }}>Мин. длина</th>
														<th style={{ color: '#6063aa' }}>Макс. длина</th>
														<th style={{ color: '#6063aa' }}>Тип поля</th>
														<th style={{ color: '#6063aa' }}>
															Обязательное поле
														</th>
													</tr>
												</thead>
												<tbody>
													{fields?.map(
														({
															id,
															name,
															min_length,
															max_length,
															type,
															required,
														}) => (
															// Плавное появление строки Fade
															<Fade tag='tr' key={id}>
																<th scope='row'>{name}</th>
																<th scope='row'>{min_length}</th>
																<th scope='row'>{max_length}</th>
																<th scope='row'>{type}</th>
																<th scope='row'>{required ? 'Да' : 'Нет'}</th>
																<th scope='row'>
																	<Button
																		type='button'
																		className='btn btn-danger btn-sm'
																		onClick={() => handleDelete(id)}
																	>
																		<i className='bx bx-trash'></i>
																	</Button>
																</th>
															</Fade>
														)
													)}
												</tbody>
											</Table>
										)}
									</div>

									<div>
										<Row className='mb-3'>
											<Col lg={2}>
												<label>Название поля</label>
												<input
													type='text'
													value={name}
													name='name_field'
													className='form-control'
													onChange={(e) => setName(e.target.value)}
												/>
											</Col>

											<Col lg={2}>
												<label>Мин. длина (число)</label>
												<input
													type='number'
													value={minLength}
													className='form-control'
													name='min_field'
													onChange={(e) => setMinLength(e.target.value)}
												/>
											</Col>

											<Col lg={2}>
												<label>Макс. длина (число)</label>
												<input
													type='number'
													value={maxLength}
													className='form-control'
													name='max_field'
													onChange={(e) => setMaxLength(e.target.value)}
												/>
											</Col>

											<Col lg={2}>
												<label>Тип поля</label>
												<select
													className='form-control'
													name='type_field'
													value={type}
													onChange={(e) => setType(e.target.value)}
												>
													<option value='default'>Выбрать</option>
													<option value='Строка'>Строка</option>
													<option value='Число'>Число</option>
													<option value='Чек-бокс'>Чекбокс</option>
													<option value='Дата'>Дата</option>
												</select>
											</Col>

											<Col lg={2} className='align-self-end'>
												<div className='form-check'>
													<Input
														type='checkbox'
														checked={isRequired}
														className='form-check-input'
														name='required_field'
														id='customCheck'
														onChange={(e) => setIsRequired(e.target.checked)}
													/>
													<Label
														className='form-check-label'
														htmlFor='customCheck'
													>
														Обязательное поле
													</Label>
												</div>
											</Col>

											<Col lg={2} className='align-self-end'>
												<Button onClick={handleSave} color='primary'>
													Сохранить поле
												</Button>
											</Col>
										</Row>
									</div>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Form>
			</div>
		</div>
	);
};

export default Template;
