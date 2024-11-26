// GreenBtn
import React from 'react';
import { Button, ConfigProvider } from 'antd';

const GreenBtn = ({ children, onClick, disabled, loading }) => {
	return (
		<ConfigProvider
			theme={{
				components: {
					Button: {
						defaultBg: '#4eb47f',
						defaultColor: '#fff',
						defaultBorderColor: 'transparent',
						defaultHoverBorderColor: '#4eb47f',
						defaultHoverColor: '#4eb47f',
						algorithm: true,
					},
				},
			}}
		>
			<Button onClick={onClick} disabled={disabled} loading={loading}>
				{children}
			</Button>
		</ConfigProvider>
	);
};

export default GreenBtn;
