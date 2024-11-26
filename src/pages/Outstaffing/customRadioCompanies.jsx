import React from 'react';
import { Radio, ConfigProvider } from 'antd';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useCompaniesStore, useDepartmentsStore } from '@/storeZustand';

const CustomRadioCompanies = () => {
	// Выбранный департамент
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	// Все компании
	const [
		globalTypeCompany,
		setGlobalTypeCompany,
		getOwnCompanies,
		getExternalCompanies,
	] = useCompaniesStore(
		useShallow((state) => [
			state.globalTypeCompany,
			state.setGlobalTypeCompany,
			state.getOwnCompanies,
			state.getExternalCompanies,
		])
	);

	const handleRadioChange = (event) => {
		const value = event.target.value;
		setGlobalTypeCompany(value);

		// Запрос компаний по типу
		value === 'Собственная'
			? getOwnCompanies(selectedDepartment)
			: getExternalCompanies(selectedDepartment);
	};

	return (
		<ConfigProvider
			theme={{
				components: {
					Radio: {
						buttonSolidCheckedBg: '#ee7269',
						buttonSolidCheckedActiveBg: '#ee7269',
						buttonSolidCheckedHoverBg: '#ee7269',
						buttonColor: '#6063aa',
						algorithm: true,
					},
				},
			}}
		>
			<Radio.Group
				value={globalTypeCompany}
				buttonStyle='solid'
				onChange={handleRadioChange}
			>
				<Radio.Button value='Собственная'>Собственная</Radio.Button>
				<Radio.Button value='Внешняя'>Внешняя</Radio.Button>
			</Radio.Group>
		</ConfigProvider>
	);
};

export default CustomRadioCompanies;
