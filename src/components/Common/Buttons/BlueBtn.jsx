// BlueBtn
import React from 'react';
import { Button, ConfigProvider } from 'antd';

const BlueBtn = ({ children, onClick, disabled, loading }) => {
	return (
		<ConfigProvider
			theme={{
				components: {
					Button: {
						defaultBg: '#5db6d8',
						defaultColor: '#fff',
						defaultBorderColor: 'transparent',
						defaultHoverBorderColor: '#5db6d8',
						defaultHoverColor: '#5db6d8',
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

export default BlueBtn;
