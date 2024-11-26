// модальное окно изменения заявки
import React from 'react';
import { Modal, Form, Input, Row, Col, Select, Button } from 'antd';

const { TextArea } = Input;

const EditRequestModal = ({
	modal,
	form,
	onFinish,
	fields,
	cancelFormFields,
}) => {
	return (
		<Modal
			title='Изменить заявку'
			open={modal}
			width={450}
			footer={null}
			onCancel={cancelFormFields}
		>
			<Form fields={fields} onFinish={onFinish} autoComplete='off' form={form}>
				<div className='mb-3'>
					<label className='form-label'>Имя</label>
					<Form.Item
						name='name'
						rules={[
							{
								required: true,
								message: 'Введите имя!',
							},
						]}
					>
						<Input />
					</Form.Item>
				</div>
				<div className='mb-3'>
					<label className='form-label'>Телефон</label>
					<Form.Item
						name='phone'
						rules={[
							{
								required: true,
								message: 'Введите телефон!',
							},
						]}
					>
						<Input type='number' />
					</Form.Item>
				</div>
				<div className='mb-3'>
					<label className='form-label'>Email</label>
					<Form.Item name='email'>
						<Input />
					</Form.Item>
				</div>
				<div className='mb-3'>
					<label className='form-label archi-label'>Комментарий</label>
					<Form.Item name='notes'>
						<TextArea
							placeholder='Введите комментарий'
							autoSize={{
								minRows: 4,
								maxRows: 10,
							}}
						/>
					</Form.Item>
				</div>
				<Row gutter={8}>
					<Col span={12}>
						<label className='form-label'>Город</label>
						<Form.Item name='city'>
							<Input />
						</Form.Item>
					</Col>
					<Col span={12}>
						<label className='form-label'>Статус заявки</label>
						<Form.Item name='status'>
							<Select
								placeholder='Выберите статус заявки'
								style={{
									width: '100%',
								}}
								allowClear
								options={[
									{
										value: 1,
										label: 'Новая',
									},
									{
										value: 2,
										label: 'В работе',
									},
									{
										value: 3,
										label: 'Отработана',
									},
									{
										value: 4,
										label: 'Спам',
									},
									{
										value: 5,
										label: 'Перезвонить',
									},
									{
										value: 6,
										label: 'Для обзвона',
									},
								]}
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
	);
};

export default EditRequestModal;
