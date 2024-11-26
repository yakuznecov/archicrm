// получение договоров
import { useQuery } from '@tanstack/react-query';
import { getContractsParams } from '@/services';
import { useContractsStore } from '@/storeZustand';

export function useContractsGet() {
	const { filters } = useContractsStore();

	// Проверяем, есть ли хоть один фильтр
	const hasFilters = Object.keys(filters).some((key) => !!filters[key]);

	return useQuery({
		queryKey: ['outstaffContracts', filters],
		queryFn: () => getContractsParams(filters),
		refetchOnWindowFocus: false,
		enabled: hasFilters,
	});
}
