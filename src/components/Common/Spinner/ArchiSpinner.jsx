import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const ArchiSpinner = () => {
	return (
		<div className="spinner">
			<Spin
				indicator={
					<LoadingOutlined
						style={{
							fontSize: 56,
							color: '#5db6d8',
						}}
						spin
					/>
				}
			/>
		</div>
	);
};

export default ArchiSpinner;
