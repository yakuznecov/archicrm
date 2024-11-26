// Логика загрузки договора выбранного клиента
import { Form } from 'antd';
import { addContractOrder } from '@/services';
import { useContractService, useSelectedManager } from '@/hooks';
import useContractFields from '@/hooks/contract/useContractFields';
import { useContractsAdd } from './useContractsAdd';
import { useContractPatch } from './useContractPatch';

import {
	startOfToday,
	addDays,
	format,
	endOfMonth,
	differenceInDays,
} from 'date-fns'; // дата сегодня

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useCompaniesStore, useContractsStore } from '@/storeZustand';
import { useEffect } from 'react';

export function useLoadClientContract() {
	const [form] = Form.useForm();
	const today = startOfToday(); // текущая дата
	const tomorrow = addDays(today, 1); // дата завтра

	const { mutate: updateContract } = useContractPatch();

	// Последний день текущего месяца
	const endOfCurrentMonth = endOfMonth(today);

	// Количество дней до конца текущего месяца
	const daysUntilEndOfMonth = differenceInDays(endOfCurrentMonth, today);
	// console.log('daysUntilEndOfMonth', daysUntilEndOfMonth);

	const dayAfterMonth = addDays(today, daysUntilEndOfMonth);
	const formattedToday = format(today, 'yyyy-MM-dd');
	const formattedTomorrow = format(tomorrow, 'yyyy-MM-dd');
	const formattedDayAfterMonth = format(dayAfterMonth, 'yyyy-MM-dd');

	// Договоры клиента
	const [
		isEdit,
		contractId, // id договора, который только что создан
		contractById,
		loadingSingle, // загрузка договора
		selectedManager, // выбранный менеджер
		setSelectedManager, // установить выбранного менеджера
		contractClientId, // id клиента договора
	] = useContractsStore(
		useShallow((state) => [
			state.isEdit,
			state.contractId,
			state.contractById,
			state.loadingSingle,
			state.selectedManager,
			state.setSelectedManager,
			state.contractClientId,
		])
	);

	// Добавление договора
	const { mutate: addContract } = useContractsAdd();

	// Все компании
	const [selectedCompany] = useCompaniesStore(
		useShallow((state) => [state.selectedCompany])
	);

	const fields = useContractFields(contractById);

	// Список менеджеров для селекта
	const { outstaffManagerList } = useSelectedManager();

	// Место подачи в уведомлении
	const { name: fillingAddress = null } =
		selectedCompany?.address?.find(
			(item) => item?.type === 'Место подачи в уведомлении'
		) || {};

	// Список услуг для селекта
	const {
		contractServicesList,
		additionalServicesList,
		handleServiceChange,
		handleAdditionalServiceChange,
		selectedAllServices,
		selectedContractService,
		selectedAdditionalService,
		allServicesWithPrice, // выбранные услуги со стоимостью
	} = useContractService(contractById?.contract_service);
	const onFinish = async (values) => {
		if (!selectedManager) {
			return;
		}
		// if (!selectedManager || !selectedContractService) {
		// 	return;
		// }

		const id = isEdit ? contractById?.id : contractId;

		const updatedContract = {
			contract_number: values.contract_number, // Номер договора
			extending_number: values.extending_number, // Номер Доп соглашения
			contract_date: values.contract_date, // Дата договора
			extending_date: values.extending_date, // Дата Доп соглашения
			spravka_date: values.spravka_date, // Дата Справки
			work_start_date: values.work_start_date, // Дата начала работы
			work_end_date: values.work_end_date, // Дата окончания работы
			order_hire_number: values.order_hire_number, // Номер приказа о приеме
			order_hire_date: values.order_hire_date, // Дата Приема на работу
			order_fire_number: values.order_fire_number, // Номер приказа об увольнении
			order_fire_date: values.order_fire_date || null, // Дата увольнения
			start_period: values.start_period, // Начало периода
			end_period: values.end_period, // Конец периода
			kid_first_name: values.kid_first_name, // Имя ребенка
			kid_last_name: values.kid_last_name, // Фамилия ребенка
			kid_dob: values.kid_dob, // Дата рождения ребенка
			hodataystvo_date: values.hodataystvo_date, // Дата ходатайства
			client: contractClientId ? contractClientId : null, // Клиент договора
			notification_date: values.notification_date || null, // Дата уведомления
			notification_place: fillingAddress, // Место уведомления
			manager: selectedManager, // Менеджер
			contract_service: selectedAllServices, // Услуги договора
		};

		// если есть договор, то редактировать
		if (isEdit && contractById?.contract_number) {
			updateContract({ id, updatedContract }); // обновление договора
		} else {
			addContract(updatedContract); // добавление договора
		}

		// цикл для создания заказа из allServicesWithPrice
		for (const item of allServicesWithPrice) {
			const orderData = {
				contract: id,
				amount: item?.price,
				start_date: formattedToday,
				end_date:
					item.service_type === 2 ? formattedTomorrow : formattedDayAfterMonth, // если выбрана доп. услуга, то окончание равно завтра, иначе через 30 дней
			};

			if (id) {
				await addContractOrder(orderData);
			}
		}
	};

	return {
		form,
		fields,
		isEdit,
		contractById,
		loadingSingle,
		selectedManager,
		setSelectedManager,
		outstaffManagerList,
		contractServicesList,
		additionalServicesList,
		handleServiceChange,
		handleAdditionalServiceChange,
		selectedContractService,
		selectedAdditionalService,
		onFinish,
	};
}
