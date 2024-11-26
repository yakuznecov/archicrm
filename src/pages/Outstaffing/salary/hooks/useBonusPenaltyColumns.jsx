// колонки для таблицы с бонусами сотрудника
import { Flex } from 'antd';
import { CommonTag, DeleteIcon } from '@/components';
import { formatPointDate } from '@/helpers/Date/dayjs';

export default function useBonusPenaltyColumns(handleCellClick) {
	const columns = [
		{
			title: 'Удал.',
			width: '10%',
			render: (text) => {
				console.log('text', text);
				const { id, amount } = text;

				return (
					<Flex
						className='cursor-pointer'
						align='center'
						justify='center'
						onClick={() => {
							handleCellClick(id, amount);
						}}
					>
						<DeleteIcon id={`editicon-${id}`} />
					</Flex>
				);
			},
		},
		{
			title: 'Дата',
			dataIndex: 'date_of_payment',
			key: 'date_of_payment',
			width: '7%',
			render: (text) => formatPointDate(text),
		},
		{
			title: 'Сумма',
			dataIndex: 'amount',
			key: 'amount',
			width: '8%',
			render: (text) => (
				// убираем минус, если штраф
				<CommonTag color='volcano' text={text.replace('-', '')} />
			),
		},
		{
			title: 'Комментарий',
			dataIndex: 'description',
			key: 'description',
		},
	];

	return columns;
}
