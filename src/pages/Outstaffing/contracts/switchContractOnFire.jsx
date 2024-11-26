// Список сотрудников на увольнение, переключатель
import React, { useState, useEffect } from 'react';
import { Switch } from 'antd';
import { addDays, startOfToday, format, subDays } from 'date-fns';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useContractsStore, useDateRangeStore } from '@/storeZustand';

const SwitchContractOnFire = () => {
	const [isChecked, setIsChecked] = useState(false);

	// Диапазоны дат из Zustand store
	const [startDate, endDate] = useDateRangeStore(
		useShallow((state) => [state.startDate, state.endDate])
	);

	// Договоры клиента
	const [addFilter, filters] = useContractsStore(
		useShallow((state) => [state.addFilter, state.filters])
	);

	useEffect(() => {
		if (Object.keys(filters).length === 0) {
			setIsChecked(false);
		}
	}, [filters]);

	const handleOnFireChange = async (checked) => {
		setIsChecked(checked);

		const today = startOfToday();
		// const futureDate = addDays(today, 90); // дата 90 дней вперед
		// const tomorrowDate = addDays(today, 1);
		// const dateInPast = subDays(today, 90); // дата 90 дней назад

		// const formattedToday = format(today, 'yyyy-MM-dd');
		// const formattedFutureDate = format(futureDate, 'yyyy-MM-dd');
		// const formattedTomorrow = format(tomorrowDate, 'yyyy-MM-dd');
		// const formattedDateInPast = format(dateInPast, 'yyyy-MM-dd');

		const filters = {
			on_fire: checked,
			fire: true,
			start_date: checked ? null : startDate,
			end_date: checked ? null : endDate,
		};

		addFilter(filters);
	};

	return (
		<>
			<label className='archi-label me-1'>На увольнение</label>
			<Switch checked={isChecked} onChange={handleOnFireChange} />
		</>
	);
};

export default SwitchContractOnFire;
