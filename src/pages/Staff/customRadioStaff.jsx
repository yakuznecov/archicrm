import React from 'react';
import { Radio, ConfigProvider } from 'antd';

const CustomRadioStaff = ({ onChange }) => {
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
				defaultValue="adm"
				buttonStyle="solid"
				onChange={onChange}
			>
				<Radio.Button value="adm">Администраторы</Radio.Button>
				<Radio.Button value="spec">Специалисты</Radio.Button>
				<Radio.Button value="call">Колл-центр</Radio.Button>
			</Radio.Group>
		</ConfigProvider>
	);
};

export default CustomRadioStaff;