import { CommonTable } from '@/components';

const ContrAgentsTable = ({ data, loading, columns }) => {
	return (
		<CommonTable
			data={data}
			columns={columns}
			loading={loading}
			pagination={true}
		/>
	);
};

export default ContrAgentsTable;
