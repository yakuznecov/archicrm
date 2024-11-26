// Таблица с клиентами аутстафф
import React, { useEffect, useMemo, useState } from 'react';
import TableContainer from '@/components/Common/TableContainer';
import {
	Id,
	Surname,
	Name,
	SecondName,
	DateCell,
} from '@/helpers/Table/check_value';
import { formatDate } from '@/helpers/Date/formatDate';
import { convertToISO } from '@/helpers/Date/dateFns';
import Loader from '@/components/Common/Loader';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useClientsOutstaffStore } from '@/storeZustand';

import { UncontrolledTooltip, Card, CardBody } from 'reactstrap';

import EditIcon from 'components/Common/Icons/EditIcon';

const OutstaffingCustomersTable = ({ setIsEdit, toggleModal }) => {
	const [isExpiresSwitch, setIsExpiresSwitch] = useState('false'); // истекает ли патент

	// Все клиенты аутстафф
	const [
		customersOutstaff,
		loading,
		getClientsOutstaff,
		getSingleClientOutstaff,
		clearSingleCustomerOutstaff,
		setCustomersOutstaff,
	] = useClientsOutstaffStore(
		useShallow((state) => [
			state.customersOutstaff,
			state.loading,
			state.getClientsOutstaff,
			state.getSingleClientOutstaff,
			state.clearSingleCustomerOutstaff,
			state.setCustomersOutstaff,
		])
	);

	useEffect(() => {
		getClientsOutstaff(); // получить список клиентов
	}, []);

	// Фильтр клиентов, у которых истекает срок патента менее 45 дней
	useEffect(() => {
		if (isExpiresSwitch) {
			const currentDate = new Date();
			const filteredData = customersOutstaff?.filter((item) => {
				// Преобразуем строку даты в объект Date
				const endDate = item?.approval_document?.patent_end_date;
				const formatEndDate = new Date(endDate ? convertToISO(endDate) : null);

				// Разница в миллисекундах между двумя датами
				const daysDifference = Math.ceil(
					(formatEndDate - currentDate) / (1000 * 60 * 60 * 24)
				);

				// Оставляем объекты, у которых осталось менее 45 дней до окончания
				return daysDifference < 45;
			});
			setCustomersOutstaff(filteredData);
		} else {
			getClientsOutstaff();
		}
	}, [isExpiresSwitch]);

	// Информация о конкретном клиенте
	const handleCellClick = (id) => {
		getSingleClientOutstaff(id); // запрос конкретного клиента
		setIsEdit(true);
		toggleModal();
	};

	const handleSwitchToggle = (event) => {
		setIsExpiresSwitch(event.target.checked);
	};

	// Классы для клиентов по типу шаблона
	const bgClasses = {
		Патент: 'patent_bg',
		ВНЖ: 'vng_bg',
		РВП: 'rvp_bg',
		'ИНН РФ': 'rf_bg',
		ВУ: 'vu_bg',
		Студент: 'student_bg',
	};

	// Функция для определения стиля фона
	const getCellBgStyle = (row) => {
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

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
				filterable: true,
				width: 20,
				Cell: (cellProps) => {
					return (
						<>
							<Id {...cellProps} />
							<div
								className={getCellBgStyle(cellProps.cell.row.original.document)}
							></div>
						</>
					);
				},
			},
			{
				Header: 'Фамилия',
				accessor: 'last_name',
				width: 100,
				Cell: (cellProps) => {
					return (
						<>
							<Surname {...cellProps} />
							<div
								className={getCellBgStyle(cellProps.cell.row.original.document)}
							></div>
						</>
					);
				},
			},
			{
				Header: 'Имя',
				accessor: 'first_name',
				width: 100,
				Cell: (cellProps) => {
					return (
						<>
							<Name {...cellProps} />
							<div
								className={getCellBgStyle(cellProps.cell.row.original.document)}
							></div>
						</>
					);
				},
			},
			{
				Header: 'Отчество',
				accessor: 'second_name',
				width: 100,
				Cell: (cellProps) => {
					return (
						<>
							<SecondName {...cellProps} />
							<div
								className={getCellBgStyle(cellProps.cell.row.original.document)}
							></div>
						</>
					);
				},
			},
			{
				Header: 'Профессия',
				accessor: 'profession',
				width: 200,
				Cell: (cellProps) => {
					return (
						<>
							<Name {...cellProps} />
							<div
								className={getCellBgStyle(cellProps.cell.row.original.document)}
							></div>
						</>
					);
				},
			},
			{
				Header: 'Гражданство',
				accessor: 'document',
				width: 170,
				Cell: (cellProps) => {
					const templates =
						cellProps?.row?.original?.document[0]?.fields['Гражданство'];
					return (
						<>
							<span>{templates}</span>
							<div
								className={getCellBgStyle(cellProps.cell.row.original.document)}
							></div>
						</>
					);
				},
			},
			{
				Header: 'Компания',
				accessor: 'company.name',
				width: 150,
				Cell: (cellProps) => {
					return (
						<>
							<Name {...cellProps} />
							<div
								className={getCellBgStyle(cellProps.cell.row.original.document)}
							></div>
						</>
					);
				},
			},
			{
				Header: 'Город',
				accessor: 'company.city',
				width: 140,
				Cell: (cellProps) => {
					return (
						<>
							<Name {...cellProps} />
							<div
								className={getCellBgStyle(cellProps.cell.row.original.document)}
							></div>
						</>
					);
				},
			},
			{
				Header: 'Оконч. патента',
				accessor: '',
				width: 40,
				Cell: (cellProps) => {
					const patentDate =
						cellProps?.row?.original?.document[1]?.fields[
							'Дата окончания патента'
						];
					const formatPatentDate = patentDate ? formatDate(patentDate) : '';
					return (
						<>
							<span>{formatPatentDate}</span>
							<div
								className={getCellBgStyle(cellProps.cell.row.original.document)}
							></div>
						</>
					);
				},
			},
			{
				Header: 'Дата оформл.',
				accessor: 'date_created',
				width: 40,
				Cell: (cellProps) => {
					return (
						<>
							<DateCell {...cellProps} />
							<div
								className={getCellBgStyle(cellProps.cell.row.original.document)}
							></div>
						</>
					);
				},
			},
			{
				Header: 'Комментарий',
				accessor: 'description',
				width: 140,
				Cell: (cellProps) => {
					return (
						<>
							<Name {...cellProps} />
							<div
								className={getCellBgStyle(cellProps.cell.row.original.document)}
							></div>
						</>
					);
				},
			},
			{
				Header: 'Действия',
				accessor: 'action',
				disableFilters: true,
				textAlign: 'center',
				width: 30,
				Cell: (cellProps) => {
					return (
						<div className='d-flex gap-3 users justify-content-center'>
							<ul className='list-inline font-size-20 contact-links mb-0'>
								{/* edit customers */}
								<li
									className='list-inline-item text-primary cursor-pointer'
									onClick={() => {
										const { id } = cellProps.row.original;
										clearSingleCustomerOutstaff(); // очистить конкретного клиента перед загрузкой нового
										handleCellClick(id);
									}}
								>
									<EditIcon id={`edittooltip-${cellProps.row.index}`} />

									<UncontrolledTooltip
										placement='top'
										target={`edittooltip-${cellProps.row.index}`}
									>
										Изменить данные клиента
									</UncontrolledTooltip>
								</li>
							</ul>
						</div>
					);
				},
			},
		],
		[handleCellClick]
	);

	return (
		<Card>
			<CardBody>
				{loading && <Loader />}
				{!loading && customersOutstaff && customersOutstaff?.length > 0 && (
					<TableContainer
						columns={columns}
						data={customersOutstaff}
						isGlobalFilter={true}
						isAddUsers={true}
						isAddTableWithoutBorderStrap={true}
						hasSwitch={true}
						isSwitchChecked={isExpiresSwitch}
						handleSwitch={handleSwitchToggle}
						switchLabelText='Истекает патент'
						sortById={true}
						tableTrBgNone={true}
						tableTdColorBold={true}
					/>
				)}
			</CardBody>
		</Card>
	);
};

export default OutstaffingCustomersTable;
