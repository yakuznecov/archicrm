// получение внешних компаний
import { useQuery } from '@tanstack/react-query';
import { getExternalCompanies } from '@/services';

export function useExternalCompaniesGet(department_id) {
	return useQuery({
		queryKey: ['outstaffExternalCompanies', department_id],
		queryFn: () => getExternalCompanies(department_id),
		refetchOnWindowFocus: false,
	});
}
