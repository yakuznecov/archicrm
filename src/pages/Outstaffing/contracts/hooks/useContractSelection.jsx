// Выбор строк в таблице договоров
import { useState } from 'react';

const useContractSelection = () => {
	// выбранные строки со всеми данными
	const [selectedRows, setSelectedRows] = useState([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);

	// Общее количество выбранных
	const totalSelected = selectedRows.length;

	const onSelectChange = (newSelectedRowKeys, selectedRows) => {
		setSelectedRowKeys(newSelectedRowKeys);
		setSelectedRows(selectedRows); // вся информация из строки
	};

	// выбор строки с помощью checkbox
	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange,
	};

	return {
		selectedRows,
		rowSelection,
		totalSelected,
		setSelectedRowKeys,
	};
}

export default useContractSelection;