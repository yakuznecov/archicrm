// получение заявок
import { useQuery } from '@tanstack/react-query';
import { getServiceRequests } from '@/services';

export function useServiceRequestsGet(data) {
	return useQuery({
		queryKey: ['outstaffServiceRequests', data],
		queryFn: () => getServiceRequests(data),
		refetchOnWindowFocus: false,
		enabled: !!data,
		refetchInterval: 2 * 60 * 1000, // 2 min
	});
}
