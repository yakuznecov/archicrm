import { Form } from 'antd';
import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useServiceRequestsStore } from '@/storeZustand';
import useRequestsFields from './useRequestsFields';
import { useServiceRequestPatch } from '@/hooks/queries/useServiceRequestPatch';

const useEditRequestModal = (selectedDepartment, selectedStatus) => {
	const mutation = useServiceRequestPatch();
	const [form] = Form.useForm();
	const [modal, setModal] = useState(false);
	const [serviceRequest, setServiceRequest] = useState(null);

	const toggleModal = () => setModal(!modal);

	const onFinish = (values) => {
		const id = serviceRequest?.id ?? 0;

		const changedServiceRequest = {
			name: values.name,
			phone: values.phone,
			email: values.email,
			notes: values.notes,
			from: values.from,
			city: values.city,
			status: values.status,
			department: selectedDepartment,
		};

		toggleModal();

		mutation.mutate({ id, changedServiceRequest });
	};

	// срабатывает при закрытии модалки
	const cancelFormFields = () => {
		toggleModal();
	};

	// Информация о конкретной заявке
	const handleCellClick = (request) => {
		setServiceRequest(request);
		toggleModal();
	};

	// поля в модальном окне
	const fields = useRequestsFields(serviceRequest);

	return {
		form,
		modal,
		toggleModal,
		handleCellClick,
		onFinish,
		fields,
		cancelFormFields,
	};
};

export default useEditRequestModal;
