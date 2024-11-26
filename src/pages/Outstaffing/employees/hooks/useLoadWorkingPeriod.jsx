// Логика загрузки рабочего периода
import { useEffect } from 'react';
import { Form } from 'antd';
import { useEmployeesColumns } from './useEmployeesColumns';
import { useToggle, useWorkingPeriodFields } from '@/hooks';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useWorkingPeriodStore,
	useDepartmentsStore,
	useDateRangeStore,
	useUserStore,
} from '@/storeZustand';

export const useLoadWorkingPeriod = () => {
	const [form] = Form.useForm();
	const [modal, toggleModal] = useToggle(false);

	// Загрузка id сотрудника
	const [isSuperUser] = useUserStore(
		useShallow((state) => [state.isSuperUser])
	);

	// Выбранный департамент
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	// Диапазоны дат
	const [startDate] = useDateRangeStore(
		useShallow((state) => [state.startDate])
	);

	// Данные о рабочем периоде
	const [
		loading,
		loadingById,
		workingPeriodList,
		workingPeriodById, // данные конкретного сотрудника
		getWorkingPeriod,
		patchWorkingPeriod,
		getWorkingPeriodById,
	] = useWorkingPeriodStore(
		useShallow((state) => [
			state.loading,
			state.loadingById,
			state.workingPeriodList,
			state.workingPeriodById,
			state.getWorkingPeriod,
			state.patchWorkingPeriod,
			state.getWorkingPeriodById,
		])
	);

	const dataPeriod = {
		department_id: selectedDepartment,
		date: startDate,
	};

	// Загрузка данных рабочего времени и бонусов
	useEffect(() => {
		getWorkingPeriod(dataPeriod);
	}, [startDate, selectedDepartment]);

	// Данные сотрудника в модальном окне
	const staffName = `${workingPeriodById?.staff?.name || ''} ${
		workingPeriodById?.staff?.surname || ''
	}`;

	// Обновление данных о рабочем времени сотрудника
	const onFinish = async (values) => {
		const id = workingPeriodById?.id;

		const newWorkingPeriod = {
			start_date_time: values.start_date_time,
			finish_date_time: values.finish_date_time,
			total_hours_in_day: values.total_hours_in_day,
			bonus_per_day: values.bonus_per_day,
			description: values.description,
		};

		await patchWorkingPeriod({ id, newWorkingPeriod });
		await getWorkingPeriod(dataPeriod);
		toggleModal();
	};

	// Информация о конкретном сотруднике
	const handleCellClick = (id) => {
		getWorkingPeriodById(id); // запрос по id данных сотрудника
		toggleModal();
	};

	const cancelFormFields = () => {
		toggleModal();
		form.resetFields();
	};

	const columns = useEmployeesColumns(handleCellClick, isSuperUser);
	const fields = useWorkingPeriodFields(workingPeriodById);

	return {
		workingPeriodList,
		loading,
		columns,
		modal,
		cancelFormFields,
		form,
		fields,
		onFinish,
		staffName,
		loadingById,
	};
};
