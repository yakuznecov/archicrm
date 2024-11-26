import { useState } from 'react';

const useFormPayment = () => {
	const [selectedFormPayment, setSelectedFormPayment] = useState('1');

	const handleOptionPayment = (event) => {
		setSelectedFormPayment(event.target.value);
	};

	return { selectedFormPayment, setSelectedFormPayment, handleOptionPayment };
}

export default useFormPayment;