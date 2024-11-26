// PrimaryBtn
import React from 'react';
import { Button, ConfigProvider } from 'antd';

const PrimaryBtn = ({ children, onClick, disabled, loading }) => {
	return (
		<ConfigProvider
			theme={{
				components: {
					Button: {
						defaultBg: '#6063aa',
						defaultColor: '#fff',
						defaultBorderColor: 'transparent',
						defaultHoverBorderColor: '#6063aa',
						defaultHoverColor: '#6063aa',
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

export default PrimaryBtn;
