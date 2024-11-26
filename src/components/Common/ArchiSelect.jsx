// custom select

import React from 'react';
import Select, { components } from 'react-select';
import ArrowBottomIcon from '../../assets/images/select/arrowBottomIcon.svg';

const DropdownIndicator = (props) => {
	return (
		<components.DropdownIndicator {...props}>
			<img src={ArrowBottomIcon} alt="" />
		</components.DropdownIndicator>
	);
};

const ArchiSelect = ({
	options,
	value,
	onChange,
	className,
	classNamePrefix,
	placeholder,
	defaultValue,
	isMulti,
	isDisabled,
	isClearable,
}) => {
	return (
		<Select
			components={{ DropdownIndicator }}
			options={options}
			value={value}
			onChange={onChange}
			className={className}
			classNamePrefix={classNamePrefix}
			placeholder={placeholder}
			defaultValue={defaultValue}
			id="long-value-select"
			instanceId="long-value-select"
			isMulti={isMulti}
			hideSelectedOptions={true}
			isDisabled={isDisabled}
			// menuIsOpen="true"
			isClearable={isClearable} // кнопка очистки значения
		/>
	);
};

export default ArchiSelect;
