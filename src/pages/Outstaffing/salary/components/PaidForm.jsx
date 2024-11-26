// Форма выдачи зарплаты
import { Col, Row, Input, Form, Button } from 'antd';
import { CommonTag } from '@/components';

export default function PaidForm({ onFinish, userInfo }) {
	return (
		<Form onFinish={onFinish} autoComplete='off'>
			<div className='mb-2'>
				<CommonTag color='#4eb47f' text={userInfo} />
			</div>
			<Row gutter={16}>
				<Col span={6}>
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

				<Col span={18}>
					<label className='form-label archi-label'>Комментарий</label>
					<Form.Item
						name='description'
						rules={[
							{
								required: true,
								message: '',
							},
						]}
					>
						<Input />
					</Form.Item>
				</Col>
			</Row>

			<Row>
				<Col span={8}>
					<Form.Item noStyle={true}>
						<Button type='primary' htmlType='submit'>
							Сохранить
						</Button>
					</Form.Item>
				</Col>
			</Row>
		</Form>
	);
}
