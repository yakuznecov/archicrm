import React from 'react';
import { Card, Typography, Row, Col, Statistic, Modal } from 'antd';
import { CommonSelect, CommonTable } from '@/components';
import { useLoadPhysicsStat } from './hooks/useLoadPhysicsStat';
import { useManagersHistory } from './hooks/useManagersHistory';
import { useManagersAnalytics } from './hooks/useManagersAnalytics';
import useManagersFilters from './hooks/useManagersFilters';

const Managers = () => {
	const { Title } = Typography;

	// История оплат менеджера
	const {
		modal,
		columns,
		toggleModal,
		paymentsColumns,
		orderPaymentsByManager,
		loading: loadingHistory,
	} = useManagersHistory();

	// фильтры в модалке продаж менеджеров
	const { handleContrAgentChange, contrAgentsItems, selectedContrAgent } =
		useManagersFilters();

	const { managersAnalyticsList, loading } = useManagersAnalytics();
	const { physicsCount } = useLoadPhysicsStat();

	return (
		<>
			<Row gutter={16}>
				<Col span={10}>
					<Card className='mb-3'>
						<Title level={4}>Продажи менеджеров</Title>
						<CommonTable
							columns={columns}
							data={managersAnalyticsList}
							loading={loading}
						/>
					</Card>
				</Col>
				<Col span={14}>
					<Card>
						<Statistic title='Количество физиков' value={physicsCount} />
					</Card>
				</Col>
			</Row>

			<Modal
				title='История оплат менеджера'
				open={modal}
				onCancel={toggleModal}
				width={1100}
				footer={null}
			>
				<div style={{ width: 400 }} className='mb-3'>
					{/* Выбор контрагента */}
					<CommonSelect
						value={selectedContrAgent}
						options={contrAgentsItems}
						onChange={handleContrAgentChange}
						placeholder='Выбрать контрагента'
					/>
				</div>
				<CommonTable
					columns={paymentsColumns}
					data={orderPaymentsByManager}
					loading={loadingHistory}
				/>
			</Modal>
		</>
	);
};

export default Managers;
