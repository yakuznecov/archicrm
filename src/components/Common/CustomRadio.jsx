import React from 'react';
import { Radio, ConfigProvider } from 'antd';

const CustomRadio = ({ onChange, value, defaultValue, options }) => {
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
			<Radio.Group buttonStyle="solid" onChange={onChange} defaultValue={defaultValue} value={value}>
				{options.map((option) => (
					<Radio.Button key={option.value} value={option.value}>
						{option.label}
					</Radio.Button>
				))}
			</Radio.Group>
		</ConfigProvider>
	);
};

export default CustomRadio;
