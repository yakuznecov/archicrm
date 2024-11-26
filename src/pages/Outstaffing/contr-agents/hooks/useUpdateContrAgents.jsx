// обновление контрагентов
import { useState } from 'react';
import {
	useLoadExternalCompanies,
	useToggle,
	useContrAgentPatch,
} from '@/hooks';
import { useContrAgentsColumns } from './useContrAgentsColumns';

export const useUpdateContrAgents = () => {
	const mutation = useContrAgentPatch();

	const [modal, toggleModal] = useToggle(false);
	const [loadingBtn, setLoadingBtn] = useState(false); // кнопка загрузки
	const [contrAgentId, setContrAgentId] = useState(null);
	const [selectedExternalCompany, setSelectedExternalCompany] = useState({});
	const [statusType, setStatusType] = useState('Новый'); // статус контрагента

	// изменение статуса контрагента
	const handleStatusChange = (event) => {
		const value = event.target.value;
		setStatusType(value);
	};

	// Загрузка списка контрагентов
	const { externalCompaniesList } = useLoadExternalCompanies();

	// Изменение внешней компании
	const handleExternalCompanyChange = (value) => {
		setSelectedExternalCompany(value);
	};

	const onFinish = () => {
		setLoadingBtn(true);

		const data = {
			status: statusType,
			company: selectedExternalCompany,
		};

		mutation.mutate({ id: contrAgentId, data });

		setTimeout(() => {
			setLoadingBtn(false);
			toggleModal();
		}, 1500);
	};

	// клик по контрагенту для обновления
	const handleContrAgentClick = (agent) => {
		const { id, company = null, status } = agent;
		setContrAgentId(id);
		setStatusType(status);
		setSelectedExternalCompany(company?.id);
		toggleModal();
	};

	// колонки для таблицы контрагентов
	const columns = useContrAgentsColumns(handleContrAgentClick);

	return {
		modal,
		columns,
		onFinish,
		statusType,
		loadingBtn,
		toggleModal,
		externalCompaniesList,
		handleStatusChange,
		selectedExternalCompany,
		handleExternalCompanyChange,
	};
};
