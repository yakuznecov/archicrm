import { useState, useEffect } from 'react';

const useCompanyFields = (singleCompany) => {
	const [fields, setFields] = useState([]);

	useEffect(() => {
		const newFields = [
			{
				"name": [
					"name"
				],
				"value": singleCompany?.name ?? ''
			},
			{
				"name": [
					"label"
				],
				"value": singleCompany?.label ?? ''
			},
			{
				"name": [
					"long_main_name"
				],
				"value": singleCompany?.long_main_name ?? ''
			},
			{
				"name": [
					"long_name"
				],
				"value": singleCompany?.long_name ?? ''
			},
			{
				"name": [
					"city"
				],
				"value": singleCompany?.city ?? ''
			},
			{
				"name": [
					"phone"
				],
				"value": singleCompany?.phone ?? ''
			},
			{
				"name": [
					"director"
				],
				"value": singleCompany?.director ?? ''
			},
			{
				"name": [
					"director_full_fio"
				],
				"value": singleCompany?.director_full_fio ?? ''
			},
			{
				"name": [
					"director_full_fio_rod_padeg"
				],
				"value": singleCompany?.director_full_fio_rod_padeg ?? ''
			},
			{
				"name": [
					"director_full_fio_dat_padeg"
				],
				"value": singleCompany?.director_full_fio_dat_padeg ?? ''
			},
			{
				"name": [
					"buhgalter"
				],
				"value": singleCompany?.buhgalter ?? ''
			},
			{
				"name": [
					"inn"
				],
				"value": singleCompany?.inn ?? ''
			},
			{
				"name": [
					"kpp"
				],
				"value": singleCompany?.kpp ?? ''
			},
			{
				"name": [
					"ogrn"
				],
				"value": singleCompany?.ogrn ?? ''
			},
			{
				"name": [
					"bik"
				],
				"value": singleCompany?.bik ?? ''
			},
			{
				"name": [
					"bank_name"
				],
				"value": singleCompany?.bank_name ?? ''
			},
			{
				"name": [
					"bank_account_number"
				],
				"value": singleCompany?.bank_account_number ?? ''
			},
			{
				"name": [
					"bank_account_number_corporate"
				],
				"value": singleCompany?.bank_account_number_corporate ?? ''
			},
			{
				"name": [
					"okved"
				],
				"value": singleCompany?.okved ?? ''
			},
		];

		setFields(newFields);
	}, [singleCompany]);

	return fields;
};

export default useCompanyFields;