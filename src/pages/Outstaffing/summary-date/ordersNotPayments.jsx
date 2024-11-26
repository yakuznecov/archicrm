// Заказы без оплаты
import React from 'react';
import { Table, Typography, Collapse, ConfigProvider } from 'antd';
import useContractOrdersColumns from './hooks/useContractOrdersColumns';
import CollapsePayments from './СollapsePayments';
import { useLoadOrders } from './hooks/useLoadOrders';
import Loader from '@/components/Common/Loader';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useContractOrdersStore } from '@/storeZustand';

const OrdersNotPayments = () => {
	const { Text } = Typography;

	const columns = useContractOrdersColumns(); // колонки в таблице заказов

	const { notPaidOrders, totalAmount } = useLoadOrders(); // загрузка заказов

	const totalAmountFormatted = new Intl.NumberFormat('ru-RU', {
		style: 'decimal',
	}).format(totalAmount); // форматирование

	// Заказы
	const [loading] = useContractOrdersStore(
		useShallow((state) => [state.loading])
	);

	const items =
		notPaidOrders &&
		Object.values(notPaidOrders)?.length &&
		Object.values(notPaidOrders)?.map((company, index) => ({
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
					dataSource={company.orders}
					size='small'
					rowKey='id'
					pagination={false}
				/>
			),
		}));

	return (
		<ConfigProvider
			theme={{
				components: {
					Collapse: {
						headerBg: 'rgba(93, 182, 216, 0.4)',
						algorithm: true,
					},
				},
			}}
		>
			<Collapse
				size='small'
				className='mb-3'
				items={[
					{
						key: '1',
						label: (
							<span>
								Неоплаченные заказы (<strong>{totalAmountFormatted}</strong>) ||
								Число компаний:{' '}
								<strong>
									{notPaidOrders && Object.keys(notPaidOrders)?.length}
								</strong>
							</span>
						),
						children: (
							<>
								{loading && <Loader />}
								{!loading && notPaidOrders && (
									<CollapsePayments items={items} />
								)}
							</>
						),
					},
				]}
			/>
		</ConfigProvider>
	);
};

export default OrdersNotPayments;
