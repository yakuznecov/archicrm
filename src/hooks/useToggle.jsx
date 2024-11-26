import { useState } from 'react';

const useToggle = (initialValue) => {
	const [value, setValue] = useState(initialValue);

	const toggle = (value) => {
		setValue(currentValue =>
			typeof value === 'boolean' ? value : !currentValue);
	};

	return [value, toggle];
}

export default useToggle;

// const [alertDanger, toggleAlertDanger] = useToggle(false);