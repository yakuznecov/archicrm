import { useState, useEffect } from 'react';

export default function useBonusPenaltyFields(penaltyBonusById) {
	const [fields, setFields] = useState([]);

	useEffect(() => {
		const newFields = [
			{
				name: ['date_of_payment'],
				value: penaltyBonusById?.date_of_payment?.slice(0, 16) ?? '',
			},
			{
				name: ['amount'],
				value: penaltyBonusById?.amount ?? '',
			},
			{
				name: ['description'],
				value: penaltyBonusById?.description ?? '',
			},
		];

		setFields(newFields);
	}, [penaltyBonusById]);

	return fields;
}
