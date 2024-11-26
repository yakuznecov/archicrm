// форма для создания нового клиента

import StarIcon from '@/components/Common/Icons/StarIcon';
import { Button, Col, Form, Input, Row } from 'antd';

export default function ClientTabForm({ fields, onFinish, form, isEdit }) {
	return (
		<Form fields={fields} onFinish={onFinish} autoComplete='off' form={form}>
			{/* Фамилия */}
			<Row gutter={16}>
				<Col span={12}>
					<label className='form-label archi-label me-1'>Фамилия</label>
					<StarIcon />
					<Form.Item
						name='last_name'
						rules={[
							{
								required: true,
								message: 'Введите фамилию!',
							},
						]}
					>
						<Input autoComplete='on' />
					</Form.Item>
				</Col>
				<Col span={12}>
					<label className='form-label archi-label me-1'>
						Фамилия в дат. падеже (Кому?)
					</label>
					<StarIcon />
					<Form.Item
						name='last_name_dat_padeg'
						rules={[
							{
								required: true,
								message: 'Введите фамилию в дат. падеже!',
							},
						]}
					>
						<Input autoComplete='on' />
					</Form.Item>
				</Col>
			</Row>
			{/* Имя */}
			<Row gutter={16}>
				<Col span={12}>
					<label className='form-label archi-label me-1'>Имя</label>
					<StarIcon />
					<Form.Item
						name='first_name'
						rules={[
							{
								required: true,
								message: 'Введите имя!',
							},
						]}
					>
						<Input autoComplete='on' />
					</Form.Item>
				</Col>
				<Col span={12}>
					<label className='form-label archi-label me-1'>
						Имя в дат. падеже (Кому?)
					</label>
					<StarIcon />
					<Form.Item
						name='first_name_dat_padeg'
						rules={[
							{
								required: true,
								message: 'Введите имя в дат. падеже!',
							},
						]}
					>
						<Input autoComplete='on' />
					</Form.Item>
				</Col>
			</Row>

			{/* Отчество */}
			<Row gutter={16}>
				<Col span={12}>
					<label className='form-label archi-label'>Отчество</label>
					<Form.Item name='second_name'>
						<Input autoComplete='on' />
					</Form.Item>
				</Col>
				<Col span={12}>
					<label className='form-label archi-label'>
						Отч. в дат. падеже (Кому?)
					</label>
					<Form.Item name='second_name_dat_padeg'>
						<Input autoComplete='on' />
					</Form.Item>
				</Col>
			</Row>
			{/* ФИО в род. падеже */}
			<Row gutter={16}>
				<Col span={12}>
					<label className='form-label archi-label me-1'>
						ФИО в род. падеже (от кого?)
					</label>
					<StarIcon />
					<Form.Item
						name='fio_rod_padeg'
						rules={[
							{
								required: true,
								message: 'Введите ФИО в род. падеже!',
							},
						]}
					>
						<Input autoComplete='on' />
					</Form.Item>
				</Col>
				<Col span={12}>
					<div>
						<label className='form-label archi-label me-1'>
							ФИО с инициалами
						</label>
						<StarIcon />
						<Form.Item
							name='fio'
							rules={[
								{
									required: true,
									message: 'Введите ФИО с инициалами!',
								},
							]}
						>
							<Input autoComplete='on' />
						</Form.Item>
					</div>
				</Col>
			</Row>
			{/* Место рождения, дата рождения */}
			<Row gutter={16}>
				<Col span={12}>
					<label className='form-label archi-label me-1'>Место рождения</label>
					<Form.Item name='birth_place'>
						<Input autoComplete='on' />
					</Form.Item>
				</Col>
				<Col span={12}>
					<label className='form-label me-1'>Дата рождения</label>
					<StarIcon />
					<Form.Item
						name='dob'
						rules={[
							{
								required: true,
								message: 'Введите дату рождения!',
							},
						]}
					>
						<Input type='date' min='1900-01-01' max='2100-01-01' />
					</Form.Item>
				</Col>
			</Row>
			{/* Профессия */}
			<Row gutter={16}>
				<Col span={12}>
					<label className='form-label archi-label me-1'>Профессия</label>
					<StarIcon />
					<Form.Item
						name='profession'
						rules={[
							{
								required: true,
								message: 'Введите профессию!',
							},
						]}
					>
						<Input autoComplete='on' />
					</Form.Item>
				</Col>
				<Col span={12}>
					<label className='form-label archi-label me-1'>
						Проф. в род. пад. (Кого?)
					</label>
					<StarIcon />
					<Form.Item
						name='skill'
						rules={[
							{
								required: true,
								message: 'Введите профессию в род. пад!',
							},
						]}
					>
						<Input autoComplete='on' />
					</Form.Item>
				</Col>
			</Row>

			{/* телефон, расч. счет */}
			<Row gutter={16}>
				<Col span={8}>
					<label className='form-label archi-label'>Телефон</label>
					<Form.Item name='phone'>
						<Input autoComplete='on' />
					</Form.Item>
				</Col>

				<Col span={8}>
					<label className='form-label archi-label'>Расч. счет</label>
					<Form.Item name='bank_account'>
						<Input autoComplete='on' />
					</Form.Item>
				</Col>

				<Col span={8}>
					<label className='form-label archi-label'>Город</label>
					<Form.Item
						name='client_city'
						rules={[
							{
								required: true,
								message: 'Введите город!',
							},
						]}
					>
						<Input autoComplete='on' />
					</Form.Item>
				</Col>
			</Row>

			{/* <Row>
					<Col span={24}>
						<label className="form-label archi-label">Почтовый адрес</label>
						<Form.Item
							name="mail_address"

						>
							<Input autoComplete='on' />
						</Form.Item>
					</Col>
				</Row> */}
			<Row>
				<Col span={24}>
					<label className='form-label archi-label'>Комментарий</label>
					<Form.Item name='description'>
						<Input autoComplete='on' />
					</Form.Item>
				</Col>
			</Row>

			<div className='text-end'>
				<Form.Item noStyle={true}>
					<Button type='primary' htmlType='submit'>
						{isEdit ? 'Обновить клиента' : 'Сохранить клиента'}
					</Button>
				</Form.Item>
			</div>
		</Form>
	);
}
