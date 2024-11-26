import React, { useEffect, useMemo, useCallback } from 'react';
import {
	Col,
	Row,
	Radio,
	Button,
	Tooltip,
	Modal,
	Form,
	Input,
	Table,
} from 'antd';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useUserStore, usePaymentsStore } from '@/storeZustand';

import { updatePayment } from '@/services';

import { useToggle, usePaymentsFields } from '@/hooks';

import {
	WorkerCell,
	CustomerCell,
	PaymentTypeCell,
	StatusCell,
} from '@/helpers';
import { DataFilter } from '@/containers';
import { formatDate, formatDateToIso } from '@/helpers/Date/formatDate';

import Loader from '@/components/Common/Loader';
import EditIcon from '@/components/Common/Icons/EditIcon';

const PaymentTable = () => {
	const [form] = Form.useForm();
	const { TextArea } = Input;

	// Загрузка данных суперюзера
	const [isSuperUser] = useUserStore(
		useShallow((state) => [state.isSuperUser])
	);

	// Список оплат записей
	const [getPayments, paymentsList, loading, paymentById, getPaymentById] =
		usePaymentsStore(
			useShallow((state) => [
				state.getPayments,
				state.paymentsList,
				state.loading,
				state.paymentById,
				state.getPaymentById,
			])
		);

	const { filteredData } = DataFilter();
	const currentDate = formatDateToIso(new Date());
	const fields = usePaymentsFields(paymentById); // поля при редактировании оплаты

	const [modal, toggleModal] = useToggle(false);

	// get payments
	useEffect(() => {
		if (filteredData?.department_id) {
			getPayments(filteredData);
		}
	}, [filteredData.start_date, filteredData.department_id]);

	const onFinish = async (values) => {
		const paymentId = paymentById ? paymentById?.id : null;

		const newUpdatePayment = {
			amount: values.amount,
			type: values.type,
			description: values.description,
			date_updated: currentDate,
			department: paymentById.department.id,
			staff: paymentById.staff.id,
			booking: paymentById.booking.id,
		};

		// обновление оплаты
		await updatePayment({ paymentId, newUpdatePayment });
		getPayments(filteredData);
		toggleModal();
	};

	// Получение данных о выбранной оплате
	const handleCellClick = useCallback(
		(id) => {
			getPaymentById(id);
			toggleModal();
		},
		[toggleModal]
	);

	// срабатывает при закрытии модалки
	const cancelFormFields = () => {
		toggleModal();
		form.resetFields();
	};

	const columns = useMemo(
		() => [
			{
				title: 'Клиент',
				dataIndex: 'booking',
				key: 'customer',
				className: 'fw-bold text-dark',
				render: (text) => <CustomerCell value={text.customer} />,
			},
			{
				title: 'Департамент',
				dataIndex: 'department',
				key: 'department_name',
				render: (text) => text.name,
			},
			{
				title: 'Сотрудник',
				dataIndex: 'staff',
				key: 'staff',
				render: (text) => <WorkerCell value={text} />,
			},
			{
				title: 'Тип',
				dataIndex: 'type',
				key: 'type',
				render: (text) => <PaymentTypeCell value={text} />,
			},
			{
				title: 'Сумма',
				dataIndex: 'amount',
				className: 'fw-bold text-danger',
				key: 'amount',
			},
			{
				title: 'Услуга',
				dataIndex: 'booking',
				key: 'service',
				render: (text) => text.service[0].name,
			},
			{
				title: 'Описание',
				dataIndex: 'description',
				key: 'description',
			},
			{
				title: 'Дата',
				dataIndex: 'date_created',
				key: 'date_created',
				render: (date) => formatDate(date),
			},
			{
				title: 'Статус',
				dataIndex: 'booking',
				key: 'status',
				render: (text) => <StatusCell value={text.status} />,
			},
			{
				title: 'Действие',
				render: (text) => {
					const { id } = text;

					return (
						<div className='d-flex gap-3 users justify-content-center'>
							{isSuperUser && (
								<ul className='d-flex justify-content-around list-inline font-size-20 contact-links mb-0 w-100'>
									<li
										className='list-inline-item cursor-pointer text-primary'
										onClick={() => {
											handleCellClick(id);
										}}
									>
										<Tooltip title='Изменить'>
											<span>
												<EditIcon id={`edittooltip-${id}`} />
											</span>
										</Tooltip>
									</li>
								</ul>
							)}
						</div>
					);
				},
			},
		],
		[handleCellClick]
	);

	return (
		<>
			{loading && <Loader />}
			{!loading && paymentsList && paymentsList?.length > 0 && (
				<Table
					columns={columns}
					dataSource={paymentsList}
					pagination={false}
					rowKey='id'
					size='small'
				/>
			)}

			<Modal
				title='Изменить данные оплаты'
				open={modal}
				width={400}
				footer={null}
				onCancel={cancelFormFields}
			>
				<Form
					fields={fields}
					onFinish={onFinish}
					autoComplete='off'
					form={form}
				>
					<Row>
						<Col span={24}>
							{/* Тип оплаты */}
							<Form.Item name='type'>
								<Radio.Group size='large'>
									<Radio value={1}>Наличные</Radio>
									<Radio value={2}>Безнал</Radio>
								</Radio.Group>
							</Form.Item>

							<div>
								<label className='form-label archi-label'>Сумма</label>
								<Form.Item
									name='amount'
									rules={[
										{
											required: true,
											message: 'Введите сумму!',
										},
									]}
								>
									<Input />
								</Form.Item>
							</div>

							<div>
								<label className='form-label archi-label'>Комментарий</label>
								<Form.Item
									name='description'
									rules={[
										{
											required: true,
											message: 'Введите комментарий!',
										},
									]}
								>
									<TextArea
										placeholder='Введите комментарий'
										autoSize={{
											minRows: 2,
											maxRows: 6,
										}}
									/>
								</Form.Item>
							</div>
						</Col>
					</Row>
					<div className='text-end'>
						<Form.Item noStyle={true}>
							<Button type='primary' htmlType='submit'>
								Сохранить
							</Button>
						</Form.Item>
					</div>
				</Form>
			</Modal>
		</>
	);
};

export default PaymentTable;
