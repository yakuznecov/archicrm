// колонки для таблицы зарплаты бухгалтерия и курьеры

export const useSalaryBuhColumns = (
	handleBonusClick,
	handlePenaltyClick,
	handleRateClick,
	handlePercentClick,
	handlePaidClick
) => {
	const columns = [
		{
			title: 'Фамилия',
			dataIndex: 'surname',
			key: 'surname',
		},
		{
			title: 'Имя',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Общее кол. часов',
			dataIndex: 'total_hours',
			key: 'total_hours',
		},
		{
			title: 'Час. ставка',
			dataIndex: 'salary_rate_per_hour',
			key: 'salary_rate_per_hour',
			width: '7%',
			editable: true,
			className: 'archi_cell',
			render: (text, record) => (
				<div className='cursor-pointer' onClick={() => handleRateClick(record)}>
					{text}
				</div>
			),
		},
		{
			title: 'Заработок за часы',
			dataIndex: 'salary',
			key: 'salary',
		},
		{
			title: 'Премия',
			dataIndex: 'bonus',
			key: 'bonus',
			className: 'archi_cell',
			render: (text, record) => (
				<div
					className='cursor-pointer'
					onClick={() => handleBonusClick(record)}
				>
					{text}
				</div>
			),
		},
		{
			title: 'Штраф',
			dataIndex: 'penalty',
			key: 'penalty',
			className: 'archi_cell',
			render: (text, record) => (
				<div
					className='cursor-pointer'
					onClick={() => handlePenaltyClick(record)}
				>
					{text}
				</div>
			),
		},
		// {
		// 	title: 'База менеджера',
		// 	dataIndex: 'total_salary',
		// 	key: 'total_salary',
		// },
		{
			title: 'Зарплата',
			dataIndex: 'total',
			key: 'total',
		},
		{
			title: 'Выплачено',
			dataIndex: 'paid',
			key: 'paid',
			width: '6%',
			className: 'archi_cell',
			render: (text, record) => (
				<div className='cursor-pointer' onClick={() => handlePaidClick(record)}>
					{text}
				</div>
			),
		},
	];

	return columns;
};
