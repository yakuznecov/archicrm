// Форма обновления личного процента
import { Col, Row, Input, Form, Button, Typography } from 'antd';
import { CommonDatePicker } from '@/components';

const PercentForm = ({ form, onFinishPercent }) => {
	const { Title } = Typography;

	return (
		<Form
			// fields={fields}
			onFinish={onFinishPercent}
			autoComplete='off'
			form={form}
		>
			<Title level={5}>За выбранный месяц</Title>
			<Row gutter={8}>
				<Col span={4}>
					<Form.Item
						noStyle={true}
						name='month_revenue_rate'
						rules={[
							{
								required: true,
								message: '',
							},
						]}
					>
						<Input type='number' placeholder='%' />
					</Form.Item>
				</Col>
				{/* <Col span={8}>
					<CommonDatePicker
						onChange={onChangeMonth}
						picker='month'
						placeholder='Месяц'
					/>
				</Col> */}
				<Col span={12}>
					<Form.Item noStyle={true}>
						<Button type='primary' htmlType='submit'>
							Сохранить процент
						</Button>
					</Form.Item>
				</Col>
			</Row>
		</Form>
	);
};

export default PercentForm;
