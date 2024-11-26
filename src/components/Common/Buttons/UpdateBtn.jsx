// UpdateBtn, обновление таблицы на странице
import React from 'react';
import { Button, ConfigProvider } from 'antd';

const UpdateBtn = ({ children, onClick, disabled, loading }) => {
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
			<Button onClick={onClick} disabled={disabled} loading={loading}>
				{children}
			</Button>
		</ConfigProvider>
	);
};

export default UpdateBtn;
