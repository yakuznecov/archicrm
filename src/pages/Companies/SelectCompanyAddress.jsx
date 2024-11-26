// Селект выбора типа адреса компании
import { Select } from 'antd';
import { filterOption } from '@/helpers';

const SelectCompanyAddress = ({
	selectedAddresses,
	setSelectedAddresses,
	companyAddressList,
}) => {
	return (
		<Select
			showSearch
			allowClear
			mode='multiple'
			style={{ width: '100%' }}
			placeholder='Выбрать адреса для компании'
			options={companyAddressList}
			value={selectedAddresses || undefined}
			onChange={setSelectedAddresses}
			filterOption={filterOption}
			optionFilterProp='children'
		/>
	);
};

export default SelectCompanyAddress;
