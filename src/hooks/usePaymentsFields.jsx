import { useState, useEffect } from 'react';
import { formatDate } from '@/helpers/Date/formatDate';

const usePaymentsFields = (payment) => {
	const [fields, setFields] = useState([]);

	useEffect(() => {
		const newFields = [
			{
				name: ['amount'],
				value: payment?.amount ?? '',
			},
			{
				name: ['description'],
				value: payment?.description ?? '',
			},
			{
				name: ['department'],
				value: payment?.department ?? '',
			},
			{
				name: ['staff'],
				value: payment?.staff ?? '',
			},
			{
				name: ['date_created'],
				value: formatDate(payment?.date_created),
			},
			{
				name: ['type'],
				value: payment?.type ?? '',
			},
		];

		setFields(newFields);
	}, [payment]);

	return fields;
};

export default usePaymentsFields;
