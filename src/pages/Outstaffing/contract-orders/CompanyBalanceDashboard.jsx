// CompanyBalanceDashboard, баланс компании на странице заказов
import { Tag, Flex, Typography, Spin } from 'antd';
import useCompanyBalance from './hooks/useCompanyBalance';

export default function CompanyBalanceDashboard() {
	const { Title } = Typography;
	const { companyBalance, loading } = useCompanyBalance();

	return (
		<Flex gap={3} className='mb-1' justify='center' align='center'>
			<Title level={5} strong style={{ margin: 0 }}>
				Баланс контрагента:
			</Title>
			{loading ? (
				<Spin />
			) : (
				<Tag color='volcano'>{companyBalance?.balance || 0}</Tag>
			)}
		</Flex>
	);
}
