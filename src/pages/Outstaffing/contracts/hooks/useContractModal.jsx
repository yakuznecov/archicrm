import { useState } from 'react';
import { Form } from 'antd';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useContractsStore,
	useOutStaff,
	useProcuratory,
	useTemplatesStore,
	useCompaniesStore,
} from '@/storeZustand';

export const useContractModal = () => {
	const [form] = Form.useForm();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [clearUploadFilesList] = useOutStaff(
		useShallow((state) => [state.clearUploadFilesList])
	);

	// Выбор компании
	const [setSelectedCompany] = useCompaniesStore(
		useShallow((state) => [state.setSelectedCompany])
	);

	// Доверенности, установка
	const [setSelectedProcuratory] = useProcuratory(
		useShallow((state) => [state.setSelectedProcuratory])
	);

	// Договоры клиента
	const [
		clearContract,
		clearContractId,
		setActiveKey,
		clearContractClientId,
		isEdit, // режим редактирования
		setIsEdit,
		setSelectedManager,
		setSelectedContrAgent,
	] = useContractsStore(
		useShallow((state) => [
			state.clearContract,
			state.clearContractId,
			state.setActiveKey,
			state.clearContractClientId,
			state.isEdit,
			state.setIsEdit,
			state.setSelectedManager,
			state.setSelectedContrAgent,
		])
	);

	// Шаблоны
	const [
		clearSelectedTemplateSet, // очистка набора шаблонов
	] = useTemplatesStore(
		useShallow((state) => [state.clearSelectedTemplateSet])
	);

	const handleResetFields = () => {
		form.resetFields(); // Сбрасываем поля формы
	};

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
		clearForms(); // очистка форм
		setSelectedCompany(null); // очистка компании в табе клиента
		setSelectedProcuratory(null); // очистка доверенности
		setActiveKey('1'); // сброс активного таба
	};

	const clearForms = () => {
		clearContract();
		clearContractId();
		clearUploadFilesList();
		clearContractClientId();
		clearSelectedTemplateSet();
		handleResetFields();
	};

	return {
		form,
		isEdit,
		isModalOpen,
		toggleModal,
		setIsEdit,
		clearForms,
		clearContract,
		clearContractId,
		setSelectedManager,
		setSelectedContrAgent,
	};
};
