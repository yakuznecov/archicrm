// DangerBtn
import React from 'react';
import { Button, ConfigProvider } from 'antd';

const DangerBtn = ({ children, onClick }) => {
	return (
		<ConfigProvider
			theme={{
				components: {
					Button: {
						defaultBg: '#ee7269',
						defaultColor: '#fff',
						defaultBorderColor: 'transparent',
						defaultHoverBorderColor: '#ee7269',
						defaultHoverColor: '#ee7269',
						algorithm: true,
					},
				},
			}}
		>
			<Button onClick={onClick}>{children}</Button>
		</ConfigProvider>
	);
};

export default DangerBtn;
