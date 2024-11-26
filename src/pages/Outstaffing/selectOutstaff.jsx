// SelectOutstaff, Выбор сотрудника аутстафф в списке доверенностей
import { Select } from 'antd';
import { useSelectedOutstaff } from '@/hooks';
import { filterOption } from '@/helpers';

const SelectOutstaff = ({ selectedOutstaff, handleSelectedOutstaff }) => {
	// Получение сотрудников
	const { outstaffData } = useSelectedOutstaff(); // передача параметра выбранного сотрудника для селекта

	return (
		<Select
			showSearch
			placeholder='Выбрать сотрудника'
			optionFilterProp='children'
			style={{ width: '100%' }}
			allowClear
			value={selectedOutstaff || undefined}
			onChange={handleSelectedOutstaff}
			options={outstaffData}
			filterOption={filterOption}
		/>
	);
};

export default SelectOutstaff;
