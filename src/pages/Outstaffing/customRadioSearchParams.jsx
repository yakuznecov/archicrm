import React from 'react';
import { Radio, ConfigProvider } from 'antd';

const CustomRadioSearchParams = ({ onChange }) => {
	return (
		<ConfigProvider
			theme={{
				components: {
					Radio: {
						buttonSolidCheckedBg: '#4eb47f',
						buttonSolidCheckedActiveBg: '#4eb47f',
						buttonSolidCheckedHoverBg: '#4eb47f',
						buttonColor: '#6063aa',
						algorithm: true,
					},
				},
			}}
		>
			<Radio.Group
				defaultValue="last_name"
				buttonStyle="solid"
				onChange={onChange}
			>
				<Radio.Button value="last_name">Фамилия</Radio.Button>
				<Radio.Button value="first_name">Имя</Radio.Button>
				<Radio.Button value="contract_number">№ договора</Radio.Button>
			</Radio.Group>
		</ConfigProvider>

	);
};

export default CustomRadioSearchParams;