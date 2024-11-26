// ContractTabs Табы в модальном окне при создании договора
import { Tabs } from 'antd';
import ClientContractTab from '@/pages/Outstaffing/contracts/clientContractTab';
import ClientTemplates from '@/pages/Outstaffing/clientTemplates';
import UploadDocuments from '@/pages/Outstaffing/upload-documents';
import ContractOrderTab from './contractOrderTab';
import OutstaffingClientsForms from './outstaffingClientsForms';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useUserStore, useContractsStore } from '@/storeZustand';
import UploadDocumentsS3 from '../upload-documents-s3';

const ContractTabs = ({ isEdit, form }) => {
	// Загрузка данных текущего пользователя
	const [isSuperAdminOut] = useUserStore(
		useShallow((state) => [state.isSuperAdminOut])
	);

	// Активный ключ табов
	const [activeKey, setActiveKey] = useContractsStore(
		useShallow((state) => [state.activeKey, state.setActiveKey])
	);

	const handleTabChange = (key) => {
		setActiveKey(key);
	};

	const items = [
		{
			key: '1',
			label: 'Договор',
			children: <ClientContractTab />,
		},
		{
			key: '2',
			label: 'Клиент',
			children: <OutstaffingClientsForms form={form} />,
		},
		{
			key: '3',
			label: 'Шаблоны',
			children: <ClientTemplates />,
		},
		{
			key: '4',
			label: 'Сканы докум.',
			children: <UploadDocuments />,
		},
		{
			key: '5',
			label: 'Сканы ЛК',
			children: <UploadDocumentsS3 />,
		},
	];

	// если суперадмин, то возможно создание заказа вручную
	if (isSuperAdminOut) {
		items.push({
			key: '6',
			label: 'Заказ',
			children: <ContractOrderTab />,
		});
	}

	return (
		<Tabs
			activeKey={activeKey}
			items={items}
			centered={true}
			size='large'
			tabBarGutter={70}
			onChange={(key) => handleTabChange(key)}
		/>
	);
};

export default ContractTabs;
