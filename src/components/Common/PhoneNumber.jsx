// show phone number when pressed
import React, { useState, useEffect } from 'react';

const PhoneNumber = ({ phone }) => {
	const [showPhoneNumber, setShowPhoneNumber] = useState(false);
	// const phoneNumber = cell.value ? cell.value : '';

	const handlePhoneClick = () => {
		setShowPhoneNumber(!showPhoneNumber);
	};

	useEffect(() => {
		if (showPhoneNumber) {
			const timeoutId = setTimeout(() => {
				setShowPhoneNumber(false);
			}, 5000);

			// Очищаем таймаут, если компонент размонтируется или значение showPhoneNumber изменится
			return () => {
				clearTimeout(timeoutId);
			};
		}
	}, [showPhoneNumber]);

	return (
		<span onClick={handlePhoneClick} className="archi__phone_cell">
			{showPhoneNumber ? phone : `*******${phone?.slice(-4)}`}
		</span>
	);
};

export default PhoneNumber;
