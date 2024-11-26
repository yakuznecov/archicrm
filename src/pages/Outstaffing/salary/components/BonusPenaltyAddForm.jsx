// Форма добавления бонуса
import { Col, Row, Input, Form, Button } from 'antd';
import { CommonDatePicker, CommonTag } from '@/components';
import { useLoadBonus } from '../hooks/useLoadBonus';

export default function BonusPenaltyAddForm({ onFinish, btnText, userInfo }) {
	const { onChangeMonth } = useLoadBonus();

	return (
		<Form onFinish={onFinish} autoComplete='off'>
			<div className='mb-2'>
				<CommonTag color='#4eb47f' text={userInfo} />
			</div>
			<Row gutter={16}>
				<Col span={5}>
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

				<Col span={19}>
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

			<Row gutter={16}>
				<Col span={8}>
					<CommonDatePicker
						onChange={onChangeMonth}
						picker='month'
						placeholder='Месяц'
					/>
				</Col>
				<Col span={8}>
					<Form.Item>
						<Button type='primary' htmlType='submit'>
							{btnText}
						</Button>
					</Form.Item>
				</Col>
			</Row>
		</Form>
	);
}
