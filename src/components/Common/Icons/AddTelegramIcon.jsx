import React from 'react';
import addTelegram from '@/assets/images/icons/add-telegram.svg';

const AddTelegramIcon = ({ id }) => {
	return (
		<img src={addTelegram} alt='addTelegram' width={22} height={22} id={id} />
	);
};

export default AddTelegramIcon;
