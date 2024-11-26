import { Flex } from 'antd';
import { CommonTable } from '@/components';
import { StatusCell } from '@/helpers';

// скрытие номера телефона через определенное время
import PhoneNumber from '@/components/Common/PhoneNumber';
import { formatDate, getTimeFromDate } from '@/helpers/Date/formatDate';
import EditIcon from '../../../../components/Common/Icons/EditIcon';

const ServiceRequestsTable = ({ data, loading, handleCellClick }) => {
	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Имя',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Телефон',
			dataIndex: 'phone',
			key: 'phone',
			render: (text) => <PhoneNumber phone={text} />,
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Комментарий',
			dataIndex: 'notes',
			key: 'notes',
		},
		{
			title: 'Откуда',
			dataIndex: 'url',
			key: 'url',
			render: (text) => <div className='wordBreakBox'>{text}</div>,
		},
		{
			title: 'Город',
			dataIndex: 'city',
			key: 'city',
		},
		{
			title: 'Статус',
			dataIndex: 'status',
			key: 'status',
			render: (text) => <StatusCell value={text} />,
		},
		{
			title: 'Дата',
			dataIndex: 'date_created',
			key: 'date_created',
			render: (date) => (
				<>
					<div className='text-center'>{formatDate(date)}</div>
					<div className='text-center fw-bold'>{getTimeFromDate(date)}</div>
				</>
			),
		},
		{
			title: 'Действия',
			key: 'actions',
			render: (text) => {
				const { id } = text;
				return (
					<Flex
						className='cursor-pointer'
						align='center'
						justify='center'
						onClick={() => {
							handleCellClick(text);
						}}
					>
						<EditIcon id={`editicon-${id}`} />
					</Flex>
				);
			},
		},
	];

	return (
		<>
			<CommonTable columns={columns} data={data} loading={loading} />
		</>
	);
};

export default ServiceRequestsTable;
