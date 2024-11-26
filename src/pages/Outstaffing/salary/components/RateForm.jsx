// Форма обновления ставки за час
import { Col, Row, Input, Form, Button } from 'antd';

const RateForm = ({ form, onFinishRate }) => {
	return (
		<Form
			// fields={fields}
			onFinish={onFinishRate}
			autoComplete='off'
			form={form}
		>
			<Row gutter={16}>
				<Col span={8}>
					<Form.Item
						noStyle={true}
						name='salary_rate_per_hour'
						rules={[
							{
								required: true,
								message: '',
							},
						]}
					>
						<Input type='number' placeholder='Сумма' />
					</Form.Item>
				</Col>
				<Col span={16}>
					<Form.Item noStyle={true}>
						<Button type='primary' htmlType='submit'>
							Сохранить ставку
						</Button>
					</Form.Item>
				</Col>
			</Row>
		</Form>
	);
};

export default RateForm;
