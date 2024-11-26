import { useState, useEffect } from 'react';

const useRequestsFields = (singleRequest) => {
	const [fields, setFields] = useState([]);

	useEffect(() => {
		const newFields = [
			{
				"name": [
					"name"
				],
				"value": singleRequest?.name ?? ''
			},
			{
				"name": [
					"phone"
				],
				"value": singleRequest?.phone ?? ''
			},
			{
				"name": [
					"email"
				],
				"value": singleRequest?.email ?? ''
			},
			{
				"name": [
					"notes"
				],
				"value": singleRequest?.notes ?? ''
			},
			{
				"name": [
					"from"
				],
				"value": singleRequest?.from ?? ''
			},
			{
				"name": [
					"city"
				],
				"value": singleRequest?.city ?? ''
			},
			{
				"name": [
					"status"
				],
				"value": singleRequest?.status ?? ''
			},
		];

		setFields(newFields);
	}, [singleRequest]);

	return fields;
};

export default useRequestsFields;