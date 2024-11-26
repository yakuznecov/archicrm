import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getOutstaffWorkers } from '@/services';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useStaffStore,
	useDepartmentsStore,
	useWorkingPeriodStore,
	useDateRangeStore,
	useUserStore,
} from '@/storeZustand';

export const useFetchOutstaffWorkers = () => {
	// Выбранный департамент
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	// Получение сотрудников по группе outstaff и департаменту
	const [setManagers, setStaffDelo, setStaffByCourier, setStaffByBuh] =
		useStaffStore(
			useShallow((state) => [
				state.setManagers,
				state.setStaffDelo,
				state.setStaffByCourier,
				state.setStaffByBuh,
			])
		);

	const { data, isPending, isError } = useQuery({
		queryKey: ['outstaffWorkers', selectedDepartment],
		queryFn: () => getOutstaffWorkers(selectedDepartment), // Функция для выполнения запроса
		enabled: !!selectedDepartment, // Запрос будет выполняться только если выбран департамент
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (data) {
			// фильтрация по менеджерам
			const managersList = data.filter(
				(worker) =>
					worker.profession_name.profession_name === 'Менеджер аутстафф'
			);

			// фильтрация по делопроизводителям
			const staffDeloList = data.filter(
				(worker) =>
					worker.profession_name.profession_name ===
					'Делопроизводитель аутстафф'
			);

			// фильтрация по курьерам
			const staffByCourierList = data.filter(
				(worker) => worker.profession_name.profession_name === 'Курьер аутстафф'
			);

			// фильтрация по сотрудникам бухгалтерии
			const staffByBuhList = data.filter(
				(worker) => worker.profession_name.profession_name === 'Бухгалтер'
			);

			setManagers(managersList);
			setStaffDelo(staffDeloList);
			setStaffByCourier(staffByCourierList);
			setStaffByBuh(staffByBuhList);
		}
	}, [data]);

	return { isPending };
};
