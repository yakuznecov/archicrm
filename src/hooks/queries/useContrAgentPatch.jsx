// частичное обновление контрагента
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateContrAgent } from '@/services';

export const useContrAgentPatch = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }) => updateContrAgent({ id, data }),
		onSettled: () => {
			queryClient.invalidateQueries(['outstaffContrAgents']);
		},
	});
};
