// колонки для таблицы заказов в аутстафф
import { useMemo } from 'react';
import { formatDate } from '@/helpers/Date/formatDate';

const useContractOrdersColumns = () => {
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
				title: '№ Договора',
				dataIndex: 'contract',
				key: 'contract_number',
				render: (text) => text?.contract_number,
			},
			{
				title: 'Фамилия',
				dataIndex: 'contract',
				key: 'last_name',
				render: (text) => text?.client?.last_name,
			},
			{
				title: 'Имя',
				dataIndex: 'contract',
				key: 'first_name',
				render: (text) => text?.client?.first_name,
			},
			{
				title: 'Отчество',
				dataIndex: 'contract',
				key: 'second_name',
				render: (text) => text?.client?.second_name,
			},
			{
				title: 'Компания',
				dataIndex: 'contract',
				key: 'company_name',
				render: (text) => text?.client?.company?.name,
			},
			{
				title: 'Заказчик',
				dataIndex: 'contract',
				key: 'customer_company',
				render: (text) => text?.customer_company?.name,
			},
			{
				title: 'От',
				dataIndex: 'start_date',
				key: 'start_date',
				render: (date) => formatDate(date),
			},
			{
				title: 'До',
				dataIndex: 'end_date',
				key: 'end_date',
				render: (date) => formatDate(date),
			},
			{
				title: 'Стоимость',
				dataIndex: 'amount',
				key: 'amount',
			},
			{
				title: 'Оплачено',
				dataIndex: 'paid_amount',
				key: 'paid_amount',
			},
			{
				title: 'Статус',
				dataIndex: 'paid',
				key: 'paid',
				render: (text) => (text ? '✔️' : '❌'),
			},
		],
		[]
	);

	return columns;
};

export default useContractOrdersColumns;
