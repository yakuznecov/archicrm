// Таблица начала рабочего времени
import React, { useEffect, useMemo, useCallback } from 'react';
import { Col, Row, Card, Table, Button, Modal, Form, Input } from 'antd';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useStaffStore,
	useWorkingPeriodStore,
	useUserStore,
} from '@/storeZustand';

import { useStaffFields, useToggle } from '@/hooks';
import { DataFilter } from '@/containers';
import Loader from '@/components/Common/Loader';

// icons
import EditIcon from '@/components/Common/Icons/EditIcon';

const StartTimeTable = () => {
	// Фильтр даты и выбор департамента
	const { filteredWorkingPeriod } = DataFilter();
	const [form] = Form.useForm();

	const [modalStaff, toggleModalStaff] = useToggle(false); // модальное окно времени начала работы

	// Загрузка данных текущего пользователя
	const [isCallCenter] = useUserStore(
		useShallow((state) => [state.isCallCenter])
	);

	// Получение сотрудников по группе sanatera и департаменту
	const [
		staffList,
		getStaffByGroup,
		loadingStaff,
		getStaffByGroupSingle,
		singleStaff,
		loadingCallcenter,
		staffCallcenter,
		getStaffByCallcenter, // получить сотрудников callcenter
	] = useStaffStore(
		useShallow((state) => [
			state.staffList,
			state.getStaffByGroup,
			state.loadingStaff,
			state.getStaffByGroupSingle,
			state.singleStaff, // один сотрудник при установке времени начала
			state.loadingCallcenter,
			state.staffCallcenter,
			state.getStaffByCallcenter,
		])
	);

	// Данные о рабочем периоде
	const [getWorkingPeriod, addWorkingPeriod] = useWorkingPeriodStore(
		useShallow((state) => [state.getWorkingPeriod, state.addWorkingPeriod])
	);

	// Загрузка данных рабочего времени и бонусов
	useEffect(() => {
		isCallCenter
			? getStaffByCallcenter()
			: getStaffByGroup(filteredWorkingPeriod?.department_id);
	}, [filteredWorkingPeriod.date, filteredWorkingPeriod.department_id]);

	const staffArray = isCallCenter ? staffCallcenter : staffList;

	const fields = useStaffFields(singleStaff); // поля для формы

	// Добавляет начало рабочего времени сотрудника
	const onFinish = async (values) => {
		const newWorkingPeriod = {
			start_date_time: values.start_date_time,
			staff: singleStaff?.id,
		};

		await addWorkingPeriod(newWorkingPeriod);
		await getWorkingPeriod(filteredWorkingPeriod);
		toggleModalStaff();
	};

	// Информация о конкретном сотруднике из группы sanatera
	const handleCellClick = useCallback((id) => {
		getStaffByGroupSingle(id); // запрос по id данных сотрудника
		toggleModalStaff();
	}, []);

	const cancelFormFields = () => {
		toggleModalStaff();
		form.resetFields();
	};

	const columns = useMemo(
		() => [
			{
				title: 'Фамилия',
				dataIndex: 'surname',
				key: 'surname',
			},
			{
				title: 'Имя',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: 'Время',
				key: 'action',
				render: (text) => {
					const { id } = text;

					return (
						<div className='d-flex gap-3 users justify-content-center'>
							<ul className='list-inline font-size-20 contact-links mb-0'>
								{/* редактировать адрес */}
								<li
									className='list-inline-item text-primary cursor-pointer'
									onClick={() => {
										handleCellClick(id);
									}}
								>
									<EditIcon id={`editicon-${id}`} />
								</li>
							</ul>
						</div>
					);
				},
			},
		],
		[handleCellClick]
	);

	return (
		<>
			<Card title='Начало рабочего времени'>
				{isCallCenter ? loadingCallcenter : loadingStaff && <Loader />}
				{!loadingStaff && !loadingCallcenter && staffArray?.length > 0 && (
					<Table
						columns={columns}
						dataSource={staffArray}
						size='small'
						pagination={false}
						rowKey={(row) => row?.id}
					/>
				)}
			</Card>
			<Modal
				title='Установить время начала работы'
				open={modalStaff}
				onCancel={cancelFormFields}
				width={540}
				footer={null}
			>
				<Form
					fields={fields}
					onFinish={onFinish}
					autoComplete='off'
					form={form}
				>
					<Row gutter={16}>
						<Col span={8}>
							<label className='form-label archi-label'>Фамилия</label>
							<Form.Item name='surname'>
								<Input />
							</Form.Item>
						</Col>
						<Col span={8}>
							<label className='form-label archi-label'>Имя</label>
							<Form.Item name='name'>
								<Input />
							</Form.Item>
						</Col>
						<Col span={8}>
							<label className='form-label archi-label'>Время начала</label>
							<Form.Item
								name='start_date_time'
								rules={[
									{
										required: true,
										message: 'Введите время начала!',
									},
								]}
							>
								<Input
									type='datetime-local'
									min='1900-01-01'
									max='2100-01-01'
								/>
							</Form.Item>
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

export default StartTimeTable;
