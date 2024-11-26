// Создание заказа для выбранного договора вручную
import React from 'react';
import { addContractOrder } from '@/services';
import { Col, Row, Input, Form, Button } from 'antd';
import { errorToast } from '@/components';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useContractsStore } from '@/storeZustand';

const ContractOrderTab = () => {
	const [form] = Form.useForm();

	// Договор сотрудника при редактировании
	const [contractById] = useContractsStore(
		useShallow((state) => [state.contractById])
	);

	const onFinish = async (values) => {
		if (!contractById.id) {
			errorToast('ID текущего договора неизвестен. Откройте договор повторно.');
			return;
		}

		const orderData = {
			contract: contractById?.id,
			amount: values.amount,
			start_date: values.start_date,
			end_date: values.end_date,
		};

		await addContractOrder(orderData);
	};

	return (
		<Form onFinish={onFinish} autoComplete='off' form={form}>
			<Row gutter={16}>
				<Col span={6}>
					<Form.Item name='amount' label='Сумма заказа'>
						<Input type='number' />
					</Form.Item>
				</Col>
				{/* Дата начала */}
				<Col span={9}>
					<Form.Item name='start_date' label='Дата начала'>
						<Input type='date' />
					</Form.Item>
				</Col>

				{/* Дата окончания */}
				<Col span={9}>
					<Form.Item name='end_date' label='Дата окончания'>
						<Input type='date' />
					</Form.Item>
				</Col>
			</Row>
			<Row>
				<Col span={6}>
					<Form.Item noStyle>
						<Button type='primary' htmlType='submit'>
							Создать заказ
						</Button>
					</Form.Item>
				</Col>
			</Row>
		</Form>
	);
};

export default ContractOrderTab;
