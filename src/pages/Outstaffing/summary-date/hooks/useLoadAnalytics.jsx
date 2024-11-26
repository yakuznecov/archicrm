// логика загрузки аналитики выбранных внутренних компаний
import { useEffect, useState } from 'react';
import { useFetchOwnCompanies } from '@/hooks';
import { formatIsoTimeToString } from '@/helpers/Date/formatDate';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useContrAgentAnalyticsStore, useDateRangeStore } from '@/storeZustand';

const useLoadAnalytics = () => {
	const [selectedCompanies, setSelectedCompanies] = useState(null);

	// Список собственных компаний
	const { ownCompaniesList } = useFetchOwnCompanies();

	// Диапазоны дат
	const [startDate, endDate] = useDateRangeStore(
		useShallow((state) => [state.startDate, state.endDate])
	);

	// Депозиты компаний
	const [
		analyticsList,
		postAnalytics,
		analyticsListByDate,
		postAnalyticsByDate,
		loading,
	] = useContrAgentAnalyticsStore(
		useShallow((state) => [
			state.analyticsList,
			state.postAnalytics,
			state.analyticsListByDate,
			state.postAnalyticsByDate,
			state.loading,
		])
	);
	// console.log('analyticsList', analyticsList);

	const activeContractsValue = analyticsList?.contract_active; // кол-во активных договоров
	const activeContractsValueByDate = analyticsListByDate?.contract_active; // кол-во активных договоров по дате
	const firedContractsValue = analyticsList?.contract_fired; // кол-во уволенных
	const templateList = analyticsList?.contract_group_list; // кол-во шаблонов
	const depositBalance = analyticsList?.deposit_balance; // баланс компании
	const templateListByDate = analyticsListByDate?.contract_group_list; // кол-во шаблонов по дате

	useEffect(() => {
		if (ownCompaniesList) {
			const allValues = ownCompaniesList.map((option) => option.value);
			setSelectedCompanies(allValues);
		}
	}, [ownCompaniesList]);

	useEffect(() => {
		if (selectedCompanies) {
			handleLoadAnalytics();
		}
	}, [selectedCompanies]);

	// загрузка за конкретную дату
	useEffect(() => {
		const data = {
			start_date: startDate || formatIsoTimeToString(new Date()),
			end_date: endDate || formatIsoTimeToString(new Date()),
			company_id_list: selectedCompanies,
		};

		if (selectedCompanies && endDate) {
			postAnalyticsByDate(data);
		}
	}, [selectedCompanies, endDate]);

	const handleSelectedCompany = async (value) => {
		setSelectedCompanies(value);
	};

	const handleSelectAll = () => {
		const allValues = ownCompaniesList.map((option) => option.value);
		setSelectedCompanies(allValues);
	};

	// запрос аналитики по собственным компаниям
	const handleLoadAnalytics = async () => {
		const data = {
			start_date: '2023-10-30',
			end_date: formatIsoTimeToString(new Date()),
			company_id_list: selectedCompanies,
		};

		await postAnalytics(data);
	};

	return {
		handleSelectedCompany,
		selectedCompanies,
		handleSelectAll,
		ownCompaniesList,
		activeContractsValue,
		loading,
		templateList,
		firedContractsValue,
		templateListByDate,
		activeContractsValueByDate,
		depositBalance,
	};
};

export default useLoadAnalytics;
