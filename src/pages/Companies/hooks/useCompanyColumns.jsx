// колонки для таблицы компаний
import { useMemo } from 'react';
import { Button, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import EditIcon from '@/components/Common/Icons/EditIcon';

const useCompanyColumns = (handleCellClick, isSuperUser) => {
	const columns = useMemo(
		() => [
			{
				title: 'Тип',
				dataIndex: 'company_type',
				key: 'company_type',
			},
			{
				title: 'Имя',
				dataIndex: 'name',
				key: 'name',
				onFilter: (value, record) =>
					record.name &&
					record.name.toString().toLowerCase().includes(value.toLowerCase()),
				filterDropdown: ({
					setSelectedKeys,
					selectedKeys,
					confirm,
					clearFilters,
				}) => (
					<div style={{ padding: 8 }}>
						<Input
							placeholder='Поиск компании'
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
			},
			{
				title: 'Юр. Адрес',
				dataIndex: 'address',
				key: 'address',
				render: (address) =>
					address.find((address) => address.type === 'Юридический Адрес')?.name,
			},
			{
				title: 'Город',
				dataIndex: 'city',
				key: 'city',
			},
			{
				title: 'Директор',
				dataIndex: 'director_full_fio',
				key: 'director_full_fio',
			},
			{
				title: 'Главбух',
				dataIndex: 'buhgalter',
				key: 'buhgalter',
			},
			{
				title: 'ИНН',
				dataIndex: 'inn',
				key: 'inn',
			},
			{
				title: 'КПП',
				dataIndex: 'kpp',
				key: 'kpp',
			},
			{
				title: 'ОГРН',
				dataIndex: 'ogrn',
				key: 'ogrn',
			},
			{
				title: 'БИК',
				dataIndex: 'bik',
				key: 'bik',
			},
			// {
			// 	title: "Банк компании",
			// 	dataIndex: "bank_name",
			// 	key: 'bank_name',
			// },
			// {
			// 	title: "Расч. счёт",
			// 	dataIndex: "bank_account_number",
			// 	key: 'bank_account_number',
			// },
			{
				title: 'Действия',
				key: 'action',
				render: (text) => {
					const { id } = text;

					return (
						<div className='d-flex gap-3 users justify-content-center'>
							<ul className='list-inline font-size-20 contact-links mb-0'>
								{/* редактировать адрес */}
								{isSuperUser && (
									<li
										className='list-inline-item text-primary cursor-pointer'
										onClick={() => {
											handleCellClick(id);
										}}
									>
										<EditIcon id={`editicon-${id}`} />
									</li>
								)}
							</ul>
						</div>
					);
				},
			},
		],
		[handleCellClick]
	);

	return { columns };
};

export default useCompanyColumns;
