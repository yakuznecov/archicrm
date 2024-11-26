// колонки для таблицы договоров в аутстафф
import { useMemo } from 'react';
import { PaymentTypeCell } from '@/helpers';
import { formatDate } from '@/helpers/Date/formatDate';

const useOrderPaymentsColumns = () => {
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
				dataIndex: 'contract_order',
				key: 'contract_number',
				render: (text) => text?.contract?.contract_number,
			},
			{
				title: 'ID Заказа',
				dataIndex: 'contract_order',
				key: 'contract_order_id',
				render: (text) => text.id,
			},
			{
				title: 'Фамилия',
				dataIndex: 'contract_order',
				key: 'last_name',
				render: (text) => text?.contract?.client?.last_name,
			},
			{
				title: 'Имя',
				dataIndex: 'contract_order',
				key: 'first_name',
				render: (text) => text?.contract?.client?.first_name,
			},
			{
				title: 'Отчество',
				dataIndex: 'contract_order',
				key: 'second_name',
				render: (text) => text?.contract?.client?.second_name,
			},
			{
				title: 'Компания',
				dataIndex: 'contract_order',
				key: 'company_name',
				render: (text) => text?.contract?.client?.company?.name,
			},
			{
				title: 'Заказчик',
				dataIndex: 'contract_order',
				key: 'company_name',
				render: (text) => text?.contract?.customer_company?.name,
			},
			{
				title: 'Город',
				dataIndex: 'contract_order',
				key: 'company_city',
				render: (text) => text?.contract?.client?.company?.city,
			},
			{
				title: 'Дата оплаты',
				dataIndex: 'date_of_payment',
				key: 'date_of_payment',
				render: (date) => formatDate(date),
			},
			{
				title: 'Тип оплаты',
				dataIndex: 'payment_type',
				key: 'payment_type',
				render: (text) => <PaymentTypeCell value={text} />,
			},
			{
				title: 'Сумма',
				dataIndex: 'amount',
				key: 'amount',
				className: 'fw-bold text-dark',
			},
		],
		[]
	);

	return columns;
};

export default useOrderPaymentsColumns;
