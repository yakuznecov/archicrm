// Логика загрузки договоров
import { useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import { useContractsGet } from './useContractsGet';
import { getContractsParams } from '@/services';
import { getToday, getSevenDaysAgo } from '@/helpers/Date/dayjs';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useContractsStore,
	useDateRangeStore,
	useServiceRequestsStore,
	useDepartmentsStore,
} from '@/storeZustand';

export const useLoadContracts = () => {
	const { data, isFetching } = useContractsGet();

	// Диапазоны дат из Zustand store
	const [startDate, endDate] = useDateRangeStore(
		useShallow((state) => [state.startDate, state.endDate])
	);

	// Загрузка данных департамента
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	// Загрузка заявок для проверка новых
	const [getServiceRequests] = useServiceRequestsStore(
		useShallow((state) => [state.getServiceRequests])
	);

	// Договоры клиента
	const [
		selectedCity,
		getContractById,
		addFilter,
		setDisapprovedContractsCount,
		filters,
	] = useContractsStore(
		useShallow((state) => [
			state.selectedCity,
			state.getContractById,
			state.addFilter,
			state.setDisapprovedContractsCount,
			state.filters,
		])
	);

	// Функция для фильтрации данных, если выбран контрагент
	const filterData = (data, filters) => {
		if (filters.contr_agent_id) {
			return data?.filter((item) => {
				const fireDate = item.order_fire_date;

				return fireDate === null || dayjs(fireDate).isSame(dayjs(), 'month');
			});
		}
		return data;
	};

	const filteredData = filterData(data, filters);

	// данные для фильтрации
	const filtersData = useMemo(
		() => ({
			city: selectedCity,
			fire: 'true',
			start_date: startDate,
			end_date: endDate,
		}),
		[selectedCity, startDate, endDate]
	);

	// данные для заявок
	const statusData = {
		departmentId: selectedDepartment,
		selectedStatus: '1',
	};

	useEffect(() => {
		// загрузка заявок по статусу 1 (новая)
		if (selectedDepartment) {
			getServiceRequests(statusData);
			addFilter(filtersData);
		}
	}, [startDate, endDate, selectedCity]);

	// фильтрация неодобренных договоров и запись в store
	useEffect(() => {
		const fetchData = async () => {
			const dataApproved = {
				city: selectedCity,
				fire: 'true',
				start_date: getSevenDaysAgo(),
				end_date: getToday(),
				is_client_approved: 'false',
			};

			try {
				const response = await getContractsParams(dataApproved);
				const count = response.length;
				setDisapprovedContractsCount(count);
			} catch (error) {
				console.error(
					'Произошла ошибка при загрузке договоров клиентов.',
					error
				);
			}
		};

		fetchData();
	}, [selectedCity, startDate, endDate]);

	return {
		filteredData,
		isFetching,
		getContractById,
	};
};
