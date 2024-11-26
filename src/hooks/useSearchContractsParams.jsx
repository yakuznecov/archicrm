// useSearchContractsParams, параметры поиска договора по имени, фамилии и номеру договора
import { useState } from 'react';
import { Form } from 'antd';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useContractsStore, useDateRangeStore } from '@/storeZustand';

const useSearchContractsParams = () => {
	const [form] = Form.useForm();
	const [isCityChecked, setIsCityChecked] = useState(true); // город выбран по умолчанию для поиска

	// Диапазоны дат из Zustand store
	const [startDate, endDate] = useDateRangeStore(
		useShallow((state) => [state.startDate, state.endDate])
	);

	// Договоры клиента
	const [getTodayContracts, selectedCity, setSearchFilters, addFilter] =
		useContractsStore(
			useShallow((state) => [
				state.getTodayContracts,
				state.selectedCity,
				state.setSearchFilters,
				state.addFilter,
			])
		);

	// Поиск в таблице договоров
	const onFinish = async (values) => {
		if (!values) return;

		const filters = {
			last_name: values.last_name || null,
			first_name: values.first_name || null,
			contract_number: values.contract_number || null,
			city: isCityChecked ? selectedCity : null,
		};

		setSearchFilters(filters);
	};

	// Очистить формы
	const clearForms = () => {
		form.resetFields(); // очистка формы

		const filters = {
			last_name: null,
			first_name: null,
			contract_number: null,
			city: selectedCity,
			fire: 'true',
			start_date: startDate,
			end_date: endDate,
		};

		addFilter(filters);
	};

	const handleCheckboxChange = (e) => {
		const value = e.target.checked;
		setIsCityChecked(value);

		addFilter({ city: value ? selectedCity : null });
	};

	return { onFinish, clearForms, form, isCityChecked, handleCheckboxChange };
};

export default useSearchContractsParams;
