// добавление договора
import { queryClient } from '@/helpers/query-client';
import { useMutation } from '@tanstack/react-query';
import { addContract } from '@/services';

// Zustand store
import { useContractsStore } from '@/storeZustand';

export function useContractsAdd() {
	// Договор сотрудника
	const setContractId = useContractsStore((state) => state.setContractId);

	return useMutation({
		mutationKey: ['addContract'],
		mutationFn: (contract) => addContract(contract),
		onSuccess: (data) => {
			setContractId(data.id); // запись id нового договора
		},
		onSettled: () => {
			queryClient.invalidateQueries(['outstaffContracts']);
		},
	});
}
