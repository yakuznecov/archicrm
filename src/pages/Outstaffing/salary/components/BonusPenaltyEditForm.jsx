// Форма обновления бонуса и штрафа
import { Form, Input, Button, Row, Col } from 'antd';

export default function BonusPenaltyEditForm({ fields, onFinish, form }) {
	return (
		<Form fields={fields} onFinish={onFinish} autoComplete='off' form={form}>
			<Row gutter={16}>
				<Col span={13}>
					<label className='form-label archi-label'>Дата</label>
					<Form.Item
						name='date_of_payment'
						rules={[
							{
								required: true,
								message: 'Введите дату!',
							},
						]}
					>
						<Input type='datetime-local' />
					</Form.Item>
				</Col>
				<Col span={8}>
					<label className='form-label archi-label'>Сумма</label>
					<Form.Item
						name='amount'
						rules={[
							{
								required: true,
								message: '',
							},
						]}
					>
						<Input type='number' />
					</Form.Item>
				</Col>
			</Row>
			<Row>
				<Col span={24}>
					<label className='form-label archi-label'>Комментарий</label>
					<Form.Item name='description'>
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
	);
}
