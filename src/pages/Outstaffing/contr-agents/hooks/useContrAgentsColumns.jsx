// колонки для таблицы контрагентов
import { Tag } from 'antd';
import EditIcon from '@/components/Common/Icons/EditIcon';

export const useContrAgentsColumns = (handleContrAgentClick) => {
	const columns = [
		{
			title: 'id',
			dataIndex: 'id',
			key: 'id',
			sorter: (a, b) => a.id - b.id,
			defaultSortOrder: 'descend', // сортировка по возрастанию
		},
		{
			title: 'Тип',
			dataIndex: 'type',
			key: 'type',
			render: (text) => (
				<Tag color={text === 'Физик' ? '#f39b38' : '#5db6d8'}>{text}</Tag>
			),
		},
		{
			title: 'Внешняя компания или физик',
			dataIndex: 'company',
			key: 'company',
			render: (text, record) =>
				text?.name ||
				`${record.physic?.last_name ?? ''} ${record.physic?.first_name ?? ''} ${
					record.physic?.second_name ?? ''
				}`,
		},
		{
			title: 'Статус',
			dataIndex: 'status',
			key: 'status',
			render: (text) => (
				<Tag color={text === 'Новый' ? '#ee7269' : '#4eb47f'}>{text}</Tag>
			),
		},

		{
			title: 'Менеджер',
			dataIndex: 'manager',
			key: 'manager',
		},
		{
			title: 'Изменить',
			dataIndex: '',
			key: 'actions',
			render: (text) => {
				const { id } = text;

				return (
					<span
						className='cursor-pointer'
						onClick={() => handleContrAgentClick(text)}
					>
						<EditIcon id={`editicon=${id}`} />
					</span>
				);
			},
		},
	];

	return columns;
};
