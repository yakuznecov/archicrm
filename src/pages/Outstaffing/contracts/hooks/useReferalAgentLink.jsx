import { useCallback } from 'react';

// Zustand store
import { useContrAgentsStore } from '@/storeZustand';

export const useReferalAgentLink = () => {
	// Договоры клиента
	const selectedContrAgent = useContrAgentsStore(
		(state) => state.selectedContrAgent
	);
	console.log('selectedContrAgent', selectedContrAgent);

	const roleType = selectedContrAgent?.type === 'Физик' ? 'physic' : 'company';

	// Функция для генерации реферальной ссылки
	const generateReferalLink = useCallback(() => {
		const timestamp = Date.now();
		const expire = timestamp + 150000 * 60 * 1000; // 15 минут

		// Создаем реферальную ссылку
		const referalLink = `https://www.lk.archicrm.ru/referal?role=${roleType}&uuid=${selectedContrAgent?.value}&timestamp=${timestamp}&expire=${expire}`;
		return referalLink;
	}, [selectedContrAgent]);

	// Функция для копирования ссылки в буфер обмена
	const copyToClipboard = async () => {
		const link = generateReferalLink();
		navigator.clipboard
			.writeText(link)
			.then(() => {
				console.log('Ссылка скопирована в буфер обмена:', link);
			})
			.catch((err) => {
				console.error('Ошибка при копировании ссылки:', err);
			});
	};

	return { copyToClipboard };
};
