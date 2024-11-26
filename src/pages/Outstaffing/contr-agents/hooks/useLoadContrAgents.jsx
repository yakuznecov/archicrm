import { useSearch } from '@/hooks';
import { useContrAgentsGet } from '@/hooks';

export const useLoadContrAgents = () => {
	const { data, isFetching } = useContrAgentsGet();

	// глобальный поиск в таблице
	const { onSearch, filteredSearchData } = useSearch(data);

	// total count contr agents
	const totalCount = data?.length;

	// кол-во контрагентов, у которых user имеет какое-либо значение
	const contrAgentsByUserCount = data?.filter(
		(item) => item.user !== null
	).length;

	// кол-во контрагентов Санкт-Петербург
	const contrAgentsBySPbCount = data?.filter(
		(item) => item?.company?.city === 'Санкт-Петербург'
	).length;

	// кол-во контрагентов Москва
	const contrAgentsByMoscowCount = data?.filter(
		(item) => item?.company?.city !== 'Санкт-Петербург'
	).length;

	// кол-во контрагентов Санкт-Петербург, у которых user имеет какое-либо значение
	const contrAgentsByUserSPbCount = data?.filter(
		(item) => item?.company?.city === 'Санкт-Петербург' && item.user !== null
	).length;

	// кол-во контрагентов Москва, у которых user имеет какое-либо значение
	const contrAgentsByUserMoscowCount = data?.filter(
		(item) => item?.company?.city !== 'Санкт-Петербург' && item.user !== null
	).length;

	return {
		filteredSearchData,
		isFetching,
		onSearch,
		totalCount,
		contrAgentsByUserCount,
		contrAgentsBySPbCount,
		contrAgentsByMoscowCount,
		contrAgentsByUserSPbCount,
		contrAgentsByUserMoscowCount,
	};
};
