// колонки для таблицы сотрудников, когда ставят начальное время
import EditIcon from '@/components/Common/Icons/EditIcon';
import { Flex } from 'antd';

export const useStaffByOutstaffColumns = (handleCellClick) => {
	const columns = [
		{
			title: 'Фамилия',
			dataIndex: 'surname',
			key: 'surname',
		},
		{
			title: 'Имя',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Доб. время',
			key: 'action',
			width: '25%',
			render: (text) => {
				const { id } = text;

				return (
					<Flex
						className='cursor-pointer'
						align='center'
						justify='center'
						onClick={() => {
							handleCellClick(id);
						}}
					>
						<EditIcon id={`editicon-${id}`} />
					</Flex>
				);
			},
		},
	];

	return columns;
};
