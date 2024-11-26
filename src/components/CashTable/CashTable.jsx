import React, { useEffect, useMemo, useState } from 'react';
import { Col, Row, Modal, Form, Input, Button, Radio, Table } from 'antd';
import { Toaster } from 'react-hot-toast'; // notifications

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useCashierStore,
	useDepartmentsStore,
	useUserStore,
	useDashboardStore,
	useBookingsStore,
} from '@/storeZustand';
import { addCashierRequest } from '@/services';
import { StatusCell, CashierTypeCell } from '@/helpers';
import { DataFilter } from '@/containers';
import Loader from '@/components/Common/Loader';
import CustomSelectCell from './CustomSelectCell';
import { formatDate } from '@/helpers/Date/formatDate';

const CashTable = ({ modal, toggle, isEdit }) => {
	const { TextArea } = Input;

	// Загрузка id сотрудника
	const [staffId] = useUserStore(useShallow((state) => [state.staffId]));

	// Панель статистики на главной
	const [getDashboard] = useDashboardStore(
		useShallow((state) => [state.getDashboard])
	);

	// Записи к специалистам
	const [bookings] = useBookingsStore(useShallow((state) => [state.bookings]));

	const { filteredData } = DataFilter();

	// Выбранный департамент
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	// Данные кассы
	const [cashList, getCashier, loading] = useCashierStore(
		useShallow((state) => [state.cashList, state.getCashier, state.loading])
	);

	// выбранный тип radio
	const [selectedType, setSelectedType] = useState(1);
	// console.log('selectedType >>>', selectedType);

	// Запрос финансовой статистики
	useEffect(() => {
		// получить массив id записей
		const idsBookings =
			bookings?.length > 0 && bookings.map((booking) => booking.id);

		const bookingsData = {
			booking_list: idsBookings ? idsBookings : [],
			department_id: selectedDepartment,
		};

		getDashboard(bookingsData);
	}, [cashList, selectedDepartment, bookings]);

	// get cashier
	useEffect(() => {
		getCashier(filteredData);
	}, [selectedDepartment, filteredData.start_date]);

	const handleOptionChange = (event) => {
		setSelectedType(event.target.value);
	};

	// Добавление оплаты
	const onFinish = async (values) => {
		// если приход, то оплата сразу, иначе подтверждение
		const cashierStatus =
			Number(selectedType) === 1 ? 'Одобрено' : 'В процессе';

		const newCashier = {
			amount: values.amount,
			type: Number(selectedType),
			status: cashierStatus,
			description: values.description,
			department: selectedDepartment,
			staff: staffId,
		};

		toggle();

		await addCashierRequest(newCashier);
		getCashier(filteredData);
	};

	const cancelFormFields = () => {
		toggle();
	};

	const columns = useMemo(
		() => [
			{
				title: 'ID',
				dataIndex: 'id',
				key: 'id',
			},
			{
				title: 'Департамент',
				dataIndex: 'department',
				key: 'department_name',
				render: (department) => department?.name,
			},
			{
				title: 'Сотрудник',
				dataIndex: 'staff',
				key: 'staff',
			},
			{
				title: 'Тип',
				dataIndex: 'type',
				key: 'type',
				render: (type) => <CashierTypeCell type={type} />,
			},
			{
				title: 'Сумма',
				dataIndex: 'amount',
				key: 'amount',
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
				dataIndex: 'status',
				key: 'status',
				render: (status) => <StatusCell value={status} />,
			},
			{
				title: 'Изменить статус',
				dataIndex: 'action',
				key: 'action',
				render: (_, record) => <CustomSelectCell value={record} />,
			},
		],
		[]
	);

	return (
		<>
			{loading && <Loader />}
			{!loading && cashList && cashList?.length > 0 && (
				<Table columns={columns} dataSource={cashList} pagination={false} />
			)}

			<Modal
				open={modal}
				title={!!isEdit ? 'Изменить данные' : 'Добавить приход / расход'}
				width={400}
				footer={null}
				onCancel={cancelFormFields}
			>
				<Form onFinish={onFinish} autoComplete='off'>
					<Row>
						<Col span={24}>
							<div className='mb-3 '>
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
							<div className='mb-3'>
								<Radio.Group
									size='large'
									onChange={handleOptionChange}
									value={selectedType}
								>
									<Radio value={1}>Приход</Radio>
									<Radio value={2}>Расход</Radio>
								</Radio.Group>
							</div>
							<div className='mb-3'>
								<label className='form-label archi-label'>Комментарий</label>
								<Form.Item
									name='description'
									rules={[
										{
											required: true,
											message: 'Введите сумму!',
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
					<Row>
						<Col>
							<div className='text-end'>
								<Form.Item noStyle={true}>
									<Button type='primary' htmlType='submit'>
										Сохранить
									</Button>
								</Form.Item>
							</div>
						</Col>
					</Row>
				</Form>
			</Modal>
			<div>
				<Toaster position='top-right' reverseOrder={true} />
			</div>
		</>
	);
};

export default CashTable;
