import { useState, useEffect } from 'react';
import { getToday } from '@/helpers/Date/dayjs';

export default function useWorkingPeriodFields(workingPeriodById) {
	const [fields, setFields] = useState([]);

	useEffect(() => {
		const newFields = [
			{
				name: ['start_date_time'],
				value: workingPeriodById?.start_date_time?.slice(0, 16) ?? '',
			},
			{
				name: ['finish_date_time'],
				value: workingPeriodById?.finish_date_time?.slice(0, 16) ?? getToday(),
			},
			{
				name: ['total_hours_in_day'],
				value: workingPeriodById?.total_hours_in_day ?? '',
			},
			{
				name: ['bonus_per_day'],
				value: workingPeriodById?.bonus_per_day ?? '',
			},
			{
				name: ['description'],
				value: workingPeriodById?.description ?? '',
			},
		];

		setFields(newFields);
	}, [workingPeriodById]);

	return fields;
}
