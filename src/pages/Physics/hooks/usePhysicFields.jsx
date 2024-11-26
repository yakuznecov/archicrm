import { useState, useEffect } from 'react';

const usePhysicFields = (selectedPhysic) => {
	const [fields, setFields] = useState([]);

	useEffect(() => {
		const newFields = [
			{
				"name": [
					"last_name"
				],
				"value": selectedPhysic?.last_name ?? ''
			},
			{
				"name": [
					"first_name"
				],
				"value": selectedPhysic?.first_name ?? ''
			},
			{
				"name": [
					"second_name"
				],
				"value": selectedPhysic?.second_name ?? ''
			},
			{
				"name": [
					"dob"
				],
				"value": selectedPhysic?.dob ?? ''
			},
			{
				"name": [
					"phone"
				],
				"value": selectedPhysic?.phone ?? ''
			},
			// {
			// 	"name": [
			// 		"birth_place"
			// 	],
			// 	"value": selectedPhysic?.birth_place ?? ''
			// },
			// {
			// 	"name": [
			// 		"citizen"
			// 	],
			// 	"value": selectedPhysic?.citizen ?? ''
			// },
			// {
			// 	"name": [
			// 		"passport_serial"
			// 	],
			// 	"value": selectedPhysic?.passport_serial ?? ''
			// },
			// {
			// 	"name": [
			// 		"passport_number"
			// 	],
			// 	"value": selectedPhysic?.passport_number ?? ''
			// },
			// {
			// 	"name": [
			// 		"passport_place_created"
			// 	],
			// 	"value": selectedPhysic?.passport_place_created ?? ''
			// },
			// {
			// 	"name": [
			// 		"passport_place_created_date"
			// 	],
			// 	"value": selectedPhysic?.passport_place_created_date ?? ''
			// },
			// {
			// 	"name": [
			// 		"passport_address"
			// 	],
			// 	"value": selectedPhysic?.passport_address ?? ''
			// },
			// {
			// 	"name": [
			// 		"bank_account"
			// 	],
			// 	"value": selectedPhysic?.bank_account ?? ''
			// },
			{
				"name": [
					"description"
				],
				"value": selectedPhysic?.description ?? ''
			},
		];

		setFields(newFields);
	}, [selectedPhysic]);

	return fields;
};

export default usePhysicFields;