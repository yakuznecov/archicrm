// Загрузка данных баланса компании

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useContrAgentBalanceStore } from '@/storeZustand';

const useCompanyBalance = () => {
	// Баланс компании
	const [companyBalance, companyName, loading] = useContrAgentBalanceStore(
		useShallow((state) => [
			state.companyBalance,
			state.companyName,
			state.loading,
		])
	);

	return { companyBalance, companyName, loading };
};

export default useCompanyBalance;
