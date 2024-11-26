// SecondaryBtn
import React from 'react';
import { Button, ConfigProvider } from 'antd';

const SecondaryBtn = ({ children, onClick }) => {
	return (
		<ConfigProvider
			theme={{
				components: {
					Button: {
						defaultBg: '#f39b38',
						defaultColor: '#fff',
						defaultBorderColor: 'transparent',
						defaultHoverBorderColor: '#f39b38',
						defaultHoverColor: '#f39b38',
						algorithm: true,
					},
				},
			}}
		>
			<Button onClick={onClick}>{children}</Button>
		</ConfigProvider>
	);
};

export default SecondaryBtn;
