import { useState, useEffect } from 'react';
import { addCompany, addCompanyAddress } from '@/services';
import {
	useCompanyFields,
	useSelectedCompanyAddress,
	useToggle,
} from '@/hooks';
import useFetchCompanyAddress from './useFetchCompanyAddress';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useCompaniesStore,
	useContrAgentsStore,
	useDepartmentsStore,
	useCompanyAddress,
} from '@/storeZustand';

const useCompanyData = (isEdit, closeModal) => {
	const [modal, toggleModal] = useToggle(false); // модалка создания адреса
	const [selectedAddressType, setSelectedAddressType] =
		useState('Фактический Адрес');

	const [loadingBtn, setLoadingBtn] = useState(false);

	// Выбранный департамент
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	const { companyAddressList } = useFetchCompanyAddress();

	// Все компании
	const [
		patchCompany,
		singleCompany, // получение компании при редактировании
		globalTypeCompany,
		getOwnCompanies,
		getExternalCompanies,
		selectedTypeCompany, // выбор типа компании (Внешняя или внутренняя)
		setSelectedTypeCompany,
	] = useCompaniesStore(
		useShallow((state) => [
			state.patchCompany,
			state.singleCompany,
			state.globalTypeCompany,
			state.getOwnCompanies,
			state.getExternalCompanies,
			state.selectedTypeCompany,
			state.setSelectedTypeCompany,
		])
	);

	// Адреса компании
	const [
		selectedAddresses, // выбранные адреса в модальном окне создания компании
		setSelectedAddresses,
	] = useCompanyAddress(
		useShallow((state) => [state.selectedAddresses, state.setSelectedAddresses])
	);

	// Контрагенты
	const [addContrAgent] = useContrAgentsStore(
		useShallow((state) => [state.addContrAgent])
	);

	const fields = useCompanyFields(singleCompany);

	const { getCompanyAddress } = useSelectedCompanyAddress(
		singleCompany.address
	);

	// Тип компании при редактировании
	useEffect(() => {
		if (singleCompany.id) {
			const singleCompanyAdresses = singleCompany?.address?.map(
				(address) => address.id
			);
			setSelectedAddresses(singleCompanyAdresses);
		}
	}, [singleCompany]);

	const onFinish = async (values) => {
		setLoadingBtn(true);
		const id = isEdit ? singleCompany.id : undefined;

		const companyData = {
			name: values.name,
			label: values.label,
			long_main_name: values.long_main_name,
			long_name: values.long_name,
			city: values.city,
			phone: values.phone,
			director: values.director,
			director_full_fio: values.director_full_fio || '.',
			director_full_fio_rod_padeg: values.director_full_fio_rod_padeg || '.',
			director_full_fio_dat_padeg: values.director_full_fio_dat_padeg || '.',
			buhgalter: values.buhgalter || '.',
			inn: values.inn || 1,
			kpp: values.kpp || 1,
			ogrn: values.ogrn || 1,
			bik: values.bik || 1,
			bank_name: values.bank_name || '.',
			bank_account_number: values.bank_account_number || 1,
			bank_account_number_corporate: values.bank_account_number_corporate || 1,
			okved: values.okved || 1,
			company_type: selectedTypeCompany || 'Внешняя', // тип компании
			address: selectedAddresses,
			department: selectedDepartment,
		};

		if (isEdit) {
			await patchCompany({ id, companyData });
		} else {
			const newCompanyId = await addCompany(companyData);
			// создание контрагента для внешней компании
			if (newCompanyId && selectedTypeCompany === 'Внешняя') {
				const data = {
					type: 'Компания',
					company: newCompanyId,
				};

				await addContrAgent(data);
			}
		}

		setTimeout(() => {
			setLoadingBtn(false);
			closeModal(); // закрыть основное модальное окно
			setSelectedAddresses([]); // очистка адресов
		}, 700);

		// обновление списка компаний после создания
		if (globalTypeCompany === 'Внешняя') {
			await getExternalCompanies(selectedDepartment);
		} else {
			await getOwnCompanies(selectedDepartment);
		}
	};

	// добавить адрес компании в модальном окне
	const onFinishAddress = async (values) => {
		const addressData = {
			name: values.address,
			type: selectedAddressType,
		};

		toggleModal();

		await addCompanyAddress(addressData);
		await getCompanyAddress();
	};

	// выбор типа адреса
	const handleOptionChange = (event) => {
		setSelectedAddressType(event.target.value);
	};

	return {
		fields,
		companyAddressList,
		selectedDepartment,
		selectedTypeCompany,
		selectedAddressType,
		selectedAddresses,
		setSelectedAddresses,
		setSelectedTypeCompany,
		onFinish,
		onFinishAddress,
		loadingBtn,
		modal,
		toggleModal,
		handleOptionChange,
	};
};

export default useCompanyData;
