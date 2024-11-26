// модальное окно добавления адреса
import React from 'react';
import { Modal, Form, Input, Row, Col, Button } from 'antd';
import StarIcon from '../Icons/StarIcon';
import CompanyAddressRadio from '@/components/Common/Radio/CompanyAddressRadio'; // Подставьте свой путь к компоненту с радиокнопками

const AddressModal = ({
	open,
	onCancel,
	onFinish,
	form,
	isEdit,
	singleCompanyAddress,
	selectedType,
	handleOptionChange,
}) => {
	return (
		<Modal
			open={open}
			width={600}
			footer={null}
			onCancel={onCancel}
			title={!!isEdit ? 'Изменить адрес компании' : 'Создать адрес компании'}
		>
			<Form
				fields={[
					{
						name: ['address'],
						value: singleCompanyAddress?.name,
					},
				]}
				onFinish={onFinish}
				autoComplete='off'
				form={form}
			>
				<Row className='mb-2'>
					<Col span={24}>
						<label className='form-label archi-label'>Адрес компании</label>
						<StarIcon />
						<Form.Item
							name='address'
							rules={[
								{
									required: true,
									message: 'Введите адрес!',
								},
							]}
						>
							<Input />
						</Form.Item>
					</Col>
				</Row>

				{/* Выбор типа адреса компании */}
				<CompanyAddressRadio
					selectedType={selectedType}
					handleOptionChange={handleOptionChange}
				/>

				<Row className='justify-content-end'>
					<div className='text-end'>
						<Form.Item noStyle={true}>
							<Button type='primary' htmlType='submit'>
								{isEdit ? 'Обновить адрес' : 'Сохранить адрес'}
							</Button>
						</Form.Item>
					</div>
				</Row>
			</Form>
		</Modal>
	);
};

export default AddressModal;
