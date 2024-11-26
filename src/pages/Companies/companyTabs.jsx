// Табы в модальном окне на странице компаний
import { useState } from 'react';
import { Tabs } from 'antd';
import CompanyFormsTab from './сompanyFormsTab';
import HistoryCompanyDeposits from './historyCompanyDeposits';

const CompanyTabs = ({ isEdit, closeModal, form }) => {
	const [activeKey, setActiveKey] = useState('1');

	const handleTabChange = (key) => {
		setActiveKey(key);
	};

	const items = [
		{
			key: '1',
			label: 'Информация о компании',
			children: <CompanyFormsTab isEdit={isEdit} closeModal={closeModal} form={form} />,
		},
		// {
		// 	key: '2',
		// 	label: 'История внесения депозитов',
		// 	children: <HistoryCompanyDeposits />,
		// }
	];

	return (
		<Tabs
			activeKey={activeKey}
			items={items}
			centered={true}
			size='large'
			tabBarGutter={142}
			onChange={(key) => handleTabChange(key)}
		/>
	);
};

export default CompanyTabs;