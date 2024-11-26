import React from 'react';
import telegram from '@/assets/images/icons/telegram.svg';

const TelegramIcon = ({ id }) => {
	return (
		<img src={telegram} alt='telegramIcon' width={20} height={20} id={id} />
	);
};

export default TelegramIcon;
