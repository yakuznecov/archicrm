import React, { useState, useEffect } from 'react';
import { Switch } from 'antd';
import { addDays, startOfToday, format, subDays } from 'date-fns';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useContractsStore } from '@/storeZustand';

const SwitchPatentExpires = () => {
	const [isChecked, setIsChecked] = useState(false);

	// Договоры клиента
	const [addFilter, filters, selectedCity] = useContractsStore(
		useShallow((state) => [state.addFilter, state.filters, state.selectedCity])
	);

	useEffect(() => {
		if (Object.keys(filters).length === 0) {
			setIsChecked(false);
		}
	}, [filters]);

	const onChangePatent = async (checked) => {
		const today = startOfToday();
		const futureDate = addDays(today, 90); // дата 45 дней вперед
		const tomorrowDate = addDays(today, 1);
		const dateInPast = subDays(today, 90); // дата 45 дней назад

		// const formattedToday = format(today, 'yyyy-MM-dd');
		const formattedFutureDate = format(futureDate, 'yyyy-MM-dd');
		// const formattedTomorrow = format(tomorrowDate, 'yyyy-MM-dd');
		const formattedDateInPast = format(dateInPast, 'yyyy-MM-dd');

		const filters = {
			city: selectedCity,
			patent_start: checked ? formattedDateInPast : null,
			patent_end: checked ? formattedFutureDate : null,
		};

		addFilter(filters);
	};

	return (
		<>
			<label className='archi-label me-1'>Истекает патент</label>
			<Switch
				checked={isChecked}
				onChange={onChangePatent}
				onClick={() => setIsChecked(!isChecked)}
			/>
		</>
	);
};

export default SwitchPatentExpires;
