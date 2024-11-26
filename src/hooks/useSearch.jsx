// Поиск по всем ячейкам в таблице

import { useState, useCallback } from 'react';

const useSearch = (data) => {
	const [searchText, setSearchText] = useState('');

	const onSearch = (value) => {
		setSearchText(value);
	};

	const filterData = useCallback(
		(data) => {
			const searchTextLowerCase = searchText.toLowerCase();

			function filterObject(obj) {
				return Object.values(obj).some((value) =>
					typeof value === 'object' && value !== null
						? filterObject(value)
						: String(value).toLowerCase().includes(searchTextLowerCase)
				);
			}

			return data?.filter((item) => filterObject(item));
		},
		[searchText, data]
	);

	const filteredSearchData = filterData(data);

	return { searchText, onSearch, filteredSearchData };
};

export default useSearch;
