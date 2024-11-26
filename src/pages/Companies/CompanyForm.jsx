// форма при создании и редактировании компании
import React from 'react';
import { Form, Row, Col, Input, Button } from 'antd';
import SelectCompanyAddress from './SelectCompanyAddress';
import StarIcon from '@/components/Common/Icons/StarIcon';
import { CommonSelect } from '@/components';

const CompanyForm = ({
	fields,
	onFinish,
	form,
	selectedTypeCompany,
	setSelectedTypeCompany,
	companyTypes,
	companyAddressList,
	selectedAddresses,
	setSelectedAddresses,
	toggleModal,
	loadingBtn,
	isEdit,
}) => {
	return (
		<Form fields={fields} onFinish={onFinish} autoComplete='off' form={form}>
			<Row gutter={16}>
				<Col span={7}>
					<label className='form-label archi-label me-1'>
						Сокращенное имя компании
					</label>
					<StarIcon />
					<Form.Item
						name='name'
						rules={[
							{
								required: true,
								message: 'Пожалуйста, введите имя компании!',
							},
						]}
					>
						<Input />
					</Form.Item>
				</Col>
				<Col span={5}>
					<label className='form-label archi-label'>Лейбл для компании</label>
					<Form.Item name='label'>
						<Input />
					</Form.Item>
				</Col>
				<Col span={3}>
					<label className='form-label archi-label'>Тип компании</label>
					<CommonSelect
						options={companyTypes}
						value={selectedTypeCompany}
						onChange={setSelectedTypeCompany}
					/>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={12}>
					<label className='form-label archi-label me-1'>
						Полное имя компании
					</label>
					<StarIcon />
					<Form.Item
						name='long_main_name'
						rules={[
							{
								required: true,
								message: 'Пожалуйста, введите полное имя компании!',
							},
						]}
					>
						<Input />
					</Form.Item>
				</Col>
				<Col span={12}>
					<label className='form-label archi-label me-1'>
						Полное имя компании (род. падеж. Чего?)
					</label>
					<StarIcon />
					<Form.Item
						name='long_name'
						rules={[
							{
								required: true,
								message:
									'Пожалуйста, введите полное имя компании в род. падеже!',
							},
						]}
					>
						<Input />
					</Form.Item>
				</Col>
			</Row>

			<Row gutter={16}>
				<Col span={3}>
					<label className='form-label archi-label me-1'>Город</label>
					<StarIcon />
					<Form.Item name='city'>
						<Input />
					</Form.Item>
				</Col>
				<Col span={3}>
					<label className='form-label archi-label'>Телефон</label>
					<Form.Item name='phone'>
						<Input />
					</Form.Item>
				</Col>
				<Col span={4}>
					<label className='form-label archi-label me-1'>
						ФИО директ. (инициалы)
					</label>
					<StarIcon />
					<Form.Item
						name='director'
						rules={[
							{
								required: true,
								message: 'Введите ФИО директора!',
							},
						]}
					>
						<Input />
					</Form.Item>
				</Col>
				<Col span={7}>
					<label className='form-label archi-label'>Полное ФИО директора</label>
					<Form.Item name='director_full_fio'>
						<Input />
					</Form.Item>
				</Col>
				<Col span={7}>
					<label className='form-label archi-label'>
						Полное ФИО директора (род. падеж. Кого?)
					</label>
					<Form.Item name='director_full_fio_rod_padeg'>
						<Input />
					</Form.Item>
				</Col>
			</Row>

			<Row gutter={16}>
				<Col span={7}>
					<label className='form-label archi-label'>
						Полное ФИО директора (дат. падеж. Кому?)
					</label>
					<Form.Item name='director_full_fio_dat_padeg'>
						<Input />
					</Form.Item>
				</Col>
				<Col span={5}>
					<label className='form-label archi-label me-1'>
						ФИО Главбуха (инициалы)
					</label>
					<StarIcon />
					<Form.Item
						name='buhgalter'
						rules={[
							{
								required: true,
								message: 'Введите ФИО Главбуха!',
							},
						]}
					>
						<Input />
					</Form.Item>
				</Col>
				<Col span={3}>
					<label className='form-label archi-label me-1'>ИНН</label>
					<StarIcon />
					<Form.Item
						name='inn'
						rules={[
							{
								required: true,
								message: 'Введите ИНН!',
							},
						]}
					>
						<Input />
					</Form.Item>
				</Col>
				<Col span={3}>
					<label className='form-label archi-label me-1'>КПП</label>
					<Form.Item name='kpp'>
						<Input />
					</Form.Item>
				</Col>
				<Col span={3}>
					<label className='form-label archi-label me-1'>ОГРН (ОГРНИП)</label>
					<StarIcon />
					<Form.Item
						name='ogrn'
						rules={[
							{
								required: true,
								message: 'Введите ОГРН!',
							},
						]}
					>
						<Input />
					</Form.Item>
				</Col>
				<Col span={3}>
					<label className='form-label archi-label me-1'>БИК</label>
					<StarIcon />
					<Form.Item
						name='bik'
						rules={[
							{
								required: true,
								message: 'Введите БИК!',
							},
						]}
					>
						<Input />
					</Form.Item>
				</Col>
			</Row>

			<Row gutter={16}>
				<Col span={7}>
					<label className='form-label archi-label me-1'>Имя банка</label>
					<StarIcon />
					<Form.Item
						name='bank_name'
						rules={[
							{
								required: true,
								message: 'Введите имя банка!',
							},
						]}
					>
						<Input />
					</Form.Item>
				</Col>
				<Col span={4}>
					<label className='form-label archi-label me-1'>Расчетный счет</label>
					<StarIcon />
					<Form.Item
						name='bank_account_number'
						rules={[
							{
								required: true,
								message: 'Введите расчетный счет!',
							},
						]}
					>
						<Input />
					</Form.Item>
				</Col>
				<Col span={4}>
					<label className='form-label archi-label me-1'>
						Корпоративный счет
					</label>
					<StarIcon />
					<Form.Item
						name='bank_account_number_corporate'
						rules={[
							{
								required: true,
								message: 'Введите корпоративный счет!',
							},
						]}
					>
						<Input />
					</Form.Item>
				</Col>
				{selectedTypeCompany === 'Собственная' && (
					<Col span={4}>
						<label className='form-label archi-label me-1'>ОКВЭД</label>
						<Form.Item
							name='okved'
							rules={[
								{
									required: true,
									message: 'Введите ОКВЭД!',
								},
							]}
						>
							<Input />
						</Form.Item>
					</Col>
				)}
			</Row>

			{/* Выбор адресов компании */}
			<div className='mb-3'>
				<SelectCompanyAddress
					selectedAddresses={selectedAddresses}
					setSelectedAddresses={setSelectedAddresses}
					companyAddressList={companyAddressList}
				/>
			</div>

			<Row className='justify-content-between'>
				{/* Кнопка создания адреса */}
				<Button type='dashed' onClick={toggleModal} className='fw-bold'>
					Создать адрес
				</Button>
				<div className='text-end'>
					<Form.Item noStyle>
						<Button type='primary' htmlType='submit' loading={loadingBtn}>
							{isEdit ? 'Обновить компанию' : 'Сохранить компанию'}
						</Button>
					</Form.Item>
				</div>
			</Row>
		</Form>
	);
};

export default CompanyForm;
