// Payments, оплаты
import React from 'react';
import { Card, Table, Typography } from 'antd';
import { useOrderPaymentsColumns } from '@/hooks';
import useLoadOrdersPayments from './hooks/useLoadOrdersPayments';
import CollapsePayments from './СollapsePayments';

const OrdersPayments = () => {
	const { Title, Text } = Typography;

	const columns = useOrderPaymentsColumns(); // колонки в таблице оплат заказов

	const { orderPayments } = useLoadOrdersPayments(); // загрузка оплат заказов

	const items =
		Object.values(orderPayments)?.length &&
		Object.values(orderPayments)?.map((company, index) => ({
			key: index.toString(),
			label: (
				<>
					<Text strong>{company.companyName}</Text> —{' '}
					<Text type='danger' strong>
						{company.totalAmount}
					</Text>
				</>
			),
			children: (
				<Table
					columns={columns}
					dataSource={company.payments}
					size='small'
					rowKey='id'
					pagination={false}
				/>
			),
		}));

	return (
		<Card className='mb-3'>
			<Title level={4}>Оплаты заказов</Title>
			<CollapsePayments items={items} />
		</Card>
	);
};

export default OrdersPayments;
