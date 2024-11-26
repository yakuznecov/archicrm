// загрузка статистики физиков
import { useEffect } from 'react';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { usePhysicsStore } from '@/storeZustand';

export const useLoadPhysicsStat = () => {
	// Физики
	const [
		physicsCount, // кол-во физиков
		getPhysics,
	] = usePhysicsStore(
		useShallow((state) => [state.physicsCount, state.getPhysics])
	);

	useEffect(() => {
		getPhysics();
	}, []);

	return { physicsCount };
};
