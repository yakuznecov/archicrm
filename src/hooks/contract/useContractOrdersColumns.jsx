// колонки для таблицы заказов в аутстафф
import { useMemo } from 'react';
import { formatDate } from '@/helpers/Date/formatDate';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useContractOrdersStore } from '@/storeZustand';

const useContractOrdersColumns = (handleCellClick) => {
	// Добавить сумму заказа при его редактировании
	const [addSelectedOrderAmount] = useContractOrdersStore(
		useShallow((state) => [state.addSelectedOrderAmount])
	);

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
			// {
			// 	title: "Город",
			// 	dataIndex: "contract",
			// 	key: "company_city",
			// 	render: (text) => text?.client?.company?.city
			// },
			// {
			// 	title: "Шаблон",
			// 	dataIndex: "contract",
			// 	key: "template_set",
			// 	render: (text) => text?.template_set?.name
			// },
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
			// {
			// 	title: "Ред.",
			// 	dataIndex: "",
			// 	key: "actions",
			// 	render: (text, _, index) => {
			// 		const { id, amount } = text;

			// 		return (
			// 			<span className="cursor-pointer"
			// 				onClick={() => {
			// 					handleCellClick(id);
			// 					addSelectedOrderAmount(amount); // добавление суммы выбранного заказа
			// 				}}>
			// 				<EditIcon id={`editicon=${id}`} />
			// 			</span>
			// 		)
			// 	},
			// },
		],
		[]
	);

	return columns;
};

export default useContractOrdersColumns;
