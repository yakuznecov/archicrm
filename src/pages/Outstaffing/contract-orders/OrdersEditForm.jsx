// форма редактирования заказа
import React from 'react';
import { Form, Input, Divider, Button } from 'antd';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useContractOrdersStore } from '@/storeZustand';

const OrdersEditForm = ({ onFinish, loadingEditBtn }) => {
	// выбранная сумма при редактировании заказа
	const [selectedOrderAmount] = useContractOrdersStore(
		useShallow((state) => [state.selectedOrderAmount])
	);

	return (
		<Form
			onFinish={onFinish}
			autoComplete='off'
			fields={[
				{
					name: ['amount'],
					value: selectedOrderAmount,
				},
			]}
		>
			<Divider style={{ margin: '12px 0' }} />
			<div className='d-flex align-items-center gap-3'>
				<Form.Item
					name='amount'
					rules={[
						{
							required: true,
							message: 'Введите сумму',
						},
					]}
				>
					<Input type='number' />
				</Form.Item>

				<Form.Item>
					<Button type='primary' htmlType='submit' loading={loadingEditBtn}>
						Сохранить
					</Button>
				</Form.Item>
			</div>
		</Form>
	);
};

export default OrdersEditForm;
