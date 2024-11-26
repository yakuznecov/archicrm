// Статистика по договорам
import React from 'react';
import { Typography, Button, Card, Flex, Space } from 'antd';
import { SelectOwnCompany } from '@/components';
import useLoadAnalytics from './hooks/useLoadAnalytics';
import CollapseActiveContracts from './CollapseActiveContracts';

const Contracts = () => {
	const { Title, Text } = Typography;

	const {
		selectedCompanies,
		handleSelectedCompany,
		ownCompaniesList,
		handleSelectAll,
		activeContractsValue,
		loading,
		firedContractsValue,
		templateList,
		templateListByDate,
		activeContractsValueByDate,
		depositBalance,
	} = useLoadAnalytics();

	return (
		<Card className='mb-3'>
			<Title level={4}>Договоры</Title>
			<Flex gap={12}>
				<div style={{ width: '600px' }}>
					{/* Выбор внутренней компании для фильтрации */}
					<SelectOwnCompany
						options={ownCompaniesList}
						selectedOwnCompany={selectedCompanies}
						handleOwnCompanyChange={handleSelectedCompany}
						mode='multiple'
					/>
					{/* <span className="fw-bold">Баланс выбранных — <Text mark>{depositBalance || 0}</Text></span> */}
				</div>
				<Button type='primary' onClick={handleSelectAll}>
					Выбрать все
				</Button>
				{/* Активные договоры */}
				<div style={{ width: '230px' }}>
					<CollapseActiveContracts
						label='Активные договоры'
						activeContractsValue={activeContractsValue}
						items={templateList}
					/>
				</div>
				{/* Всего уволенных договоров */}
				<div className='custom-archi-tag'>
					<Space>
						Уволенные: <strong>{firedContractsValue}</strong>
					</Space>
				</div>
				{/* Договоры за дату */}
				<div style={{ width: '220px' }}>
					<CollapseActiveContracts
						label='Договоры за дату'
						activeContractsValue={activeContractsValueByDate}
						items={templateListByDate}
					/>
				</div>
			</Flex>
		</Card>
	);
};

export default Contracts;
