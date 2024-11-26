// Форма начала рабочего времени
import { Form, Input, Button, Row, Col } from 'antd';

const StartTimeForm = ({ fields, onFinish, form, isTimeAdded }) => {
	return (
		<Form fields={fields} onFinish={onFinish} autoComplete='off' form={form}>
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
					<Form.Item name='start_date_time'>
						<Input type='datetime-local' disabled />
					</Form.Item>
				</Col>
			</Row>

			<div className='text-end'>
				<Form.Item noStyle={true}>
					<Button type='primary' htmlType='submit' disabled={isTimeAdded}>
						Сохранить
					</Button>
				</Form.Item>
			</div>
		</Form>
	);
};

export default StartTimeForm;
