import { useCallback } from 'react';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useContractsStore } from '@/storeZustand';

export const useReferalLink = () => {
	// Договоры клиента
	const [contractById] = useContractsStore(
		useShallow((state) => [state.contractById])
	);

	const roleType =
		contractById?.contr_agent?.type === 'Физик' ? 'physic' : 'company';

	// Функция для генерации реферальной ссылки
	const generateReferalLink = useCallback(() => {
		const timestamp = Date.now();
		const expire = timestamp + 150000 * 60 * 1000; // 15 минут

		// Создаем реферальную ссылку
		const referalLink = `https://www.lk.archicrm.ru/referal?role=staff&c_id=${contractById.id}&uuid=${contractById?.client?.id}&timestamp=${timestamp}&expire=${expire}`;
		return referalLink;
	}, [contractById]);

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
