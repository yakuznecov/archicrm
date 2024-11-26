// SelectOwnCompany, Выбор собственных компаний в селекте
import { Select } from 'antd';
import { filterOption } from '@/helpers';

const SelectOwnCompany = ({
	options,
	selectedOwnCompany,
	handleOwnCompanyChange,
	mode,
}) => {
	return (
		<Select
			showSearch
			allowClear
			mode={mode}
			style={{ width: '100%' }}
			placeholder='Cобственная компания'
			options={options}
			value={selectedOwnCompany || undefined}
			onChange={handleOwnCompanyChange}
			filterOption={filterOption}
			optionFilterProp='children'
		/>
	);
};

export default SelectOwnCompany;
