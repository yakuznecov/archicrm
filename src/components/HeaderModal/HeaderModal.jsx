import React from 'react';
import { Col, Row, Alert } from 'antd';
import { Form, Input, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';

import ProductCard from '@/components/Common/ProductCard';
import ArchiSelect from '@/components/Common/ArchiSelect';
import CustomDatePicker from '@/components/Common/CustomDatePicker';
import { ErrorFeedback } from '@/components';
import {
	useSubscriptionsByPhone,
	useIntlNumber,
	useCustomerSearch,
} from '@/hooks';

const HeaderModal = ({
	modal,
	toggle,
	isEdit,
	handleModalOpened,
	validation,
	isFormValid,
	staffData,
	servicesData,
	bookingStatusData,
	selectedSku,
	updateSelectedSku,
	handleSelectedSku,
	selectedServices,
	handleSelectedServices,
	selectedBookingStatus,
	handleSelectedStatus,
	selectedStaff,
	handleSelectedStaff,
	inputRef,
	updateSelectedAdditionalSales,
	selectedAdditionalSales,
	selectedFormSubPayment,
	sumCash,
	sumCard,
	skuData,
	handleRemoveItem,
	setButtonProductClicked,
	additionalSalesData,
	handleSelectedAdditionalSales,
	selectedCustomer,
	formPaymentData,
	formPaymentSubData,
	handleSelectedFormSubPayment,
	handleSumCash,
	handleSumCard,
	isAlertDanger,
	onChangeTime,
	subscriptionsNameData,
	handleSelectedSubscriptionName,
	selectedSubcriptionsName,
	setDescription,
	handleSumSubscriptions,
	sumSubscription,
	handleSumSubCash,
	sumSubCash,
	handleSumSubCard,
	sumSubCard,
	isCheckedVisit,
	setIsCheckedVisit,
	selectedFormPayment,
	handleOptionPayment,
	isPaymentStatusError,
}) => {
	const {
		subscriptionsByPhoneData,
		handleSelectedSubscriptionByPhone,
		selectedSubcription,
		singleVisit,
	} = useSubscriptionsByPhone(selectedCustomer.value);

	// Поиск клиента
	const { customersData, handleSelectedCustomer, setSearchInput } =
		useCustomerSearch();

	return (
		<Modal
			size='lg'
			isOpen={modal}
			toggle={toggle}
			onOpened={handleModalOpened}
		>
			<ModalHeader toggle={toggle} tag='h4'>
				{isEdit ? 'Редактировать запись' : 'Добавить запись'}
			</ModalHeader>
			<ModalBody>
				<Form
					onSubmit={(e) => {
						e.preventDefault();
						validation.handleSubmit();
						return false;
					}}
				>
					<Row gutter={16}>
						<Col span={12}>
							<div className='mb-3'>
								<label className='form-label archi-label'>Найти клиента</label>
								<Input
									innerRef={inputRef}
									name='search'
									type='number'
									onChange={(e) => setSearchInput(e.target.value)}
									placeholder='Введите номер ...'
								/>
							</div>

							<div className='mb-3'>
								<label className='form-label archi-label'>Выбрать SKU</label>
								<ArchiSelect
									isMulti={true}
									options={skuData}
									value={selectedSku}
									onChange={handleSelectedSku}
									className='main__select'
									classNamePrefix='main__select'
									placeholder={'Нажмите, чтобы выбрать'}
								/>
							</div>

							{selectedSku && (
								<div className='archi__cards_wrapper'>
									{selectedSku?.map((item) => (
										<ProductCard
											key={item.id}
											id={item.id}
											skuId={item.skuId}
											name={item.label}
											price={item.price}
											count={item.count}
											oldSku={item.oldSku}
											isSku
											updateSelected={updateSelectedSku}
											isEdit={isEdit}
											onRemoveItem={handleRemoveItem}
											setButtonProductClicked={setButtonProductClicked}
										/>
									))}
								</div>
							)}

							<div className='mb-3'>
								<label className='form-label archi-label'>
									Выбрать дополнительные услуги
								</label>
								<ArchiSelect
									isMulti={true}
									options={additionalSalesData}
									value={selectedAdditionalSales}
									onChange={handleSelectedAdditionalSales}
									className='main__select'
									classNamePrefix='main__select'
									placeholder={'Выбрать доп.услуги'}
									// isDisabled={isSelectDisabled}
								/>
							</div>
							{selectedAdditionalSales && (
								<div className='archi__cards_wrapper'>
									{selectedAdditionalSales?.map((item) => (
										<ProductCard
											key={item.id}
											id={item.id}
											salesId={item.salesId}
											oldSales={item.oldSales}
											name={item.label}
											price={item.price}
											count={item.count}
											updateSelected={updateSelectedAdditionalSales}
											isEdit={isEdit}
											onRemoveItem={handleRemoveItem}
											setButtonProductClicked={setButtonProductClicked}
										/>
									))}
								</div>
							)}

							<div className='archi__subcard'>
								<div className='mb-3'>
									<label className='form-label archi-label'>
										Абонементы клиента
									</label>
									<ArchiSelect
										options={subscriptionsByPhoneData}
										value={selectedSubcription}
										onChange={handleSelectedSubscriptionByPhone}
										className='main__select'
										classNamePrefix='main__select'
									/>
									{singleVisit?.count && (
										<div className='mt-2 d-flex align-items-center justify-content-between'>
											<span className='visitsText'>
												Осталось визитов: <span>{singleVisit?.count}</span>
											</span>
											<span className='visitsText'>
												Доплатить: <span>{singleVisit?.to_pay}</span>
											</span>
										</div>
									)}
								</div>

								<div className='mb-3'>
									<label className='form-label archi-label'>
										Создать абонемент
									</label>
									<ArchiSelect
										options={subscriptionsNameData}
										value={selectedSubcriptionsName}
										onChange={handleSelectedSubscriptionName}
										className='main__select'
										classNamePrefix='main__select'
										isClearable={true}
									/>
								</div>

								<div className='d-flex align-items-center mb-3'>
									<div className='w-100 me-2'>
										<label className='form-label archi-label'>
											Форма оплаты
										</label>
										<ArchiSelect
											options={formPaymentSubData}
											value={selectedFormSubPayment}
											onChange={handleSelectedFormSubPayment}
											className='main__select'
											classNamePrefix='main__select'
											placeholder={'Выбрать форму оплаты абонемента'}
										/>
									</div>

									{selectedFormSubPayment.value === 3 && (
										<>
											<div className='w-100 me-2'>
												<label className='form-label archi-label'>Нал</label>
												<Input
													name='cash'
													type='number'
													value={sumSubCash}
													onChange={handleSumSubCash}
												/>
											</div>
											<div className='w-100'>
												<label className='form-label archi-label'>Безнал</label>
												<Input
													name='card'
													type='number'
													value={sumSubCard}
													onChange={handleSumSubCard}
												/>
											</div>
										</>
									)}
								</div>

								<div className='mb-3'>
									<label className='form-label archi-label'>
										Введите сумму
									</label>
									<Input
										className='price-input'
										name='subprice'
										type='number'
										onChange={handleSumSubscriptions}
										value={sumSubscription}
									/>
								</div>

								<div className='form-check mb-4'>
									<input
										className='form-check-input'
										type='checkbox'
										value={isCheckedVisit}
										id='weekend'
										onChange={(event) =>
											setIsCheckedVisit(event.target.checked)
										}
									/>
									<label className='form-check-label' htmlFor='weekend'>
										Списать посещение после создания записи
									</label>
								</div>

								<div className='d-flex align-items-center mb-3'>
									<span className='archi__title'>
										Стоимость абонемента:{' '}
										<span className='archi__price'>
											{useIntlNumber(selectedSubcriptionsName?.price || 0)}
										</span>
									</span>
								</div>
							</div>
						</Col>
						<Col span={12}>
							<div className='mb-3'>
								<label className='form-label archi-label'>
									Найденный клиент
								</label>
								<ArchiSelect
									options={customersData}
									value={selectedCustomer}
									onChange={handleSelectedCustomer}
									className='main__select'
									classNamePrefix='main__select'
								/>
							</div>

							<div className='mb-3'>
								<label className='form-label archi-label'>
									Выбрать специалиста
								</label>
								<ArchiSelect
									options={staffData}
									value={selectedStaff}
									onChange={handleSelectedStaff}
									className='main__select'
									classNamePrefix='main__select'
								/>
							</div>

							<div className='mb-3'>
								<label className='form-label archi-label'>Выбрать услугу</label>
								<ArchiSelect
									isMulti={true}
									options={servicesData}
									value={selectedServices}
									onChange={handleSelectedServices}
									className='main__select'
									classNamePrefix='main__select'
									placeholder={'Нажмите, чтобы выбрать'}
									// isDisabled={isSelectDisabled}
								/>
							</div>

							{/* Дата и время */}
							<Row gutter={16} className='mb-3 align-items-center'>
								<Col span={24}>
									<label className='form-label archi-label'>Дата и время</label>
								</Col>
								<Col span={24} className='mb-1'>
									<CustomDatePicker
										selected={validation.values.datePickerValue}
										setDate={onChangeTime}
									/>
								</Col>
								{validation.errors.datePickerValue ? (
									<ErrorFeedback
										errorText={validation.errors.datePickerValue}
									/>
								) : null}

								{isAlertDanger && (
									<Alert
										message='К сожалению, данное время недоступно. Пожалуйста, выберите другое!'
										type='error'
										showIcon
									/>
								)}
							</Row>

							{/* Статус */}
							<div className='mb-3'>
								<label className='form-label archi-label'>Статус</label>
								<ArchiSelect
									options={bookingStatusData}
									value={selectedBookingStatus}
									onChange={handleSelectedStatus}
									className='main__select'
									classNamePrefix='main__select'
									placeholder={'Выбрать статус'}
									// isDisabled={isSelectDisabled}
								/>

								{isPaymentStatusError && (
									<Alert
										message="Статус 'Оплачено' доступен только сегодня!"
										type='error'
										showIcon
									/>
								)}
							</div>

							<label className='form-label archi-label'>Форма оплаты</label>
							<div className='mb-3 d-flex align-items-center gap-4'>
								<label className='d-flex align-items-center' check>
									<Input
										className='archi__radio _coming'
										type='radio'
										name='radioOption'
										value='1'
										checked={selectedFormPayment === '1'}
										onChange={handleOptionPayment}
									/>
									Нал
								</label>
								<label className='d-flex align-items-center' check>
									<Input
										className='archi__radio'
										type='radio'
										name='radioOption'
										value='2'
										checked={selectedFormPayment === '2'}
										onChange={handleOptionPayment}
									/>
									Безнал
								</label>
								<label className='d-flex align-items-center' check>
									<Input
										className='archi__radio _separate'
										type='radio'
										name='radioOption'
										value='3'
										checked={selectedFormPayment === '3'}
										onChange={handleOptionPayment}
									/>
									Разд.оплата
								</label>
							</div>

							{selectedFormPayment === '3' && (
								<div className='d-flex align-items-center mb-3'>
									<div className='w-100 me-2'>
										<label className='form-label archi-label'>Нал</label>
										<Input
											name='cash'
											type='number'
											value={sumCash}
											onChange={handleSumCash}
										/>
									</div>
									<div className='w-100'>
										<Label className='form-label archi-label'>Безнал</Label>
										<Input
											name='card'
											type='number'
											value={sumCard}
											onChange={handleSumCard}
										/>
									</div>
								</div>
							)}

							<div className='mb-3'>
								<label className='form-label archi-label'>Комментарий</label>
								<textarea
									name='description'
									className='input-large form-control'
									id='message'
									rows='4'
									placeholder='Введите комментарий ...'
									value={validation.values.description}
									onChange={(e) => setDescription(e.target.value)}
									onBlur={validation.handleBlur}
								/>
							</div>

							<div className='archi__card'>
								<span className='archi__title'>
									Итого:{' '}
									<span className='archi__price _red'>
										{useIntlNumber(Number(validation.values.price) || 0)}{' '}
									</span>
								</span>
							</div>
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<div className='text-end'>
								<button
									type='submit'
									className='archi__btn archi__btn-green'
									disabled={!isFormValid}
								>
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

export default HeaderModal;
