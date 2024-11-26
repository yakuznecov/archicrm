// колонки для таблицы депозитов контрагентов
import { PaymentTypeCell } from '@/helpers';
import { formatDate } from '@/helpers/Date/formatDate';

export const useExpensesCompaniesColumns = () => {
	const columns = [
		{
			title: 'Компания',
			dataIndex: 'company',
			key: 'company_name',
			render: ({ name }) => name,
		},
		// {
		// 	title: "Контрагент",
		// 	dataIndex: "contr_agent",
		// 	key: "contr_agent",
		// 	render: (text) => text?.company?.name
		// },
		{
			title: 'Сотрудник',
			dataIndex: 'creator',
			key: 'creator',
			render: (text) => text?.surname + ' ' + text?.name,
		},
		{
			title: 'Сумма',
			dataIndex: 'amount',
			key: 'amount',
		},
		// {
		// 	title: 'НДС',
		// 	key: 'nds',
		// 	dataIndex: 'type',
		// 	width: 60,
		// 	render: (text) => text === 2 && <Tag color='volcano'>НДС</Tag>
		// },
		{
			title: 'Тип',
			dataIndex: 'payment_type',
			key: 'payment_type',
			width: 60,
			render: (text) => <PaymentTypeCell value={text.id} />,
		},
		{
			title: 'Дата внесения',
			dataIndex: 'date_of_deposit',
			key: 'date_of_deposit',
			render: (date) => formatDate(date),
		},
		{
			title: 'Комментарий',
			dataIndex: 'description',
			key: 'description',
		},
	];

	return columns;
};
