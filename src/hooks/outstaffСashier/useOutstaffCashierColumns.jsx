// колонки для таблицы кассы в аутстафф
import { useMemo } from 'react';
import { formatDate } from '@/helpers/Date/formatDate';
import { StatusCell } from '@/helpers';
import RadioCashierStatus from '@/pages/Outstaffing/summary-date/RadioCashierStatus';

const useOutstaffCashierColumns = () => {
	const columns = useMemo(
		() => [
			{
				title: 'ID',
				dataIndex: 'id',
				key: 'id',
				sorter: (a, b) => a.id - b.id,
				defaultSortOrder: 'descend', // сортировка по возрастанию
			},
			// {
			// 	title: 'Департамент',
			// 	dataIndex: 'department',
			// 	key: 'department_name',
			// 	render: (department) => department?.name,
			// },
			// {
			// 	title: 'Сотрудник',
			// 	dataIndex: 'staff',
			// 	key: 'staff',
			// },
			// {
			// 	title: 'Тип',
			// 	dataIndex: 'type',
			// 	key: 'type',
			// 	// render: (type) => <CashierTypeCell type={type} />,
			// },
			{
				title: 'Описание',
				dataIndex: 'description',
				key: 'description',
			},
			{
				title: 'Сумма',
				dataIndex: 'amount',
				key: 'amount',
			},

			{
				title: 'Дата',
				dataIndex: 'date_created',
				key: 'date_created',
				render: (date) => formatDate(date),
			},
			{
				title: 'Статус',
				dataIndex: 'status',
				key: 'status',
				width: 120,
				render: (status) => <StatusCell value={status} />,
			},
			{
				title: 'Изменить статус',
				dataIndex: 'action',
				key: 'action',
				width: 300,
				render: (_, record) => <RadioCashierStatus value={record} />,
			},
		],
		[]
	);

	return columns;
};

export default useOutstaffCashierColumns;
