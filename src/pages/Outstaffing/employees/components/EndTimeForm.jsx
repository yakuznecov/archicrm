// Форма окончания рабочего времени
import { Form, Input, Button, Row, Col, Tag, Divider } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

const EndTimeForm = ({ fields, onFinish, form, staffName, loading }) => {
	return (
		<Form fields={fields} onFinish={onFinish} autoComplete='off' form={form}>
			<Divider orientation='center'>
				{loading ? (
					<SyncOutlined spin />
				) : (
					<Tag color='magenta'>{staffName}</Tag>
				)}
			</Divider>
			<Row gutter={16}>
				<Col span={12}>
					<label className='form-label archi-label'>Время начала</label>
					<Form.Item
						name='start_date_time'
						rules={[
							{
								required: true,
								message: 'Введите время начала!',
							},
						]}
					>
						<Input
							type='datetime-local'
							min='1900-01-01'
							max='2100-01-01'
							disabled
						/>
					</Form.Item>
				</Col>
				<Col span={12}>
					<label className='form-label archi-label'>Время окончания</label>
					<Form.Item
						name='finish_date_time'
						rules={[
							{
								required: true,
								message: 'Введите время окончания!',
							},
						]}
					>
						<Input type='datetime-local' min='1900-01-01' max='2100-01-01' />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={6}>
					<label className='form-label archi-label'>Часы</label>
					<Form.Item
						name='total_hours_in_day'
						rules={[
							{
								required: true,
								message: 'Введите кол-во часов!',
							},
						]}
					>
						<Input type='number' />
					</Form.Item>
				</Col>
				<Col span={12}>
					<label className='form-label archi-label'>Описание</label>
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
};

export default EndTimeForm;
