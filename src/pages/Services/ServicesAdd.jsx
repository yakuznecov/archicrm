// ServicesAdd - Добавить услугу

import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Container, Form, Input, Label, Row } from 'reactstrap';
import Select from 'react-select';

//Import Breadcrumb
import Breadcrumbs from '@/components/Common/Breadcrumb';

const ServicesAdd = () => {
	const options = [
		{ value: 'AK', label: 'Стельки' },
		{ value: 'HI', label: 'Маникюр' },
		{ value: 'CA', label: 'Бады' },
		{ value: 'NV', label: 'Витамины' },
		{ value: 'OR', label: 'Косметика' },
		{ value: 'WA', label: 'Шапочки' },
	];

	return (
		<React.Fragment>
			<div className='page-content'>
				<Container fluid>
					<Breadcrumbs title='Услуги' breadcrumbItem='Добавить услугу' />
					<Row>
						<Col lg='12'>
							<div>
								<Card>
									<div className='text-dark'>
										<div className='p-4'>
											<div className='d-flex align-items-center'>
												<div className='flex-grow-1 overflow-hidden'>
													<h5 className='font-size-16 mb-1'>
														Информация об услуге
													</h5>
													<p className='text-muted text-truncate mb-0'>
														Заполните всю информацию ниже
													</p>
												</div>
											</div>
										</div>
									</div>
									<div className='p-4 border-top'>
										<Form>
											<div className='mb-3'>
												<Label htmlFor='servicename'>Название</Label>
												<Input
													id='servicename'
													name='servicename'
													type='text'
													className='form-control'
													placeholder='Введите название услуги'
												/>
											</div>
											<Row>
												<Col lg='4'>
													<div className='mb-3'>
														<Label htmlFor='price'>Стоимость</Label>
														<Input
															id='price'
															name='price'
															type='text'
															className='form-control'
															placeholder='Введите стоимость'
														/>
													</div>
												</Col>

												<Col lg='4'>
													<div className='mb-3'>
														<Label className='control-label'>Тип услуги</Label>
														<Select
															classNamePrefix='select2-selection'
															placeholder='Выбрать тип услуги'
															title='Country'
															options={options}
															isMulti
														/>
													</div>
												</Col>
											</Row>
											<div className='mb-0'>
												<Label htmlFor='productdesc'>Описание услуги</Label>
												<textarea
													className='form-control'
													id='productdesc'
													rows='4'
													placeholder='Добавьте описание'
												/>
											</div>
										</Form>
									</div>
								</Card>
							</div>
						</Col>
					</Row>
					<Row className='mb-4'>
						<div className='col ms-auto text-end'>
							<div className='d-flex flex-reverse flex-wrap gap-2'>
								<Link to='#' className='btn btn-danger'>
									{' '}
									<i className='uil uil-times me-1'></i> Отмена{' '}
								</Link>{' '}
								<Link to='#' className='btn btn-success'>
									{' '}
									<i className='uil uil-file-alt me-1'></i> Сохранить{' '}
								</Link>
							</div>
						</div>
					</Row>
				</Container>
			</div>
		</React.Fragment>
	);
};

export default ServicesAdd;
