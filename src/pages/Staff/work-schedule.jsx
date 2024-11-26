// WorkSchedule, График работы
import React, { useEffect, useMemo, useState } from 'react';
import { Col, Row, Card, Modal } from 'antd';

import cn from 'classnames';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
import { useTable } from 'react-table';
import { isBefore, parseISO, setHours, startOfToday } from 'date-fns';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '@/scss/modules/WorkSchedule.module.scss';
import { Id } from './WorkSheduleCol';
import { getCurrentYear } from '@/helpers/Date/getYear';
import { getMonthName } from '@/helpers/Date/getMonth';
import {
	formatDateString,
	formatIsoTimeToString,
	getLastDayOfMonth,
	getFirstDayOfMonth,
} from '@/helpers/Date/formatDate';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useDepartmentsStore,
	useStaffStore,
	useWorkSheduleStore,
} from '@/storeZustand';

import { Table } from 'reactstrap';
import CustomDatePicker from '@/components/Common/CustomDatePicker';
import CustomRadioStaff from './customRadioStaff';
import Loader from '@/components/Common/Loader';
registerLocale('ru', ru);

const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1;

const WorkSchedule = () => {
	const [modal_center, setmodal_center] = useState(false);
	const [startDate, setStartDate] = useState(getFirstDayOfMonth());
	const [endDate, setEndDate] = useState(getLastDayOfMonth());
	const [startTime, setStartTime] = useState();
	const [endTime, setEndTime] = useState();
	const [selectedMonth, setSelectedMonth] = useState(currentMonth);
	const [data, setData] = useState([]);
	const [specialist, setSpecialist] = useState([]);
	// Если отпуск ранее не выбран, чекбокс есть в модальном окне
	const [isCheckboxHoliday, setIsCheckboxHoliday] = useState(true);
	// Выходной день
	const [isWeekend, setIsWeekend] = useState(false);
	// Отпуск
	const [isHoliday, setIsHoliday] = useState(false);
	const [selectedRadioStaff, setSelectedRadioStaff] = useState('adm');
	console.log('selectedRadioStaff', selectedRadioStaff);

	// Выбранный департамент
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	// Список  сотрудников департамента
	const [
		departmentStaff,
		getSpecialistStaff,
		getAdminStaff,
		getCallcenterStaff,
		workScheduleStaffList,
	] = useStaffStore(
		useShallow((state) => [
			state.departmentStaff,
			state.getSpecialistStaff,
			state.getAdminStaff,
			state.getCallcenterStaff,
			state.workScheduleStaffList,
		])
	);

	const [
		getWorkShedule,
		workShedule,
		clearWorkShedule,
		newDateSpecialist,
		updateSpecialist,
		deleteDate,
		loading,
	] = useWorkSheduleStore(
		useShallow((state) => [
			state.getWorkShedule,
			state.workShedule,
			state.clearWorkShedule,
			state.newDateSpecialist,
			state.updateSpecialist,
			state.deleteDate,
			state.loading,
		])
	);

	const fetchWorkSheduleData = (id) => {
		getWorkShedule({
			department_id: id,
			start_date: startDate,
			end_date: endDate,
		});
	};

	// Отправка запроса на получение рабочего времени с выбранным месяцем
	useEffect(() => {
		if (selectedDepartment && selectedRadioStaff === 'adm') {
			fetchWorkSheduleData(selectedDepartment);
			getAdminStaff(selectedDepartment);
		}

		// clearWorkShedule();
	}, [
		selectedDepartment,
		startDate,
		endDate,
		newDateSpecialist,
		updateSpecialist,
	]);

	useEffect(() => {
		// Объединяем информацию из двух массивов
		const combinedArray = workScheduleStaffList?.map((item) => {
			const staffId = item.id;
			const staff = item;

			const workingDates = staff
				? workShedule
						?.filter((secondItem) => secondItem.staff.id === staffId)
						.map((secondItem) => {
							return {
								is_day_off: secondItem.is_day_off,
								working_date: secondItem.working_date,
								start_date_time: secondItem.start_date_time,
								finish_date_time: secondItem.finish_date_time,
							};
						})
				: [];

			return {
				staff,
				workingDates,
			};
		});

		setData(combinedArray);
	}, [workShedule, selectedDepartment, departmentStaff, workScheduleStaffList]);

	// Radio staff, смена профессии
	const handleProfStaffChange = (event) => {
		const value = event.target.value;
		setSelectedRadioStaff(value);

		if (value === 'adm') {
			getAdminStaff(selectedDepartment);
		} else if (value === 'spec') {
			getSpecialistStaff(selectedDepartment);
		} else {
			fetchWorkSheduleData(9);
			getCallcenterStaff();
		}
	};

	// update time
	const newDateSpecialistHandle = (createNewDate) => {
		return new Promise((resolve, reject) => {
			newDateSpecialist(createNewDate).then(resolve).catch(reject);
		});
	};

	// update time
	const updateTimeSpecialistHandle = (changedSpecialist, id) => {
		return new Promise((resolve, reject) => {
			updateSpecialist({ changedSpecialist, id }).then(resolve).catch(reject);
		});
	};

	// delete time
	const deleteTimeSpecialistHandle = (id) => {
		return new Promise((resolve, reject) => {
			deleteDate(id).then(resolve).catch(reject);
		});
	};

	// get WorkShedule
	const getWorkSheduleHandle = () => {
		return new Promise((resolve, reject) => {
			getWorkShedule({
				department_id: selectedDepartment,
				start_date: startDate,
				end_date: endDate,
			})
				.then(resolve)
				.catch(reject);
		});
	};

	// update time in modal
	const updateSpecialistHandle = async () => {
		const id = specialist ? specialist.id : 0;
		const staffId = specialist ? specialist.staffId : 0;
		const workingDate = formatIsoTimeToString(startTime);

		try {
			if (id) {
				const changedSpecialist = {
					start_date_time: startTime,
					finish_date_time: endTime,
					is_day_off: isHoliday,
					working_date: workingDate,
				};

				// если выбран выходной, то удаление, либо обновление
				if (isWeekend) {
					await deleteTimeSpecialistHandle(id);
				} else {
					await updateTimeSpecialistHandle(changedSpecialist, id);
				}

				tog_center();
			} else {
				const createNewDate = {
					staff: staffId,
					start_date_time: startTime,
					finish_date_time: endTime,
					is_day_off: isHoliday,
					working_date: workingDate,
				};

				await newDateSpecialistHandle(createNewDate);

				tog_center();
			}

			if (selectedDepartment && selectedRadioStaff === 'adm') {
				fetchWorkSheduleData(selectedDepartment);
				getAdminStaff(selectedDepartment);
			} else if (selectedRadioStaff === 'call') {
				fetchWorkSheduleData(9);
				getCallcenterStaff();
			} else if (selectedDepartment && selectedRadioStaff === 'spec') {
				fetchWorkSheduleData(selectedDepartment);
				getSpecialistStaff(selectedDepartment);
			}
		} catch (error) {
			console.error('Error', error);
		}
	};

	const onChangeTime = (date) => {
		setStartTime(date);
	};

	const onChangeEndTime = (date) => {
		setEndTime(date);
	};

	// модальное окно по центру
	const tog_center = () => {
		setmodal_center((prevstate) => !prevstate);
		setIsHoliday(false);
		setIsWeekend(false);
	};

	const cancelModal = () => {
		tog_center();
	};

	// Фильтр по дате и сотруднику для получения id записи в массиве
	function findScheduleIdByDateAndStaffId(date, staffId) {
		const filteredSchedules = workShedule?.filter((schedule) => {
			return schedule.working_date === date && schedule.staff?.id === staffId;
		});

		if (filteredSchedules?.length > 0) {
			return filteredSchedules[0].id;
		} else {
			return null;
		}
	}

	// Клик по дате в ячейке таблицы
	const handleCellClick = (rowData, dateString) => {
		const staffId = rowData.staff.id;
		// получить id записи
		const id = findScheduleIdByDateAndStaffId(dateString, staffId);

		const filteredDate = rowData.workingDates?.filter(
			(item) => item.working_date === dateString
		);

		if (filteredDate?.length > 0) {
			const isDayOff = filteredDate[0].is_day_off;
			setIsCheckboxHoliday(!isDayOff);
		}

		setSpecialist({ id: id, staffId: staffId });

		const date = parseISO(dateString);
		// console.log('date in handleCellClick', date);
		const start = setHours(date, 9);
		const end = setHours(date, 21);

		setStartTime(start);
		setEndTime(end);

		// Дата меньше текущей даты, модальное окно не будет открыто
		if (isBefore(date, startOfToday())) {
			return;
		}

		tog_center();
	};

	// Получение даты начала и конца месяца
	const handleRadioChange = (selectedMonth) => {
		const currentDate = new Date();
		const currentYear = currentDate.getFullYear();

		const newStartDate = new Date(currentYear, selectedMonth - 1, 1);
		const newEndDate = new Date(currentYear, selectedMonth, 0);

		return {
			newStartDate,
			newEndDate,
		};
	};

	// Выбор radio
	const handleChange = (event) => {
		const selectedMonth = event.target.value;
		setSelectedMonth(Number(selectedMonth));

		const { newStartDate, newEndDate } = handleRadioChange(selectedMonth);

		setStartDate(formatIsoTimeToString(newStartDate));
		setEndDate(formatIsoTimeToString(newEndDate));
	};

	// Колонки таблицы
	const columns = useMemo(() => {
		// Колонки дат
		const currentDate = new Date();
		const currentYear = currentDate.getFullYear();

		const firstDayOfMonth = new Date(currentYear, selectedMonth - 1, 1);

		const lastDayOfMonth = new Date(currentYear, selectedMonth, 0);

		const dates = [];

		for (
			let date = new Date(firstDayOfMonth);
			date <= lastDayOfMonth;
			date.setDate(date.getDate() + 1)
		) {
			const adjustedDate = new Date(
				date.getTime() - date.getTimezoneOffset() * 60000
			);
			dates.push(adjustedDate.toISOString());
		}

		return [
			{
				Header: 'ID',
				accessor: 'staff.id',
				width: 40,
				Cell: (cellProps) => {
					return <Id {...cellProps} />;
				},
			},
			{
				Header: 'Сотрудники',
				accessor: 'staff.name',
				width: 150,
				Cell: ({ row }) => (
					<div className={style.cell__staff}>
						<div className='avatar__archi'>
							{row.original.staff?.name?.charAt(0).toUpperCase() +
								row.original.staff?.surname?.charAt(0).toUpperCase()}
						</div>
						<div>
							<div className={style.position}>
								{row.original.staff?.profession_name.profession_name}
							</div>
							<div
								className={style.name}
							>{`${row.original.staff?.name} ${row.original.staff?.surname}`}</div>
						</div>
					</div>
				),
			},
			...dates.map((date, index) => {
				// console.log('index', index);
				// console.log('date', date);
				return {
					Header: () => (
						<div className={style.cell__date}>{formatDateString(date)}</div>
					),
					accessor: `dates[${index}]`,
					width: 30,
					Cell: ({ cell }) => {
						const rowData = cell.row.original; // данные строки
						const dateString = date.substring(0, 10);
						// console.log('rowData', rowData);

						// console.log('date', date);

						// Find the workingDate for the current date
						const workingDate = rowData.workingDates.find(
							(workingDate) => workingDate.working_date === dateString
						);

						// console.log('workingDate', workingDate);

						if (workingDate) {
							// Проверяем, был ли найден рабочий день с соответствующей датой
							const startDateTimeString = new Date(workingDate.start_date_time);
							const finishDateTimeString = new Date(
								workingDate.finish_date_time
							);
							const isDayOff = workingDate.is_day_off;

							const startDateTime = startDateTimeString.toLocaleTimeString([], {
								hour: '2-digit',
								minute: '2-digit',
							});
							const finishDateTime = finishDateTimeString.toLocaleTimeString(
								[],
								{ hour: '2-digit', minute: '2-digit' }
							);

							return (
								<div
									{...cell.getCellProps()}
									className={style.cell}
									onClick={() => handleCellClick(cell.row.original, dateString)}
									data-toggle='modal'
									data-target='.bs-example-modal-center'
									style={{
										backgroundColor:
											isDayOff === true
												? 'rgba(255, 236, 67, 0.5)'
												: 'rgba(57, 213, 18, 0.3)',
									}}
								>
									{!isDayOff ? `${startDateTime} ${finishDateTime}` : ''}
								</div>
							);
						}

						return (
							<div
								{...cell.getCellProps()}
								className={style.cell}
								onClick={() => handleCellClick(cell.row.original, dateString)}
								data-toggle='modal'
								data-target='.bs-example-modal-center'
							></div>
						);
					},
				};
			}),
		];
	}, [data, selectedMonth]);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ columns, data });

	return (
		<div className='page-content'>
			<div className='container-fluid'>
				<Row gutter={6} className='align-items-center justify-content-between'>
					<Col span={16}>
						<div className='work__shedule_radio'>
							<div
								className='btn-group'
								role='group'
								aria-label='Basic radio toggle button group'
							>
								{Array.from({ length: 12 }, (_, index) => {
									const monthNumber = index + 1;
									const monthName = new Date(0, index).toLocaleString(
										'default',
										{ month: 'long' }
									);
									const isChecked = selectedMonth === monthNumber;

									return (
										<React.Fragment key={monthNumber}>
											<input
												type='radio'
												className='btn-check'
												name='btnradio'
												id={`btnradio${monthNumber}`}
												autoComplete='off'
												checked={isChecked}
												value={monthNumber}
												onChange={handleChange}
											/>
											<label
												className='btn btn-light archi__radio_btn'
												htmlFor={`btnradio${monthNumber}`}
											>
												{monthName}
											</label>
										</React.Fragment>
									);
								})}
							</div>
						</div>
					</Col>
					<Col span={8}>
						<CustomRadioStaff onChange={handleProfStaffChange} />
					</Col>
				</Row>

				<Row>
					<Col span={24}>
						<Card className={style.schedule__wrapper}>
							{loading && <Loader />}
							{!loading && workShedule?.length >= 0 && (
								<>
									<div className={style.table__month}>
										{getMonthName(selectedMonth)} {getCurrentYear()}
									</div>
									<div
										className={cn(style.table__container, 'table-responsive')}
									>
										<Table
											{...getTableProps()}
											style={{ minWidth: '800px', borderCollapse: 'collapse' }}
											className={style.schedule__table}
										>
											<thead>
												{headerGroups?.map((headerGroup) => (
													<tr
														key={headerGroup.id}
														{...headerGroup.getHeaderGroupProps()}
													>
														{headerGroup.headers?.map((column) => (
															<th
																key={column.id}
																{...column.getHeaderProps()}
																style={{
																	borderBottom: '1px solid rgba(0, 0, 0, 0.5)',
																	padding: '8px',
																	width: column.width,
																}}
															>
																{column.render('Header')}
															</th>
														))}
													</tr>
												))}
											</thead>
											<tbody {...getTableBodyProps()}>
												{rows.map((row) => {
													prepareRow(row);
													return (
														<React.Fragment key={row.id}>
															<tr {...row.getRowProps()}>
																{row.cells.map((cell, index) => {
																	if (index === 0) {
																		return (
																			<td
																				key={index}
																				{...cell.getCellProps()}
																				style={{
																					borderBottom:
																						'1px solid rgba(0, 0, 0, 0.5)',
																					border:
																						'1px solid rgba(0, 0, 0, 0.5)',
																					padding: '8px',
																				}}
																			>
																				{cell.render('Cell')}
																			</td>
																		);
																	} else {
																		return (
																			<td
																				{...cell.getCellProps()}
																				style={{
																					borderBottom:
																						'1px solid rgba(0, 0, 0, 0.5)',
																					border:
																						'1px solid rgba(0, 0, 0, 0.5)',
																					padding: '8px',
																				}}
																			>
																				{cell.render('Cell')}
																			</td>
																		);
																	}
																})}
															</tr>
														</React.Fragment>
													);
												})}
											</tbody>
										</Table>
									</div>
								</>
							)}
						</Card>
					</Col>
				</Row>
			</div>

			<Modal
				title='Установить время работы'
				open={modal_center}
				footer={null}
				onCancel={cancelModal}
				width={400}
			>
				<div className='modal-body'>
					<div className='mb-3'>
						<label className='form-label'>Время начала работы</label>
						<CustomDatePicker selected={startTime} setDate={onChangeTime} />
					</div>
					<div className='mb-3'>
						<label className='form-label'>Время окончания работы</label>
						<CustomDatePicker selected={endTime} setDate={onChangeEndTime} />
					</div>
					{/* Если отпуск ранее выбран, чекбокса не будет */}
					{isCheckboxHoliday && (
						<div className='form-check mb-4'>
							<input
								className='form-check-input'
								type='checkbox'
								value={isHoliday}
								checked={isHoliday}
								id='holiday'
								onChange={(event) => setIsHoliday(event.target.checked)}
							/>
							<label className='form-check-label' htmlFor='holiday'>
								Отпуск
							</label>
						</div>
					)}
					<div className='form-check mb-4'>
						<input
							className='form-check-input'
							type='checkbox'
							value={isWeekend}
							checked={isWeekend}
							id='weekend'
							onChange={(event) => setIsWeekend(event.target.checked)}
						/>
						<label className='form-check-label' htmlFor='weekend'>
							Выходной день
						</label>
					</div>
					<button
						className='archi__btn archi__btn-green'
						onClick={updateSpecialistHandle}
					>
						Сохранить
					</button>
				</div>
			</Modal>
		</div>
	);
};

export default WorkSchedule;
