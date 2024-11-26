// формы при создании компании
import React from 'react';

import useCompanyData from './hooks/useCompanyData';
import { AddressModal } from '@/components';
import { companyTypes } from '@/common/data/companyTypes';
import CompanyForm from './CompanyForm';

// Информация о конкретной компании в модальном окне, формы
const CompanyFormsTab = ({ isEdit, closeModal, form }) => {
	const {
		fields,
		onFinish,
		loadingBtn,
		modal,
		toggleModal,
		selectedTypeCompany,
		setSelectedTypeCompany,
		selectedAddressType,
		handleOptionChange,
		onFinishAddress,
		selectedAddresses,
		setSelectedAddresses,
		companyAddressList,
	} = useCompanyData(isEdit, closeModal);

	return (
		<>
			<CompanyForm
				fields={fields}
				onFinish={onFinish}
				autoComplete='off'
				form={form}
				selectedTypeCompany={selectedTypeCompany}
				setSelectedTypeCompany={setSelectedTypeCompany}
				companyTypes={companyTypes}
				companyAddressList={companyAddressList}
				selectedAddresses={selectedAddresses}
				setSelectedAddresses={setSelectedAddresses}
				toggleModal={toggleModal}
				loadingBtn={loadingBtn}
				isEdit={isEdit}
			/>
			{/* модальное окно добавления адреса */}
			<AddressModal
				open={modal}
				toggleModal={toggleModal}
				onCancel={toggleModal}
				onFinish={onFinishAddress}
				selectedType={selectedAddressType}
				handleOptionChange={handleOptionChange}
			/>
		</>
	);
};

export default CompanyFormsTab;
