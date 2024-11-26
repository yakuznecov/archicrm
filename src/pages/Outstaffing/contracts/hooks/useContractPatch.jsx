// обновление договора
import { useMutation } from '@tanstack/react-query';
import { patchContract } from '@/services';
import { queryClient } from '@/helpers/query-client';

export function useContractPatch() {
	return useMutation({
		mutationKey: ['patchContract'],
		mutationFn: (data) => patchContract(data),
		onSettled: () => {
			queryClient.invalidateQueries(['outstaffContracts']);
		},
	});
}
