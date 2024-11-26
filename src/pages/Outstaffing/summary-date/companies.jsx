// Статистика по приходам компаний
import React from 'react';
import { Card, Table, Typography, Modal } from 'antd';
import { useCompanyBalanceData } from './hooks/useCompanyBalanceData';
import AddExpenseForm from './AddExpenseForm';
import { CommonTable } from '@/components';

const Companies = () => {
	const { Title } = Typography;

	const { modal, toggleModal, columns, onFinish, companyBalanceList, loading } =
		useCompanyBalanceData();

	return (
		<Card className='mb-3'>
			<Title level={4}>Компании</Title>
			<CommonTable
				columns={columns}
				data={companyBalanceList}
				loading={loading}
			/>

			<Modal
				title='Добавить расход'
				open={modal}
				onCancel={toggleModal}
				width={250}
				footer={null}
			>
				<AddExpenseForm onFinish={onFinish} />
			</Modal>
		</Card>
	);
};

export default Companies;
