import React from 'react';
import { message } from 'antd';

const ErrorMessage = ({ text }) => {
	const [messageApi, contextHolder] = message.useMessage();
	const error = () => {
		messageApi.open({
			type: 'error',
			content: text,
		});
	};

	return <>{contextHolder}</>;
};

export default ErrorMessage;
