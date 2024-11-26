// колонки для таблицы физиков
import { useMemo } from 'react';
import { formatDate } from '@/helpers/Date/formatDate';
import EditIcon from '@/components/Common/Icons/EditIcon';

const usePhysicsColumns = (handlePhysicClick) => {
	const columns = useMemo(
		() => [
			{
				title: 'id',
				dataIndex: 'id',
				key: 'id',
				sorter: (a, b) => a.id - b.id,
				defaultSortOrder: 'descend', // сортировка по возрастанию
			},
			{
				title: 'Фамилия',
				dataIndex: 'last_name',
				key: 'last_name',
			},
			{
				title: 'Имя',
				dataIndex: 'first_name',
				key: 'first_name',
			},
			{
				title: 'Отчество',
				dataIndex: 'second_name',
				key: 'second_name',
			},
			{
				title: 'Дата рождения',
				dataIndex: 'dob',
				key: 'dob',
				render: (date) => formatDate(date),
			},
			{
				title: 'Телефон',
				dataIndex: 'phone',
				key: 'phone',
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
							onClick={() => handlePhysicClick(text)}
						>
							<EditIcon id={`editicon=${id}`} />
						</span>
					);
				},
			},
		],
		[]
	);

	return columns;
};

export default usePhysicsColumns;
