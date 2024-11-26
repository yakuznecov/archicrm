// Список компаний
import React, { useEffect, useCallback, useState } from 'react';
import { Table, Card, Modal, Form } from 'antd';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useCompaniesStore,
	useContrAgentDepositsStore,
	useDepartmentsStore,
	useCompanyAddress,
	useUserStore,
} from '@/storeZustand';

import { Toaster } from 'react-hot-toast'; // notifications
import { useToggle } from '@/hooks';

import Loader from '@/components/Common/Loader';
import { PrimaryBtn } from '@/components';
import CustomRadioCompanies from '@/pages/Outstaffing/customRadioCompanies';
import CompanyTabs from './companyTabs';
import useCompanyColumns from './hooks/useCompanyColumns';

const Companies = () => {
	const [form] = Form.useForm();
	const [modal, toggleModal] = useToggle(false);
	const [isEdit, setIsEdit] = useState(false);

	const isSuperUser = useUserStore((state) => state.isSuperUser);

	// Выбранный департамент
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	// Все компании
	const [
		loading,
		getCompanyById,
		getOwnCompanies,
		globalTypeCompany,
		ownCompanies,
		externalCompanies,
	] = useCompaniesStore(
		useShallow((state) => [
			state.loading,
			state.getCompanyById,
			state.getOwnCompanies,
			state.globalTypeCompany,
			state.ownCompanies,
			state.externalCompanies,
		])
	);

	// Адреса компании
	const [setSelectedAddresses] = useCompanyAddress(
		useShallow((state) => [state.setSelectedAddresses])
	);

	// Компании в соответствии с выбранным типом
	const companiesList =
		globalTypeCompany === 'Внешняя' ? externalCompanies : ownCompanies;

	// console.log('externalCompanies', externalCompanies);

	// Получить депозиты выбранной компании
	const [getSingleContrAgentDeposits] = useContrAgentDepositsStore(
		useShallow((state) => [state.getSingleContrAgentDeposits])
	);

	// получить список адресов компаний
	useEffect(() => {
		getOwnCompanies(selectedDepartment);
	}, [selectedDepartment]);

	// Отмена при закрытии модального окна
	const cancelFormFields = () => {
		toggleModal();
		setSelectedAddresses([]); // очистка выбранных адресов
	};

	// Информация о конкретной компании
	const handleCellClick = useCallback((id) => {
		getCompanyById(id);
		getSingleContrAgentDeposits(id);
		setIsEdit(true);
		toggleModal();
	}, []);

	// Добавить компанию
	const handleAddCompany = () => {
		form.resetFields(); // очистка формы
		setIsEdit(false);
		toggleModal();
	};

	// Колонки таблицы компаний
	const { columns } = useCompanyColumns(handleCellClick, isSuperUser);

	return (
		<div className='page-content'>
			<div className='container-fluid'>
				<div className='d-flex align-items-center justify-content-between mb-2'>
					{/* Выбор типа компании */}
					<CustomRadioCompanies />

					{isSuperUser && (
						<PrimaryBtn onClick={handleAddCompany}>Создать компанию</PrimaryBtn>
					)}
				</div>
				<Card>
					{loading && <Loader />}
					{!loading && companiesList && companiesList?.length > 0 && (
						<Table
							columns={columns}
							dataSource={companiesList}
							pagination={false}
							size='small'
							rowKey='id'
						/>
					)}
				</Card>

				<Modal
					title={isEdit ? 'Изменить данные компании' : 'Создать компанию'}
					open={modal}
					onCancel={cancelFormFields}
					width={1300}
					footer={null}
				>
					{/* Формы и депозиты в компании */}
					<CompanyTabs isEdit={isEdit} closeModal={toggleModal} form={form} />
				</Modal>
			</div>
			<Toaster position='top-right' reverseOrder={true} />
		</div>
	);
};

export default Companies;
