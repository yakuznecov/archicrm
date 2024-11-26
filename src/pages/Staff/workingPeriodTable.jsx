// Таблица начала рабочего времени
import React, { useEffect, useMemo, useCallback } from 'react';
import { Col, Row, Card, Table, Button, Modal, Form, Input } from 'antd';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useWorkingPeriodStore, usePenaltyBonusStore } from '@/storeZustand';

import { useToggle, useWorkingPeriodFields } from '@/hooks';
import { DataFilter } from '@/containers';
import Loader from '@/components/Common/Loader';
import EditIcon from '@/components/Common/Icons/EditIcon';
import PenaltyStatusSelect from './PenaltyStatusSelect';
import { formatDateTime } from '@/helpers/Date/formatDate';

const WorkingPeriodTable = () => {
	// Фильтр даты и выбор департамента
	const { filteredWorkingPeriod } = DataFilter();
	const [form] = Form.useForm();

	const [modal, toggleModal] = useToggle(false);

	// Получение бонусов сотрудников
	const [penaltyBonusList, addPenaltyBonus, getPenaltyBonuses] =
		usePenaltyBonusStore(
			useShallow((state) => [
				state.penaltyBonusList,
				state.addPenaltyBonus,
				state.getPenaltyBonuses,
			])
		);

	// Данные о рабочем периоде
	const [
		loading,
		workingPeriodList,
		workingPeriodById, // данные конкретного сотрудника
		getWorkingPeriod,
		patchWorkingPeriod,
		getWorkingPeriodById,
	] = useWorkingPeriodStore(
		useShallow((state) => [
			state.loading,
			state.workingPeriodList,
			state.workingPeriodById,
			state.getWorkingPeriod,
			state.patchWorkingPeriod,
			state.getWorkingPeriodById,
		])
	);

	const fields = useWorkingPeriodFields(workingPeriodById);

	// Загрузка данных рабочего времени и бонусов
	useEffect(() => {
		getWorkingPeriod(filteredWorkingPeriod);
		getPenaltyBonuses(filteredWorkingPeriod); // загрузка бонусов
	}, [filteredWorkingPeriod.date, filteredWorkingPeriod.department_id]);

	const staffName = `${workingPeriodById?.staff?.name || ''} ${
		workingPeriodById?.staff?.surname || ''
	}`; // Данные сотрудника в модальном окне

	// Обновление данных о рабочем времени сотрудника
	const onFinish = async (values) => {
		const id = workingPeriodById?.id;

		const newWorkingPeriod = {
			start_date_time: values.start_date_time,
			finish_date_time: values.finish_date_time,
			total_hours_in_day: values.total_hours_in_day,
			bonus_per_day: values.bonus_per_day,
			description: values.description,
		};

		// данные для добавления бонуса
		const data = {
			amount: values.bonus_per_day,
			staff: workingPeriodById?.staff.id,
			date_of_payment: values.finish_date_time,
		};

		await patchWorkingPeriod({ id, newWorkingPeriod });
		await getWorkingPeriod(filteredWorkingPeriod);
		await addPenaltyBonus(data); // Добавить бонус
		await getPenaltyBonuses(filteredWorkingPeriod);
		toggleModal();
	};

	// Информация о конкретном сотруднике
	const handleCellClick = useCallback((id) => {
		getWorkingPeriodById(id); // запрос по id данных сотрудника
		toggleModal();
	}, []);

	const cancelFormFields = () => {
		toggleModal();
		form.resetFields();
	};

	const columns = useMemo(
		() => [
			{
				title: 'Фамилия',
				dataIndex: 'staff',
				key: 'staff',
				render: (staff) => staff?.surname,
			},
			{
				title: 'Имя',
				dataIndex: 'staff',
				key: 'staff',
				render: (staff) => staff?.name,
			},
			{
				title: 'Телефон',
				dataIndex: 'staff',
				key: 'staff',
				render: (staff) => staff?.mobile_phone,
			},
			{
				title: 'Время начала',
				dataIndex: 'start_date_time',
				key: 'start_date_time',
				render: (text) => {
					return formatDateTime(text);
				},
			},
			{
				title: 'Время оконч.',
				dataIndex: 'finish_date_time',
				key: 'finish_date_time',
				render: (text) => formatDateTime(text),
			},
			{
				title: 'Часы',
				dataIndex: 'total_hours_in_day',
				key: 'total_hours_in_day',
			},
			{
				title: 'Бонус',
				dataIndex: 'bonus_per_day',
				key: 'bonus_per_day',
			},
			{
				title: 'Описание',
				dataIndex: 'description',
				key: 'description',
			},
			{
				title: 'Изменить',
				key: 'action',
				render: (text) => {
					const { id } = text;

					return (
						<div className='d-flex gap-3 users justify-content-center'>
							<ul className='list-inline font-size-20 contact-links mb-0'>
								<li
									className='list-inline-item text-primary cursor-pointer'
									onClick={() => {
										handleCellClick(id);
									}}
								>
									<EditIcon id={`editworkingperiod-${id}`} />
								</li>
							</ul>
						</div>
					);
				},
			},
			{
				title: 'Изменить статус',
				render: (text) => <PenaltyStatusSelect text={text} />,
			},
		],
		[]
	);

	return (
		<>
			<Card title='Период работы сотрудников'>
				{loading && <Loader />}
				{!loading && workingPeriodList?.length > 0 && (
					<Table
						columns={columns}
						dataSource={workingPeriodList}
						size='small'
						pagination={false}
						rowKey={(row) => row?.id}
					/>
				)}
			</Card>
			<Modal
				open={modal}
				onCancel={cancelFormFields}
				title='Изменить данные'
				footer={null}
			>
				<Form
					fields={fields}
					onFinish={onFinish}
					autoComplete='off'
					form={form}
				>
					<h4>{staffName}</h4>
					<Row gutter={16}>
						<Col span={12}>
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
						<Col span={12}>
							<label className='form-label archi-label'>Время окончания</label>
							<Form.Item
								name='finish_date_time'
								rules={[
									{
										required: true,
										message: 'Введите время окончания!',
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
					<Row gutter={16}>
						<Col span={6}>
							<label className='form-label archi-label'>Часы</label>
							<Form.Item
								name='total_hours_in_day'
								rules={[
									{
										required: true,
										message: 'Введите кол-во часов!',
									},
								]}
							>
								<Input type='number' />
							</Form.Item>
						</Col>
						<Col span={6}>
							<label className='form-label archi-label'>Бонус</label>
							<Form.Item
								name='bonus_per_day'
								rules={[
									{
										required: true,
										message: 'Введите бонус!',
									},
								]}
							>
								<Input type='number' />
							</Form.Item>
						</Col>
						<Col span={12}>
							<label className='form-label archi-label'>Описание</label>
							<Form.Item
								name='description'
								rules={[
									{
										required: true,
										message: 'Введите описание!',
									},
								]}
							>
								<Input />
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

export default WorkingPeriodTable;
