// логика загрузки депозитов
import { useEffect } from 'react';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useContrAgentDepositsStore } from '@/storeZustand';

const useLoadDeposits = () => {
	const [getContrAgentDeposits, contrAgentDepositsList, loading] =
		useContrAgentDepositsStore(
			useShallow((state) => [
				state.getContrAgentDeposits,
				state.contrAgentDepositsList,
				state.loading,
			])
		);

	// загрузить все депозиты
	useEffect(() => {
		getContrAgentDeposits();
	}, []);

	// Группируем депозиты по id компании
	const companyDeposits = contrAgentDepositsList?.reduce((acc, deposit) => {
		const companyId = deposit.company.id;
		if (!acc[companyId]) {
			acc[companyId] = {
				companyName: deposit.company.name,
				totalAmount: 0,
				deposits: [],
			};
		}
		acc[companyId].totalAmount += deposit.amount;
		acc[companyId].deposits.push(deposit);
		return acc;
	}, {});

	return {
		contrAgentDepositsList,
		loading,
		companyDeposits,
	};
};

export default useLoadDeposits;
