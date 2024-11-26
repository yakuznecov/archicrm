// загрузка сотрудников аутстафф
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Form } from 'antd';
import { errorToast } from '@/components';
import { useFetchOutstaffWorkers } from './useFetchOutstaffWorkers';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useStaffStore,
	useDepartmentsStore,
	useWorkingPeriodStore,
	useDateRangeStore,
	useUserStore,
} from '@/storeZustand';

import { useStaffByOutstaffColumns } from './useStaffByOutstaffColumns';
import { useStaffFields, useToggle } from '@/hooks';

export const useLoadOutstaffWorkers = () => {
	const { isPending } = useFetchOutstaffWorkers();

	const today = dayjs(); // Сегодняшняя дата
	const [form] = Form.useForm();
	// модальное окно времени начала работы
	const [modalStaff, toggleModalStaff] = useToggle(false);
	const [isTimeAdded, setIsTimeAdded] = useState(false);

	// Загрузка id сотрудника
	const [
		staffId,
		isSuperUser,
		isBuh,
		isOutstaff,
		isCourier,
		isDelo,
		isManager,
	] = useUserStore(
		useShallow((state) => [
			state.staffId,
			state.isSuperUser,
			state.isBuh,
			state.isOutstaff,
			state.isCourier,
			state.isDelo,
			state.isManager,
		])
	);

	// Выбранный департамент
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	// Диапазоны дат из Zustand store
	const [startDate] = useDateRangeStore(
		useShallow((state) => [state.startDate])
	);

	// Получение сотрудников по группе outstaff и департаменту
	const [
		getOutstaffWorkers,
		getStaffByGroupSingle,
		singleStaff,
		staffByBuhList,
		staffByCourierList,
		loadingCourier,
		managersList,
		loading,
		staffDeloList,
	] = useStaffStore(
		useShallow((state) => [
			state.getOutstaffWorkers,
			state.getStaffByGroupSingle,
			state.singleStaff,
			state.staffByBuhList,
			state.staffByCourierList,
			state.loadingCourier,
			state.managersList,
			state.loading,
			state.staffDeloList,
		])
	);

	// Фильтрация сотрудников по staffId делопроизводство
	const filteredDelo = staffDeloList?.filter((staff) => staff.id === staffId);
	const staffDelo = isSuperUser ? staffDeloList : filteredDelo;

	// Фильтрация сотрудников по staffId бухгалтерия
	const filteredBuh = staffByBuhList?.filter((staff) => staff.id === staffId);
	const staffBuh = isSuperUser ? staffByBuhList : filteredBuh;

	// Фильтрация сотрудников по staffId менеджеры
	const filteredManager = managersList?.filter((staff) => staff.id === staffId);
	const staffManager = isSuperUser ? managersList : filteredManager;

	// Фильтрация сотрудников по staffId курьеры
	const filteredCourier = staffByCourierList?.filter(
		(staff) => staff.id === staffId
	);
	const staffCourier = isSuperUser ? staffByCourierList : filteredCourier;

	// Список сотрудников по профессиям
	const roleMappings = [
		{ role: isManager, title: 'Менеджеры', data: staffManager },
		{ role: isDelo, title: 'Делопроизводство', data: staffDelo },
		{ role: isCourier, title: 'Курьеры', data: staffCourier },
		{ role: isBuh, title: 'Бухгалтерия', data: staffBuh },
	];

	// Данные о рабочем периоде
	const [getWorkingPeriod, addWorkingPeriod, workingPeriodList] =
		useWorkingPeriodStore(
			useShallow((state) => [
				state.getWorkingPeriod,
				state.addWorkingPeriod,
				state.workingPeriodList,
			])
		);

	// Загрузка данных сотрудников
	useEffect(() => {
		// загрузка всех сотрудников
		// getOutstaffWorkers(selectedDepartment);
	}, [selectedDepartment]);

	// Добавляет начало рабочего времени сотрудника
	const onFinish = async (values) => {
		const newWorkingPeriod = {
			start_date_time: values.start_date_time,
			staff: singleStaff?.id,
		};

		const data = {
			department_id: selectedDepartment,
			date: startDate,
		};

		await addWorkingPeriod(newWorkingPeriod);
		await getWorkingPeriod(data);
		toggleModalStaff();
	};

	const handleCellClick = async (id) => {
		// если не сегодня, то нельзя установить дату начала рабочего времени
		if (startDate !== today.format('YYYY-MM-DD')) {
			errorToast('Выберите сегодняшнюю дату!');
			return;
		}

		// Проверка на наличие у сотрудника добавленного времени начала работы, чтобы избежать дублирования
		const isTimeAdded = workingPeriodList.some(
			(workingPeriod) => workingPeriod.staff.id === id
		);

		// true, если время ранее было добавлено выбранному сотруднику
		setIsTimeAdded(isTimeAdded);

		await getStaffByGroupSingle(id);
		toggleModalStaff();
	};

	const cancelFormFields = () => {
		toggleModalStaff();
		form.resetFields();
	};

	const columns = useStaffByOutstaffColumns(handleCellClick);
	const fields = useStaffFields(singleStaff); // поля для формы

	return {
		columns,
		getOutstaffWorkers,
		modalStaff,
		fields,
		cancelFormFields,
		form,
		onFinish,
		isTimeAdded,
		isSuperUser,
		isOutstaff,
		staffByCourierList,
		loadingCourier,
		managersList,
		loading,
		staffDeloList,
		roleMappings,
		isPending,
	};
};
