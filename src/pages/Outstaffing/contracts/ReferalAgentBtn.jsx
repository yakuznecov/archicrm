import { useState } from 'react';
import { PrimaryBtn } from '@/components';
import { useReferalAgentLink } from './hooks/useReferalAgentLink';

export const ReferalAgentBtn = () => {
	const { copyToClipboard } = useReferalAgentLink();
	const [buttonText, setButtonText] = useState('Скопировать ссылку');

	// Функция для копирования и изменения текста кнопки
	const handleCopy = async () => {
		await copyToClipboard();

		setButtonText('Ссылка скопирована!');
		// Сбрасываем текст обратно через 2 секунды
		setTimeout(() => setButtonText('Скопировать ссылку'), 2000);
	};

	return <PrimaryBtn onClick={handleCopy}>{buttonText}</PrimaryBtn>;
};
