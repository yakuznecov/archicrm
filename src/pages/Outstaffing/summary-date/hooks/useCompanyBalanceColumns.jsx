// колонки для таблицы компаний с балансом
import { useMemo } from 'react';
import { Tag, Typography, Flex } from 'antd';

export const useCompanyBalanceColumns = (handleCompanyClick) => {
	const { Text } = Typography;

	const columns = useMemo(() => [
		{
			title: "Имя компании",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Начало дня",
			dataIndex: "balance",
			key: "balance",
		},
		{
			title: "Контрагенты",
			dataIndex: "income_transfer_today_list",
			key: "income",
			render: (text) => {
				if (Array.isArray(text)) {
					return (
						<>
							{text.map((item) => (
								<Flex gap={8} key={item.name} className='mb-1'>
									<Text >{item.name}</Text>
									<Tag color="volcano">
										{item.amount}
									</Tag>
								</Flex>
							))}
						</>
					);
				}
				return null; // если text не является массивом, ничего не отображается
			}
		},
		{
			title: "Сумма прихода",
			dataIndex: "deposits_today",
			key: "deposits_today",
		},
		{
			title: "Расход",
			dataIndex: "outcome_transfer_today",
			key: "outcome_transfer_today",
		},
		{
			title: "Конец дня",
			dataIndex: "balance_end",
			key: "balance_end",
		},
		{
			title: "Добавление расхода",
			key: "create_cost",
			render: ({ id }) => (
				<Tag
					key={id}
					color="magenta"
					className='cursor-pointer'
					onClick={() => handleCompanyClick(id)}
				>
					Добавить расход
				</Tag>
			),
		},
	],
		[]
	);

	return columns;
};