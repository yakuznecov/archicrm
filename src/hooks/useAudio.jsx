import { useRef, useEffect } from 'react';

const useAudio = () => {
	const soundRef = useRef(null);
	const src = '/sounds/icq.mp3';

	useEffect(() => {
		// Инициализируем аудио-объект только один раз
		soundRef.current = new Audio(src);
	}, []);

	// Функция для воспроизведения звука
	const playSound = () => {
		if (soundRef.current) {
			soundRef.current.play(); // Проигрываем звук
		}
	};

	return { playSound };
};

export default useAudio;
