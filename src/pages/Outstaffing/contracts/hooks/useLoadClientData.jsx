// Логика загрузки данных клиента
import React, { useState } from 'react';
import { updateClientOutstaff, patchContract } from '@/services';
import { useClientFields, useLoadContrAgents } from '@/hooks';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useClientsOutstaffStore,
	useCompaniesStore,
	useContractsStore,
	useProcuratory,
} from '@/storeZustand';

export default function useLoadClientData() {
	// Выбранный контрагент физик с данными
	const [selectedContrAgentData, setSelectedContrAgentData] = useState(null);

	// Договоры клиента
	const [
		isEdit,
		contractById,
		contractId, // id договора
		selectedContrAgent, // выбранный контрагент
		setSelectedContrAgent,
		setContractClientId,
		contractClientId,
	] = useContractsStore(
		useShallow((state) => [
			state.isEdit,
			state.contractById,
			state.contractId,
			state.selectedContrAgent,
			state.setSelectedContrAgent,
			state.setContractClientId,
			state.contractClientId,
		])
	);

	// Все клиенты аутстафф
	const [
		addClientOutstaff, // добавить клиента
	] = useClientsOutstaffStore((state) => [state.addClientOutstaff]);

	// Все доверенности
	const [selectedProcuratory] = useProcuratory(
		useShallow((state) => [state.selectedProcuratory])
	);

	// Все компании
	const [selectedCompany = null] = useCompaniesStore(
		useShallow((state) => [state.selectedCompany])
	);

	const fields = useClientFields(
		contractById?.client || selectedContrAgentData
	);

	// Загрузка списка контрагентов
	const { contrAgentsItems, contrAgentsLoading } = useLoadContrAgents();

	// Обновление или добавление клиента
	const onFinish = async (values) => {
		const id = isEdit ? contractClientId : undefined;

		const updatedClient = {
			first_name: values.first_name,
			first_name_dat_padeg: values.first_name_dat_padeg,
			second_name: values.second_name || null,
			second_name_dat_padeg: values.second_name_dat_padeg || null,
			last_name: values.last_name,
			last_name_dat_padeg: values.last_name_dat_padeg,
			fio: values.fio,
			fio_rod_padeg: values.fio_rod_padeg,
			dob: values.dob,
			phone: values.phone || null,
			passport_place_created: values.passportPlaceCreated || null,
			passport_address: values.passportAddress,
			mail_address: values.mail_address, // почтовый адрес
			profession: values.profession,
			skill: values.skill,
			bank_account: values.bank_account,
			company: selectedCompany, // id компании
			birth_place: values.birth_place || null,
			citizen: values.citizen || null,
			description: values.description,
			client_city: values.client_city || null, // город у клиента для договора
		};

		// если редактирование и есть id
		if (isEdit && id) {
			await updateClientOutstaff({ updatedClient, id });

			// Обновление договора с доверенностью и контрагентом
			const updatedContract = {
				procuratory: selectedProcuratory || null, // Доверенность
				contr_agent: selectedContrAgent || null, // Контрагент
				is_client_approved: 'true', // одобрение клиента, чтобы отделить от договоров из личного кабинета
			};

			await patchContract({ id: contractId, updatedContract });
		} else {
			// добавление клиента
			let customerId = await addClientOutstaff(updatedClient);
			setContractClientId(customerId);
			// console.log('customerId', customerId);

			// Обновление договора после добавления клиента
			const updatedContract = {
				client: customerId,
				procuratory: selectedProcuratory || null, // Доверенность
				contr_agent: selectedContrAgent || null, // Контрагент
				is_client_approved: 'true', // одобрение клиента, чтобы отделить от договоров из личного кабинета
			};

			await patchContract({ id: contractId, updatedContract });
			customerId = null;
		}
	};

	// выбор контрагента в селекте
	const handleContrAgentChange = (value, option) => {
		// добавляем данные только физика, чтобы прокинуть в формы
		if (option.type === 'Физик') {
			setSelectedContrAgentData(option);
		}
		setSelectedContrAgent(value);
	};

	return {
		isEdit,
		fields,
		onFinish,
		contractById,
		selectedCompany,
		contrAgentsItems,
		contrAgentsLoading,
		selectedContrAgent,
		handleContrAgentChange,
	};
}
