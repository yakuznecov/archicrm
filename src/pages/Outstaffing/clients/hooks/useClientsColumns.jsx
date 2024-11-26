// колонки для таблицы клиентов аутстафа

export const useClientsColumns = () => {
	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "Фамилия",
			dataIndex: "last_name",
			key: "last_name",
		},
		{
			title: "Имя",
			dataIndex: "first_name",
			key: "first_name",
		},
		{
			title: "Отчество",
			dataIndex: "second_name",
			key: "second_name",
		},
		{
			title: "Профессия",
			dataIndex: "profession",
			key: "profession",
		},
		{
			title: "Гражданство",
			dataIndex: "document",
			key: "document",
		},
		{
			title: "Компания",
			dataIndex: "company",
			key: "company",
		},
		{
			title: "Город",
			dataIndex: "company",
			key: "city",
			render: ({ city }) => city,
		},
		{
			title: "Комментарий",
			dataIndex: "description",
			key: "description",
		},

	];

	return columns;
};