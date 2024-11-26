// Клиенты аутстафф
import { Card, Table } from 'antd';
import { useClientsColumns } from './hooks/useClientsColumns';
import Loader from '@/components/Common/Loader';
import { useLoadClients } from './hooks/useLoadClients';

const Clients = () => {
	const { loading, clientsOutstaffList } = useLoadClients();

	const columns = useClientsColumns();

	return (
		<Card>
			{loading && <Loader />}
			{!loading && clientsOutstaffList && clientsOutstaffList?.length > 0 && (
				<Table
					columns={columns}
					dataSource={clientsOutstaffList}
					pagination={false}
					size='small'
					rowKey='id'
				/>
			)}
		</Card>
	);
};

export default Clients;
