import { useState } from 'react';
import { PrimaryBtn } from '@/components';
import { useReferalLink } from './hooks/useReferalLink';

export const ReferalBtn = () => {
	const { copyToClipboard } = useReferalLink();
	const [buttonText, setButtonText] = useState('Скопировать ссылку');

	// Функция для копирования и изменения текста кнопки
	const handleCopy = async () => {
		await copyToClipboard();

		setButtonText('Ссылка скопирована!');
		// Сбрасываем текст обратно через 2 секунды
		setTimeout(() => setButtonText('Скопировать ссылку'), 2000);
	};

	return (
		<div className='mb-3'>
			<PrimaryBtn onClick={handleCopy}>{buttonText}</PrimaryBtn>
		</div>
	);
};
