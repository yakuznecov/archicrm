// частичное обновление контрагента
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { serviceRequestPatch } from '@/services';

export const useServiceRequestPatch = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, changedServiceRequest }) =>
			serviceRequestPatch({ id, changedServiceRequest }),
		onSettled: () => {
			queryClient.invalidateQueries(['outstaffServiceRequests']);
		},
	});
};
