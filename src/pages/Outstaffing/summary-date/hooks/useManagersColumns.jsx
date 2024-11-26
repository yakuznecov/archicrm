// колонки для таблицы менеджеров
import { useMemo } from 'react';
import { Tag } from 'antd';

const useManagersColumns = (handleHistoryClick) => {
	const columns = useMemo(() => [
		{
			title: "Имя",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Сумма",
			dataIndex: "paid",
			key: "paid",
			render: (text) => (
				<Tag color="geekblue">{text}</Tag>
			)
		},
		{
			title: "Себес.",
			dataIndex: "self_cost",
			key: "self_cost",
			render: (text) => (
				<Tag color="volcano">{text}</Tag>
			)
		},
		{
			title: "Итого",
			dataIndex: "total",
			key: "total",
			render: (text) => (
				<Tag color="purple">{text}</Tag>
			)
		},
		{
			title: "История оплат",
			key: "history",
			render: (text) => {
				// console.log('text', text);
				const { id } = text;

				return (
					<span className="cursor-pointer" onClick={() => handleHistoryClick(id)}>
						<Tag color="#5db6d8">Посмотреть</Tag>
					</span>
				)
			}
		},
	],
		[]
	);

	return columns;
};

export default useManagersColumns;