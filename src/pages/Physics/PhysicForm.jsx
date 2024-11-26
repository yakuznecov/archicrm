// формы в модальном окне физиков
import { Form, Row, Col, Input, Button } from 'antd';
import StarIcon from '@/components/Common/Icons/StarIcon';

const PhysicForm = ({ onFinish, isEdit, loadingBtn, fields }) => {
	const [form] = Form.useForm();

	return (
		<Form fields={fields} onFinish={onFinish} autoComplete='off' form={form}>
			<Row gutter={16}>
				<Col span={6}>
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
				<Col span={6}>
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
				<Col span={6}>
					<label className='form-label archi-label'>Отчество</label>
					<Form.Item name='second_name'>
						<Input autoComplete='on' />
					</Form.Item>
				</Col>
				<Col span={6}>
					<label className='form-label archi-label me-1'>Дата рождения</label>
					<StarIcon />
					<Form.Item
						name='dob'
						rules={[
							{
								required: true,
								message: 'Введите дату!',
							},
						]}
					>
						<Input type='date' min='1900-01-01' max='2100-01-01' />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={7}>
					<label className='form-label archi-label me-1'>Телефон</label>
					<StarIcon />
					<Form.Item
						name='phone'
						rules={[
							{
								required: true,
								message: 'Введите телефон!',
							},
						]}
					>
						<Input />
					</Form.Item>
				</Col>
				<Col span={17}>
					<label className='form-label archi-label'>Комментарий</label>
					<Form.Item name='description'>
						<Input autoComplete='on' />
					</Form.Item>
				</Col>
				{/* <Col span={6}>
					<label className="form-label archi-label me-1">Место рождения</label>
					<Form.Item name="birth_place">
						<Input autoComplete="on" />
					</Form.Item>
				</Col> */}
				{/* <Col span={6}>
					<label className="form-label archi-label">Гражданство</label>
					<Form.Item name="citizen">
						<Input autoComplete="on" />
					</Form.Item>
				</Col> */}
				{/* <Col span={6}>
					<label className="form-label archi-label">Серия паспорта</label>
					<Form.Item name="passport_serial">
						<Input autoComplete="on" />
					</Form.Item>
				</Col> */}
			</Row>
			{/* <Row gutter={16}>
				<Col span={6}>
					<label className="form-label archi-label">Номер паспорта</label>
					<Form.Item name="passport_number">
						<Input autoComplete="on" />
					</Form.Item>
				</Col>
				<Col span={18}>
					<label className="form-label archi-label">Место выдачи паспорта</label>
					<Form.Item name="passport_place_created">
						<Input autoComplete="on" />
					</Form.Item>
				</Col>
			</Row> */}
			{/* <Row gutter={16}>
				<Col span={6}>
					<label className="form-label archi-label">Дата выдачи</label>
					<Form.Item name="passport_place_created_date">
						<Input type="date" min="1900-01-01" max="2100-01-01" />
					</Form.Item>
				</Col>
				<Col span={18}>
					<label className="form-label archi-label">Адрес регистрации</label>
					<Form.Item name="passport_address">
						<Input autoComplete="on" />
					</Form.Item>
				</Col>
			</Row> */}
			{/* <Row gutter={16}>
				<Col span={6}>
					<label className="form-label archi-label">Расч. счет</label>
					<Form.Item name="bank_account">
						<Input autoComplete="on" />
					</Form.Item>
				</Col>
			</Row> */}
			<div className='text-end'>
				<Form.Item noStyle={true}>
					<Button type='primary' htmlType='submit' loading={loadingBtn}>
						{isEdit ? 'Обновить физика' : 'Сохранить физика'}
					</Button>
				</Form.Item>
			</div>
		</Form>
	);
};

export default PhysicForm;
