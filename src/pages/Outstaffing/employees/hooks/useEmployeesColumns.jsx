// колонки для таблицы сотрудников
import { Flex } from 'antd';
import EditIcon from '@/components/Common/Icons/EditIcon';
import { formatDateTime } from '@/helpers/Date/formatDate';
import { formatPointDate } from '@/helpers/Date/dayjs';

export const useEmployeesColumns = (handleCellClick) => {
	const columns = [
		{
			title: 'Фамилия',
			dataIndex: 'staff',
			key: 'surname',
			width: '10%',
			render: (text) => text?.surname,
		},
		{
			title: 'Имя',
			dataIndex: 'staff',
			key: 'name',
			width: '10%',
			render: (text) => text?.name,
		},
		{
			title: 'Телефон',
			dataIndex: 'staff',
			key: 'phone',
			width: '6%',
			render: (text) => text?.mobile_phone,
		},
		{
			title: 'Дата рожд.',
			dataIndex: 'staff',
			key: 'dob',
			width: '7%',
			render: (text) => formatPointDate(text.dob),
		},
		{
			title: 'Время начала',
			dataIndex: 'start_date_time',
			key: 'start_date_time',
			width: '10%',
			editable: true,
			render: (text) => formatDateTime(text),
		},
		{
			title: 'Время оконч.',
			dataIndex: 'finish_date_time',
			key: 'finish_date_time',
			width: '10%',
			editable: true,
			render: (text) => formatDateTime(text),
		},
		{
			title: 'Часы',
			dataIndex: 'total_hours_in_day',
			key: 'total_hours_in_day',
			editable: true,
			width: '5%',
		},
		{
			title: 'Описание',
			dataIndex: 'description',
			key: 'description',
			editable: true,
			width: '25%',
		},
		{
			title: 'Ред.',
			width: '5%',
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
