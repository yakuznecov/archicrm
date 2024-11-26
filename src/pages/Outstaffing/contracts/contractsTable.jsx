// ContractsTable
import React from 'react';
import { Table } from 'antd';
import Loader from '@/components/Common/Loader';

import SelectionModal from './SelectionModal';
import useContractSelection from './hooks/useContractSelection';
import { useContractTableColumns, useDeleteContract } from '@/hooks';
import { useLoadContracts } from './hooks/useLoadContracts';
import { CommonTable } from '@/components';

const ContractsTable = ({ toggleModal, open, toggleContractModal }) => {
	// Логика загрузки договоров
	const { filteredData, isFetching, getContractById } = useLoadContracts();

	// выбранные строки в таблице
	const { rowSelection, selectedRows, totalSelected, setSelectedRowKeys } =
		useContractSelection();

	// Информация о конкретном договоре клиента
	const handleCellClick = (id) => {
		getContractById(id);
		toggleModal();
	};

	// Логика удаления договоров
	const { showDeleteConfirm } = useDeleteContract();

	// колонки для таблицы договоров
	const columns = useContractTableColumns(handleCellClick, showDeleteConfirm);

	return (
		<>
			<CommonTable
				rowSelection={rowSelection}
				columns={columns}
				loading={isFetching}
				data={filteredData}
				className='archi__table'
				pagination={true}
			/>

			{/* Модалка смены статуса договора */}
			<SelectionModal
				open={open}
				toggleModal={toggleContractModal}
				totalSelected={totalSelected}
				selectedRows={selectedRows}
				setSelectedRowKeys={setSelectedRowKeys}
			/>
		</>
	);
};

export default ContractsTable;
