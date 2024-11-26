// Депозиты
import React from 'react';
import { Card, Table, Typography } from 'antd';
import { useDepositsColumns } from '@/hooks';
import useLoadDeposits from './hooks/useLoadDeposits';
import CollapseDeposits from './СollapseDeposits';

const Deposits = () => {
	const { Title, Text } = Typography;

	// колонки в таблице депозитов
	const columns = useDepositsColumns(); // колонки в таблице депозитов

	const { contrAgentDepositsList } = useLoadDeposits(); // загрузка депозитов

	const items = Object.values(contrAgentDepositsList).map((item, index) => ({
		key: index.toString(),
		label: (
			<>
				<Text strong>{item.company.name}</Text> —{' '}
				<Text type='danger' strong>
					{item.amount}
				</Text>
			</>
		),
		children: (
			<Table
				columns={columns}
				dataSource={item.deposits}
				size='small'
				rowKey='id'
				pagination={false}
			/>
		),
	}));

	return (
		<Card className='mb-3'>
			<Title level={4}>Депозиты</Title>
			<CollapseDeposits items={items} />
		</Card>
	);
};

export default Deposits;
