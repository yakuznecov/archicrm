// колонки для таблицы договоров в аутстафф
import { useMemo } from 'react';
import { Space, Input, Button, Tag, Flex } from 'antd';
import { formatDate } from '@/helpers/Date/formatDate';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useContractsStore, useUserStore } from '@/storeZustand';

import { SearchOutlined, DeleteFilled } from '@ant-design/icons';
import EditIcon from '@/components/Common/Icons/EditIcon';

// Классы для клиентов по типу шаблона
const bgClasses = {
	Патент: 'patent_bg',
	ВНЖ: 'vng_bg',
	РВП: 'rvp_bg',
	'ИНН РФ': 'rf_bg',
	ВУ: 'vu_bg',
	Студент: 'student_bg',
};

const useContractTableColumns = (handleCellClick, showDeleteConfirm) => {
	// Договоры клиента
	const [
		contractsList, // список договоров
	] = useContractsStore(useShallow((state) => [state.contractsList]));

	// Загрузка данных суперюзера
	const [isSuperUser] = useUserStore(
		useShallow((state) => [state.isSuperUser])
	);
	// console.log('isSuperUser', isSuperUser);

	// Компании для фильтров колонки
	const mapCompanyName = contractsList?.reduce((acc, contract) => {
		if (!acc.some((item) => item.value === contract?.client?.company?.id)) {
			acc.push({
				text: contract?.client?.company?.name,
				value: contract?.client?.company?.id,
			});
		}
		return acc;
	}, []);

	// Тарифы для фильтров колонки
	const mapRateName = contractsList?.reduce((acc, contract) => {
		if (!acc.some((item) => item.value === contract?.contract_service[0]?.id)) {
			acc.push({
				text: contract?.contract_service[0]?.price,
				value: contract?.contract_service[0]?.id,
			});
		}
		return acc;
	}, []);

	// Функция для определения стиля фона
	const getCellBgStyle = (row) => {
		if (!row) {
			return '';
		}

		const names = Object.values(row).map((item) => item?.name);

		for (const name of names) {
			if (bgClasses[name]) {
				return bgClasses[name];
			}
		}

		if (names[0] === 'Паспорт') {
			return 'eas_bg';
		}
	};

	// Функция для определения стиля фона ячейки
	const cellBgStyle = (data) => <div className={getCellBgStyle(data)}></div>;

	const columns = useMemo(
		() => [
			{
				title: 'id',
				dataIndex: 'id',
				key: 'id',
				hidden: true, // скрыть столбец
				sorter: (a, b) => a.id - b.id,
				defaultSortOrder: 'descend', // сортировка по возрастанию
				render: (text, record) => (
					<>
						<span>{text}</span>
						{cellBgStyle(record?.client?.document)}
					</>
				),
			},
			{
				title: '№',
				dataIndex: 'contract_number',
				key: 'contract_number',
				render: (client, record, index) => (
					<>
						<span>{client}</span>
						{cellBgStyle(record?.client?.document)}
					</>
				),
			},
			{
				title: 'Фамилия',
				dataIndex: 'client',
				key: 'client_document',
				sorter: (a, b) =>
					a.client?.last_name.localeCompare(b.client?.last_name),
				render: (client, _, index) => (
					<>
						<span>{client?.last_name}</span>
						{cellBgStyle(client?.document)}
					</>
				),
			},
			{
				title: 'Имя',
				dataIndex: 'client',
				key: 'client_first_name',
				onFilter: (value, record) =>
					record.client.first_name &&
					record.client.first_name
						.toString()
						.toLowerCase()
						.includes(value.toLowerCase()),
				filterDropdown: ({
					setSelectedKeys,
					selectedKeys,
					confirm,
					clearFilters,
				}) => (
					<div style={{ padding: 8 }}>
						<Input
							placeholder='Поиск имени'
							value={selectedKeys[0]}
							onChange={(e) =>
								setSelectedKeys(e.target.value ? [e.target.value] : [])
							}
							onPressEnter={() => confirm()}
							style={{ width: 188, marginBottom: 8, display: 'block' }}
						/>
						<Space>
							<Button
								type='primary'
								onClick={() => confirm()}
								icon={<SearchOutlined />}
								size='small'
								style={{ width: 90 }}
							>
								Поиск
							</Button>
							<Button
								onClick={() => {
									clearFilters();
									confirm();
								}}
								size='small'
								style={{ width: 90 }}
							>
								Сброс
							</Button>
						</Space>
					</div>
				),
				filterIcon: (filtered) => (
					<SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
				),
				render: (client, _, index) => (
					<>
						<span>{client?.first_name}</span>
						<div className={getCellBgStyle(client?.document)}></div>
					</>
				),
			},
			{
				title: 'Отчество',
				dataIndex: 'client',
				key: 'client_second_name',
				render: (client, _, index) => (
					<>
						<span>{client?.second_name}</span>
						{cellBgStyle(client?.document)}
					</>
				),
			},
			{
				title: 'Профессия',
				dataIndex: 'client',
				key: 'client_profession',
				width: '7%',
				render: (client, _, index) => (
					<>
						<span>{client?.profession}</span>
						{cellBgStyle(client?.document)}
					</>
				),
			},
			{
				title: 'Гражданство',
				dataIndex: 'client',
				key: 'client_templates',
				width: '5%',
				render: (client, _, index) => {
					const templates = client?.document[0]?.fields['Гражданство'];
					return (
						<>
							<span>{templates}</span>
							{cellBgStyle(client?.document)}
						</>
					);
				},
			},
			{
				title: 'Компания',
				dataIndex: 'client',
				key: 'client_company_name',
				filters: mapCompanyName,
				onFilter: (value, record) => record.client?.company?.id === value,
				render: (client, _, index) => (
					<>
						<span>{client?.company?.name}</span>
						<div className={getCellBgStyle(client?.document)}></div>
					</>
				),
			},
			{
				title: 'Заказчик',
				dataIndex: 'contr_agent',
				key: 'contr_agent',
				render: (text, record) => (
					<>
						<span>{text?.company?.name}</span>
						<div className={getCellBgStyle(record?.client?.document)}></div>
					</>
				),
			},
			{
				title: 'Тариф',
				dataIndex: 'contract_service',
				key: 'rate',
				filters: mapRateName,
				onFilter: (value, record) => record.contract_service[0]?.id === value,
				render: (text, record) => (
					<>
						<span>{text[0]?.price}</span>
						{cellBgStyle(record?.client?.document)}
					</>
				),
			},
			{
				title: 'Город',
				dataIndex: 'client',
				key: 'client_company_city',
				render: (client, _, index) => (
					<>
						<span>{client?.company?.city}</span>
						<div className={getCellBgStyle(client?.document)}></div>
					</>
				),
			},
			// {
			// 	title: "Шаблон",
			// 	dataIndex: "template_set",
			// 	key: "template_set_name",
			// 	// filters: mapTemplate,
			// 	// onFilter: (value, record) => record?.template_set?.id === value,
			// 	render: (_, record) => (
			// 		<>
			// 			<span>{record?.template_set?.name}</span>
			// 			<div className={getCellBgStyle(record?.client?.document)}></div>
			// 		</>
			// 	)
			// },
			{
				title: 'Оконч. патента',
				dataIndex: 'client',
				key: 'client_patentDate',
				sorter: (a, b) => {
					return (
						new Date(b?.client?.document[1]?.fields?.End).getTime() -
						new Date(a?.client?.document[1]?.fields?.End).getTime()
					);
				},
				render: (client, _, index) => {
					const patentDate = client?.document[1]?.fields['End'];
					const formatPatentDate = patentDate ? formatDate(patentDate) : '';
					return (
						<>
							<span>{formatPatentDate}</span>
							<div className={getCellBgStyle(client?.document)}></div>
						</>
					);
				},
			},
			{
				title: 'Дата оформл.',
				dataIndex: 'contract_date',
				key: 'contract_date',
				render: (date, record) => (
					<>
						<span>{formatDate(date)}</span>
						<div className={getCellBgStyle(record?.client?.document)}></div>
					</>
				),
			},
			{
				title: 'Дата увол.',
				dataIndex: 'order_fire_date',
				key: 'order_fire_date',
				width: '5%',
				render: (date, record) => (
					<>
						<span>{formatDate(date)}</span>
						<div className={getCellBgStyle(record?.client?.document)}></div>
					</>
				),
			},
			{
				title: 'Комментарий',
				dataIndex: 'client',
				key: 'client_description',
				onFilter: (value, record) =>
					record.client.description &&
					record.client.description
						.toString()
						.toLowerCase()
						.includes(value.toLowerCase()),
				filterDropdown: ({
					setSelectedKeys,
					selectedKeys,
					confirm,
					clearFilters,
				}) => (
					<div style={{ padding: 8 }}>
						<Input
							placeholder='Поиск комментария'
							value={selectedKeys[0]}
							onChange={(e) =>
								setSelectedKeys(e.target.value ? [e.target.value] : [])
							}
							onPressEnter={() => confirm()}
							style={{ width: 188, marginBottom: 8, display: 'block' }}
						/>
						<Space>
							<Button
								type='primary'
								onClick={() => confirm()}
								icon={<SearchOutlined />}
								size='small'
								style={{ width: 90 }}
							>
								Поиск
							</Button>
							<Button
								onClick={() => {
									clearFilters();
									confirm();
								}}
								size='small'
								style={{ width: 90 }}
							>
								Сброс
							</Button>
						</Space>
					</div>
				),
				filterIcon: (filtered) => (
					<SearchOutlined
						style={{ color: filtered ? '#1677ff' : '#000', fontSize: 16 }}
					/>
				),
				render: (client, _, index) => (
					<>
						<span>{client?.description}</span>
						<div className={getCellBgStyle(client?.document)}></div>
					</>
				),
			},
			{
				title: 'Действия',
				dataIndex: '',
				key: 'actions',
				render: (text, _, index) => {
					// console.log("text", text);
					const { id, on_fire, contract_number } = text;

					return (
						<Flex gap={5} justify='space-evenly' align='center' key={index}>
							{/* удаление договора */}
							{isSuperUser && (
								<span
									className='cursor-pointer'
									onClick={() => showDeleteConfirm(id, contract_number)}
								>
									<DeleteFilled style={{ color: '#ee7269' }} />
								</span>
							)}
							<span>{on_fire && <Tag color='error'>Увол.</Tag>}</span>
							<li
								className='list-inline-item text-primary cursor-pointer'
								onClick={() => {
									handleCellClick(id);
								}}
							>
								<EditIcon id={`editicon=${id}`} />
							</li>
						</Flex>
					);
				},
			},
		],
		[handleCellClick]
	);

	return columns;
};

export default useContractTableColumns;
