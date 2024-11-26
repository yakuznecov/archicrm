import React, { Fragment, useEffect, useState } from "react";
import { Table, Row, Col, Button, Input } from "reactstrap";
import { DefaultColumnFilter } from "./filters";

import {
	useTable,
	useGlobalFilter,
	useSortBy,
	useFilters,
	useExpanded,
	usePagination,
	useRowSelect,
} from "react-table";

const TableContainer = ({
	columns,
	data,
	isAddTableWithoutBorderStrap,
	isAddTableBorderStrap,
	hasSearch = true,
	hasSwitch = false,
	hasPagination = true,
	switchLabelText,
	isSwitchChecked,
	handleSwitch,
	sortById,
	tableTrBgNone = false,
	tableTdColorBold = false, // Шрифт 700
}) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		prepareRow,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		state: { pageIndex, pageSize }, // Доступ к значениям pageIndex и globalFilter из state
		setGlobalFilter, // глобальный поиск
		setPageSize,
	} = useTable(
		{
			columns,
			data,
			defaultColumn: { Filter: DefaultColumnFilter },
			initialState: {
				pageIndex: 0, pageSize: 50,
				autoResetFilters: true,
				sortBy: [
					{
						id: sortById ? 'id' : '',
						desc: true,
					},
				]
			},
		},
		// Использование глобального фильтра
		useGlobalFilter,
		useFilters,
		useSortBy,
		useExpanded,
		usePagination,
		useRowSelect,
	);

	// Договоры клиента
	// const [
	// 	searchValue, // значение поиска
	// ] = useContractsStore(useShallow((state) => [
	// 	state.searchValue,
	// ]));

	const [inputValue, setInputValue] = useState('');
	const [timeoutId, setTimeoutId] = useState(null);

	const handleInputChange = (e) => {
		const value = e.target.value;
		setInputValue(value);

		clearTimeout(timeoutId);

		const newTimeoutId = setTimeout(() => {
			setGlobalFilter(value);
		}, 800);

		setTimeoutId(newTimeoutId);
	};

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [pageIndex]);

	const generateSortingIndicator = (column) => {
		return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
	};

	const onChangeInInput = (event) => {
		const page = event.target.value ? Number(event.target.value) - 1 : 0;
		gotoPage(page);
	};

	function handlePageSizeChange(e) {
		const newSize = Number(e.target.value);
		setPageSize(newSize);
	}

	// Если true, то строки tr не имеют цвета
	const tableTrBg = tableTrBgNone ? '' : 'archi__table_container';
	// Если true, то столбцы td имеют жирность 700
	const tableTdColor = tableTdColorBold ? 'archi__table_bold' : '';

	return (
		<Fragment>
			<div className="archi__header">
				{hasSearch && (
					<div className="archi__header_search">
						<Input
							name="search"
							className="custom__input"
							type="text"
							value={inputValue}
							onChange={handleInputChange} // Обработчик изменения значения поиска
							placeholder="Поиск..."
						/>
					</div>
				)}
				{/* Переключатель */}
				{hasSwitch && (
					<div className="form-check form-switch form-switch-lg">
						<input
							type="checkbox"
							className="form-check-input"
							id="customSwitchsizelg"
							name="customSwitchsizelg"
							сhecked={isSwitchChecked}
							onChange={handleSwitch}
						/>
						<label
							className="form-check-label"
							htmlFor="customSwitchsizelg"
						>
							{switchLabelText}
						</label>
					</div>
				)}
			</div>
			{isAddTableWithoutBorderStrap && (
				<div className={`table-responsive ${tableTrBg}`}>
					<Table bordered hover {...getTableProps()} className={`react_table archi__table ${tableTdColor}`} style={{ width: '100%' }}>
						<thead className="table-nowrap">
							{headerGroups?.map((headerGroup) => (
								<tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
									{headerGroup.headers?.map((column) => (
										<th key={column.id} style={{ width: column.width, textAlign: column.textAlign }}>
											<div {...column.getSortByToggleProps()}>
												{column.render("Header")}
												{generateSortingIndicator(column)}
											</div>
											{/* <Filter column={column} /> */}
										</th>
									))}
								</tr>
							))}
						</thead>

						<tbody {...getTableBodyProps()}>
							{page.map((row) => {
								prepareRow(row);
								return (
									<Fragment key={row.getRowProps().key}>
										<tr>
											{row.cells.map((cell) => {
												return (
													<td key={cell.id} {...cell.getCellProps()}>
														{cell.render("Cell")}
													</td>
												);
											})}
										</tr>
									</Fragment>
								);
							})}
						</tbody>
					</Table>
				</div>
			)}

			{isAddTableBorderStrap && (
				<div className="table-responsive">
					<Table
						className="table-centered datatable dt-responsive nowrap table-card-list react_table"
						{...getTableProps()}
					>
						<thead className="table-nowrap">
							{headerGroups?.map((headerGroup) => (
								<tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
									{headerGroup.headers?.map((column) => (
										<th key={column.id} {...column.getSortByToggleProps()}>
											{column.render("Header")}
											{generateSortingIndicator(column)}
											{/* <div >
                      </div> */}
											{/* <Filter column={column} /> */}
										</th>
									))}
								</tr>
							))}
						</thead>

						<tbody {...getTableBodyProps()}>
							{page.map((row) => {
								prepareRow(row);

								return (
									<Fragment key={row.getRowProps().key}>
										<tr>
											{row.cells.map((cell) => {
												return (
													<td key={cell.id} {...cell.getCellProps()}>
														{cell.render("Cell")}
													</td>
												);
											})}
										</tr>
									</Fragment>
								);
							})}
						</tbody>
					</Table>
				</div>
			)}

			{hasPagination && (
				<Row className="justify-content-md-end justify-content-center align-items-center">
					<Col className="col-md-auto">
						<div className="select-container">
							<select value={pageSize} onChange={handlePageSizeChange} style={{ width: '190px' }}>
								{[10, 20, 30, 50].map((size) => (
									<option value={size} key={size}>
										Показать {size} строк
									</option>
								))}
							</select>
						</div>
					</Col>
					<Col className="col-md-auto">
						<div className="d-flex gap-1">
							<Button
								color="primary"
								onClick={() => gotoPage(0)}
								disabled={!canPreviousPage}
							>
								{"<<"}
							</Button>
							<Button
								color="primary"
								onClick={previousPage}
								disabled={!canPreviousPage}
							>
								{"<"}
							</Button>
						</div>
					</Col>
					<Col className="col-md-auto d-none d-md-block">
						Страница{" "}
						<strong>
							{pageIndex + 1} из {pageOptions.length}
						</strong>
					</Col>
					<Col className="col-md-auto">
						<Input
							type="number"
							min={1}
							style={{ width: 70 }}
							max={pageOptions.length}
							defaultValue={pageIndex + 1}
							onChange={onChangeInInput}
						/>
					</Col>

					<Col className="col-md-auto">
						<div className="d-flex gap-1">
							<Button color="primary" onClick={nextPage} disabled={!canNextPage}>
								{">"}
							</Button>
							<Button
								color="primary"
								onClick={() => gotoPage(pageCount - 1)}
								disabled={!canNextPage}
							>
								{">>"}
							</Button>
						</div>
					</Col>

				</Row>
			)}
		</Fragment>
	);
};

export default TableContainer;
