// обновление контрагента
import { useQuery } from '@tanstack/react-query';
import { getContrAgentById } from '@/services';

export function useContrAgentByIdGet() {
	return useQuery({
		queryKey: ['outstaffContrAgent', id],
		queryFn: () => getContrAgentById(id),
		enabled: !!id,
		refetchOnWindowFocus: false,
	});
}
