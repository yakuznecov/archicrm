import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Tooltip } from 'antd';
import { formatDate } from '@/helpers/Date/formatDate';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useSubscriptionsStore } from '@/storeZustand';

import { patchCustomer } from '@/services/customers';

// icons
import saveIcon from '@/assets/images/save/save-comment.svg';

import {
	Modal,
	ModalHeader,
	ModalBody,
	Row,
	Col,
	Card,
	CardBody,
	Nav,
	NavItem,
	NavLink,
	TabContent,
	TabPane,
	Table,
} from 'reactstrap';

const CustomerProfileModal = ({
	isOpen,
	toggleModal,
	customerData,
	customerBookings,
}) => {
	const [activeTabJustify, setactiveTabJustify] = useState('6');
	const [descriptionValue, setDescriptionValue] = useState(
		customerData?.description
	); // комментарий у клиента
	const dateBirth = customerData?.dob
		? formatDate(customerData?.dob)
		: 'Не указана';

	useEffect(() => {
		setDescriptionValue(customerData?.description);
	}, [customerData?.description]);

	// Абонементы
	const [subscriptionsList] = useSubscriptionsStore(
		useShallow((state) => [state.subscriptionsList])
	);

	// не показываем отмененные записи
	const filteredCustomerBookings = customerBookings?.filter(
		(booking) => booking.status !== 'Отмена'
	);

	// tabs toggle
	function toggleCustomJustified(tab) {
		if (activeTabJustify !== tab) {
			setactiveTabJustify(tab);
		}
	}

	// Обновление комментария
	const handleUpdateDescription = async () => {
		const id = customerData.id;
		const data = {
			description: descriptionValue,
		};

		await patchCustomer({ id, data });
	};

	return (
		<Modal size='xl' isOpen={isOpen} toggle={toggleModal}>
			<ModalHeader toggle={toggleModal} tag='h3'>
				Карточка клиента
			</ModalHeader>
			<ModalBody>
				<Row className='mb-5'>
					<Col className='col-3'>
						<div>
							<h6 className='fw-bold'>ФИО</h6>
							<h6 className='profile__card_title'>{`
              ${customerData?.surname || ''} ${customerData?.name || ''} ${
								customerData?.secondname || ''
							}
              `}</h6>
						</div>
					</Col>
					<Col className='col-2'>
						<div>
							<h6 className='fw-bold'>Основной телефон</h6>
							<h6 className='profile__card_title'>
								{customerData?.phone || ''}
							</h6>
						</div>
					</Col>
					{/* <Col className="col-2">
						<div>
							<h6 className="fw-bold">Email</h6>
							<h6 className="profile__card_title">{customerData?.email || 'Не указан'}</h6>
						</div>
					</Col> */}
					<Col className='col-2'>
						<div>
							<h6 className='fw-bold'>Дата рождения</h6>
							<h6 className='profile__card_title'>{dateBirth}</h6>
						</div>
					</Col>
					<Col className='col-5'>
						<Row className='align-items-center'>
							<Col className='col-10'>
								<textarea
									name='description'
									className='input-large form-control'
									rows='2'
									placeholder='Введите комментарий ...'
									value={descriptionValue}
									onChange={(e) => setDescriptionValue(e.target.value)}
								/>
							</Col>
							<Col className='col-2'>
								<span
									className='cursor-pointer'
									id='saveTooltip'
									onClick={handleUpdateDescription}
								>
									<Tooltip title='Сохранить'>
										<span>
											<img src={saveIcon} alt='save' width={40} height={40} />
										</span>
									</Tooltip>
								</span>
							</Col>
						</Row>
						{/* <div>
							<h6 className="fw-bold">Комментарий</h6>
							<h6 className="profile__card_title">{customerData?.description || 'Нет'}</h6>
						</div> */}
					</Col>
				</Row>
				<Row>
					<Card>
						<CardBody>
							<Nav tabs className='archi__nav_tabs nav-justified'>
								<NavItem>
									<NavLink
										style={{ cursor: 'pointer' }}
										className={cn({
											active: activeTabJustify === '6',
										})}
										onClick={() => {
											toggleCustomJustified('6');
										}}
									>
										<span className='d-block d-sm-none'>
											<i className='far fa-user'></i>
										</span>
										<span className='d-none d-sm-block'>Приёмы</span>
									</NavLink>
								</NavItem>

								<NavItem>
									<NavLink
										style={{ cursor: 'pointer' }}
										className={cn({
											active: activeTabJustify === '8',
										})}
										onClick={() => {
											toggleCustomJustified('8');
										}}
									>
										<span className='d-block d-sm-none'>
											<i className='fas fa-cog'></i>
										</span>
										<span className='d-none d-sm-block'>Абонементы</span>
									</NavLink>
								</NavItem>
							</Nav>

							<TabContent activeTab={activeTabJustify}>
								<TabPane tabId='5' className='p-3'>
									<p className='mb-0'>
										Lorem ipsum dolor sit amet consectetur adipisicing elit.
										Ipsum, repellendus sequi officia aliquid dignissimos omnis
										temporibus harum beatae, consectetur debitis dolorum ab
										numquam a illum rerum! Dolores delectus earum quos!
									</p>
								</TabPane>
								<TabPane tabId='6' className='p-3'>
									{/* {status === 'loading' && <Loader />} */}
									{filteredCustomerBookings &&
										filteredCustomerBookings?.length > 0 && (
											<div className='table-responsive'>
												<Table className='table table-striped mb-0'>
													<thead>
														<tr>
															<th>ID</th>
															<th>Услуга</th>
															<th>Специалист</th>
															<th>Стоимость</th>
															<th>Департамент</th>
															<th>Дата</th>
														</tr>
													</thead>
													<tbody>
														{filteredCustomerBookings?.map(
															({
																id,
																service,
																worker,
																service_price,
																booking_date,
																department,
															}) => (
																<tr key={id}>
																	<th scope='row' style={{ color: '#f39b38' }}>
																		{id}
																	</th>
																	<td style={{ color: '#6063aa' }}>
																		{service[0]?.name}
																	</td>
																	<td
																		style={{ color: '#6063aa' }}
																	>{`${worker?.name} ${worker?.surname}`}</td>
																	<td style={{ color: '#6063aa' }}>
																		{service_price}
																	</td>
																	<td
																		style={{
																			color: '#4eb47f',
																			fontWeight: 'bold',
																		}}
																	>
																		{department?.name}
																	</td>
																	<td
																		style={{
																			color: '#ee7269',
																			fontWeight: 'bold',
																		}}
																	>
																		{formatDate(booking_date)}
																	</td>
																</tr>
															)
														)}
													</tbody>
												</Table>
											</div>
										)}
								</TabPane>

								<TabPane tabId='8' className='p-3'>
									<div className='table-responsive'>
										<Table className='table table-striped mb-0'>
											<thead>
												<tr>
													<th>ID</th>
													<th>Услуга</th>
													<th>Ост. посещ.</th>
													<th>Департамент</th>
													<th>Стоимость</th>
													<th>Кол-во мес.</th>
													<th>Статус</th>
													<th>Дата создания</th>
												</tr>
											</thead>
											<tbody>
												{subscriptionsList?.map(
													({
														id,
														department,
														type,
														count,
														status,
														date_created,
													}) => (
														<tr key={id}>
															<th scope='row' style={{ color: '#f39b38' }}>
																{id}
															</th>
															<td
																style={{ color: '#6063aa' }}
															>{`${type?.name}`}</td>
															<td style={{ color: '#6063aa' }}>{`${count}`}</td>
															<td style={{ color: '#6063aa' }}>
																{department?.name}
															</td>
															<td style={{ color: '#6063aa' }}>
																{type?.price}
															</td>
															<td
																style={{
																	color: '#6063aa',
																}}
															>
																{type?.month}
															</td>
															<td
																style={{
																	color: '#4eb47f',
																	fontWeight: 'bold',
																}}
															>
																{status}
															</td>
															<td
																style={{
																	color: '#ee7269',
																	fontWeight: 'bold',
																}}
															>
																{formatDate(date_created)}
															</td>
														</tr>
													)
												)}
											</tbody>
										</Table>
									</div>
								</TabPane>
							</TabContent>
						</CardBody>
					</Card>
				</Row>
			</ModalBody>
		</Modal>
	);
};

export default CustomerProfileModal;
