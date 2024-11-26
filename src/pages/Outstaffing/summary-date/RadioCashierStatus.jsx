// Переключение статусов операции в кассе
import { Radio } from 'antd';
import { useState } from 'react';
import { putOutstaffCashier } from '@/services';

import { useShallow } from 'zustand/react/shallow';
import { useOutstaffCashierStore, useDepartmentsStore } from '@/storeZustand';

const RadioCashierStatus = ({ value }) => {
	const [selectedStatus, setSelectedStatus] = useState(value.status);

	// Выбранный департамент
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	// Загрузка баланса департамента
	const [getOutstaffCashier, getOutstaffCashierByDepartment] =
		useOutstaffCashierStore(
			useShallow((state) => [
				state.getOutstaffCashier,
				state.getOutstaffCashierByDepartment,
			])
		);

	// Radio
	const handleStatusChange = async (event) => {
		const newValue = event.target.value;
		setSelectedStatus(newValue);

		try {
			const changedCashier = {
				amount: value?.amount ?? 0,
				status: newValue,
				description: value?.description ?? '',
				creator: value?.creator,
				department: value?.department,
				date_of_payment: value?.date_of_payment,
			};

			await putOutstaffCashier({ id: value?.id, changedCashier });

			setTimeout(() => {
				getOutstaffCashier();
			}, 1500);

			// получить обновленный баланс при одобрении расхода
			await getOutstaffCashierByDepartment({
				department_id: selectedDepartment,
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Radio.Group
			size='small'
			onChange={handleStatusChange}
			value={selectedStatus}
			buttonStyle='solid'
		>
			<Radio.Button value='Одобрено'>Одобрено</Radio.Button>
			<Radio.Button value='В процессе'>В процессе</Radio.Button>
			<Radio.Button value='Отклонено'>Отклонено</Radio.Button>
		</Radio.Group>
	);
};

export default RadioCashierStatus;
