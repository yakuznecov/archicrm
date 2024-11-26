import { Table } from 'antd';
import Loader from '@/components/Common/Loader';

export default function CommonTable({
	columns,
	data,
	pagination = false,
	loading,
	bordered,
	rowSelection,
	className,
}) {
	return (
		<Table
			columns={columns}
			dataSource={data}
			pagination={pagination}
			rowSelection={rowSelection}
			rowKey='id'
			size='small'
			className={className}
			loading={{
				spinning: loading,
				indicator: <Loader />, // Кастомизация индикатора
			}}
			showExpandColumn={false}
			bordered={bordered}
		/>
	);
}
