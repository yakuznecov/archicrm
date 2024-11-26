// Выбор строк в таблице
import { useState } from 'react';

const useRowSelection = () => {
	const [selectedRows, setSelectedRows] = useState([]); // выбранные строки со всеми данными
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);

	// Общая сумма оплаты за выбранных
	const totalPaymentAmount = selectedRows?.reduce((acc, item) => acc + (item.amount - item.paid_amount || 0), 0);

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
		totalPaymentAmount,
		setSelectedRowKeys,
	};
}

export default useRowSelection;