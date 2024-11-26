// Селект выбора внешней компании
import { Select } from 'antd';
import { filterOption } from '@/helpers';
import { useSelectedManager } from 'hooks';

const SelectManager = ({
	selectedManager,
	setSelectedManager,
	status = 'success',
}) => {
	return (
		<Select
			showSearch
			placeholder='Выбрать менеджера'
			optionFilterProp='children'
			style={{ width: '100%' }}
			allowClear
			status={status}
			value={selectedManager || undefined}
			onChange={setSelectedManager}
			options={outstaffManagerList}
			filterOption={filterOption}
		/>
	);
};

export default SelectManager;
