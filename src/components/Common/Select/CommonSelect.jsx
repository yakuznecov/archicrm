// Общий селект
import { Select, Spin } from 'antd';
import { filterOption } from '@/helpers';

export default function CommonSelect({
	value,
	options,
	status,
	onChange,
	placeholder,
	defaultValue,
	disabled = false,
	loading,
}) {
	return (
		<Select
			showSearch
			defaultValue={defaultValue}
			placeholder={placeholder}
			optionFilterProp='children'
			notFoundContent={loading ? <Spin size='small' /> : null}
			// loading={loading}
			style={{ width: '100%' }}
			allowClear
			status={status}
			value={value || undefined}
			onChange={onChange}
			options={options}
			filterOption={filterOption}
			disabled={disabled}
		/>
	);
}
