import { Input } from 'antd';

const SearchBtn = ({ onSearch }) => {
	const { Search } = Input;

	return (
		<Search
			placeholder='Поиск в таблице'
			allowClear // очистка
			onSearch={onSearch}
			style={{
				width: 200,
			}}
			enterButton // кнопка синяя
		/>
	);
};

export default SearchBtn;
