// Селект подтвердения операции на странице кассы
import React, { useEffect, useState } from 'react';
import { Select } from 'antd'; // Импортируем Select из библиотеки antd
import { putOutstaffCashier } from '@/services';

import { useShallow } from 'zustand/react/shallow';
import { useOutstaffCashierStore, useDepartmentsStore } from '@/storeZustand';

const options = [
	{ value: 'Одобрено', label: 'Одобрено' },
	{ value: 'В процессе', label: 'В процессе' },
	{ value: 'Отклонено', label: 'Отклонено' },
];

const SelectCash = ({ value }) => {
	const [loading, setLoading] = useState(false);
	const [selectedOptionCash, setSelectedOptionCash] = useState('В процессе');

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

	// загрузка статуса кассы
	useEffect(() => {
		if (value) {
			setSelectedOptionCash(value.status);
		}
	}, [value]);

	const handleSelectChange = async (newValue) => {
		setLoading(true);
		setSelectedOptionCash(newValue);

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
				setLoading(false);
			}, 1500);

			// получить обновленный баланс при одобрении расхода
			await getOutstaffCashierByDepartment({
				department_id: selectedDepartment,
			});
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	return (
		<Select
			defaultValue={selectedOptionCash}
			value={selectedOptionCash}
			// style={{ width: '150px' }}
			onChange={handleSelectChange}
			options={options}
			loading={loading}
		/>
	);
};

export default SelectCash;
