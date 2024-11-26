import { convertToISO } from '@/helpers/Date/dateFns';
import { useState, useEffect } from 'react';

const useClientFields = (contractById) => {
	const [fields, setFields] = useState([]);

	useEffect(() => {
		const newFields = [
			{
				name: ['last_name'],
				value: contractById?.last_name ?? '',
			},
			{
				name: ['last_name_dat_padeg'],
				value: contractById?.last_name_dat_padeg ?? '',
			},
			{
				name: ['first_name'],
				value: contractById?.first_name ?? '',
			},
			{
				name: ['first_name_dat_padeg'],
				value: contractById?.first_name_dat_padeg ?? '',
			},
			{
				name: ['second_name'],
				value: contractById?.second_name ?? '',
			},
			{
				name: ['second_name_dat_padeg'],
				value: contractById?.second_name_dat_padeg ?? '',
			},
			{
				name: ['fio_rod_padeg'],
				value: contractById?.fio_rod_padeg ?? '',
			},
			{
				name: ['fio'],
				value: contractById?.fio ?? '',
			},
			{
				name: ['birth_place'],
				value: contractById?.birth_place ?? '',
			},
			{
				name: ['director_full_fio_dat_padeg'],
				value: contractById?.director_full_fio_dat_padeg ?? '',
			},
			{
				name: ['dob'],
				value: convertToISO(contractById?.dob)?.slice(0, 10) ?? '',
			},
			{
				name: ['profession'],
				value: contractById?.profession ?? '',
			},
			{
				name: ['skill'],
				value: contractById?.skill ?? '',
			},
			{
				name: ['phone'],
				value: contractById?.phone ?? '',
			},
			{
				name: ['bank_account'],
				value: contractById?.bank_account ?? '',
			},
			{
				name: ['client_city'],
				value: contractById?.client_city ?? '',
			},
			{
				name: ['mail_address'],
				value: contractById?.mail_address ?? '',
			},
			{
				name: ['description'],
				value: contractById?.description ?? '',
			},
		];

		setFields(newFields);
	}, [contractById]);

	return fields;
};

export default useClientFields;
