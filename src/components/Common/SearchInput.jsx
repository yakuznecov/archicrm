import React from 'react';
import { Input, ConfigProvider } from 'antd';
const { Search } = Input;

const SearchInput = ({ onSearch }) => {
	return (
		<ConfigProvider
			theme={{
				components: {
					Input: {
						hoverBorderColor: '#ee7269',
						algorithm: true,
					},
				},
			}}
		>
			<Search placeholder="Поиск" onSearch={onSearch} enterButton loading={false} />
		</ConfigProvider>
	);
};

export default SearchInput;
