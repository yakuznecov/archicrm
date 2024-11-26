import { useState, useEffect } from 'react';
import { getTodayWithTime } from '@/helpers/Date/dayjs';

const useStaffFields = (singleStaff) => {
	const [fields, setFields] = useState([]);

	useEffect(() => {
		const newFields = [
			{
				name: ['surname'],
				value: singleStaff?.surname ?? '',
			},
			{
				name: ['name'],
				value: singleStaff?.name ?? '',
			},
			{
				name: ['start_date_time'],
				value: getTodayWithTime(),
			},
		];

		setFields(newFields);
	}, [singleStaff]);

	return fields;
};

export default useStaffFields;
