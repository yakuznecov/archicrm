import { Card, Table } from 'antd';
import Loader from '@/components/Common/Loader';
import { useLoadExpensesCompanies } from './hooks/useLoadExpensesCompanies';

const ExpensesCompanies = () => {
	// логика загрузки данных о расходах внутренних компаний
	const { loading, contrAgentCostList, columns } = useLoadExpensesCompanies();

	return (
		<Card>
			{loading && <Loader />}
			{!loading && contrAgentCostList && contrAgentCostList?.length > 0 && (
				<Table
					columns={columns}
					dataSource={contrAgentCostList}
					pagination={false}
					size='small'
					rowKey='id'
				/>
			)}
		</Card>
	);
};

export default ExpensesCompanies;
