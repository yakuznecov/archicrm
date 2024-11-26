// получение контрагентов
import { useQuery } from '@tanstack/react-query';
import { getContrAgents } from '@/services';

export function useContrAgentsGet() {
	return useQuery({
		queryKey: ['outstaffContrAgents'],
		queryFn: () => getContrAgents(),
		refetchOnWindowFocus: false,
	});
}
