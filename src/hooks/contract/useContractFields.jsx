import { convertToISO } from '@/helpers/Date/dateFns';
import { useState, useEffect } from 'react';

const useContractFields = (contractById) => {
	const [fields, setFields] = useState([]);
	// console.log('contractById', contractById);

	useEffect(() => {
		const newFields = [
			{
				name: ['contract_number'],
				value: contractById?.contract_number ?? null,
			},
			{
				name: ['extending_number'],
				value: contractById?.extending_number ?? null,
			},
			{
				name: ['order_hire_number'],
				value: contractById?.order_hire_number ?? null,
			},
			{
				name: ['order_fire_number'],
				value: contractById?.order_fire_number ?? null,
			},
			{
				name: ['kid_first_name'],
				value: contractById?.kid_first_name ?? null,
			},
			{
				name: ['kid_last_name'],
				value: contractById?.kid_last_name ?? null,
			},
			{
				name: ['kid_dob'],
				value: convertToISO(contractById?.kid_dob) ?? null,
			},
			{
				name: ['contract_date'],
				value: convertToISO(contractById?.contract_date) ?? null,
			},
			{
				name: ['hodataystvo_date'],
				value: convertToISO(contractById?.hodataystvo_date) ?? null,
			},
			{
				name: ['notification_date'],
				value: convertToISO(contractById?.notification_date) ?? null,
			},
			{
				name: ['extending_date'],
				value: convertToISO(contractById?.extending_date)?.slice(0, 10) ?? null,
			},
			{
				name: ['spravka_date'],
				value: convertToISO(contractById?.spravka_date) ?? null,
			},
			{
				name: ['work_start_date'],
				value: convertToISO(contractById?.work_start_date) ?? null,
			},
			{
				name: ['work_end_date'],
				value: convertToISO(contractById?.work_end_date) ?? null,
			},
			{
				name: ['order_hire_date'],
				value: convertToISO(contractById?.order_hire_date) ?? null,
			},
			{
				name: ['order_fire_date'],
				value: convertToISO(contractById?.order_fire_date) ?? null,
			},
			{
				name: ['start_period'],
				value: convertToISO(contractById?.start_period) ?? null,
			},
			{
				name: ['end_period'],
				value: convertToISO(contractById?.end_period) ?? null,
			},
			{
				name: ['cost_price'],
				value: contractById?.cost_price ?? 500,
			},
		];

		setFields(newFields);
	}, [contractById]);

	return fields;
};

export default useContractFields;
