// колонки для таблицы депозитов контрагентов
import { Tag } from 'antd';
import { PaymentTypeCell } from '@/helpers';
import { formatDate } from '@/helpers/Date/formatDate';
import EditIcon from '@/components/Common/Icons/EditIcon';

const useDepositsColumns = (handleDepositClick, isBuh) => {
	const columns = [
		{
			title: 'id',
			dataIndex: 'id',
			key: 'id',
			sorter: (a, b) => a.id - b.id,
			defaultSortOrder: 'descend', // сортировка по возрастанию
		},
		{
			title: 'Компания',
			dataIndex: 'company',
			key: 'company_name',
			render: (text) => text.name,
		},
		{
			title: 'Контрагент',
			dataIndex: 'contr_agent',
			key: 'contr_agent',
			render: (text) => text?.company?.name,
		},
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
		{
			title: 'НДС',
			key: 'nds',
			dataIndex: 'type',
			width: 60,
			render: (text) => text === 2 && <Tag color='volcano'>НДС</Tag>,
		},
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
	];

	const forBuhEditColumn = {
		title: 'Ред.',
		dataIndex: '',
		key: 'actions',
		render: (text) => {
			const { id, amount, type, company, contr_agent } = text;

			const depositData = {
				id,
				amount,
				company: company?.id,
				contr_agent: contr_agent?.id,
				type,
			};

			return (
				<span
					className='cursor-pointer'
					onClick={() => handleDepositClick(depositData)}
				>
					<EditIcon id={`editicon=${id}`} />
				</span>
			);
		},
	};

	if (isBuh) {
		columns.push(forBuhEditColumn);
	}

	return columns;
};

export default useDepositsColumns;
