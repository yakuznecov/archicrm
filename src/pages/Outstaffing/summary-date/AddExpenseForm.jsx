// формы для создания расхода в таблице компаний в аналитике
import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';

const AddExpenseForm = ({ onFinish }) => {
	const { TextArea } = Input;

	return (
		<Form onFinish={onFinish} autoComplete="off">
			<Row>
				<Col span={24}>
					<div className="mb-3 ">
						<label className="form-label archi-label">Сумма</label>
						<Form.Item
							name="amount"
							rules={[
								{
									required: true,
									message: 'Введите сумму!',
								},
							]}
						>
							<Input />
						</Form.Item>
					</div>
					<div className="mb-3">
						<label className="form-label archi-label">Комментарий</label>
						<Form.Item
							name="description"
							rules={[
								{
									required: true,
									message: 'Введите комментарий!',
								},
							]}
						>
							<TextArea
								placeholder="Введите комментарий"
								autoSize={{
									minRows: 2,
									maxRows: 6,
								}}
							/>
						</Form.Item>
					</div>
				</Col>
			</Row>
			<Row>
				<Col>
					<div className="text-end">
						<Form.Item noStyle={true}>
							<Button type="primary" htmlType="submit">
								Сохранить
							</Button>
						</Form.Item>
					</div>
				</Col>
			</Row>
		</Form>
	);
};

export default AddExpenseForm;
