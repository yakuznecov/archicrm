// Депозиты компаний
import React from 'react';
import { Table, Modal } from 'antd';
import Loader from '@/components/Common/Loader';
import useLoadDeposits from './hooks/useLoadDeposits';
import useDepositFilters from './hooks/useDepositFilters';
import DepositForm from './DepositForm';
import DepositFilters from './DepositFilters';

const paymentTypeOptions = [
	{ value: 1, label: 'Нал' },
	{ value: 2, label: 'Безнал' },
];

const CompanyDeposits = () => {
	// Логика фильтров депозитов
	const {
		paymentType,
		resetFilters,
		selectedManager,
		contrAgentsItems,
		selectedContrAgentFilter,
		applyFilters,
		handleManagerChange,
		handlePaymentTypeChange,
		handleContrAgentFilterChange,
	} = useDepositFilters();

	// загрузка депозитов компании
	const {
		modal,
		isBuh,
		isEdit,
		loading,
		columns,
		loadingBtn,
		toggleModal,
		isCheckedNds,
		selectedOwnCompany,
		selectedContrAgent,
		contrAgentDepositsList,
		selectedContrAgentDeposit,
		onFinish,
		onChangeNds,
		handleAddDeposit,
		handleOwnCompanyChange,
		handleContrAgentChange,
	} = useLoadDeposits();

	return (
		<>
			<DepositFilters
				paymentType={paymentType}
				applyFilters={applyFilters}
				resetFilters={resetFilters}
				selectedManager={selectedManager}
				contrAgentsItems={contrAgentsItems}
				handleAddDeposit={handleAddDeposit}
				paymentTypeOptions={paymentTypeOptions}
				handleContrAgentFilterChange={handleContrAgentFilterChange}
				handleManagerChange={handleManagerChange}
				handlePaymentTypeChange={handlePaymentTypeChange}
				selectedContrAgentFilter={selectedContrAgentFilter}
			/>

			{loading && <Loader />}
			{!loading &&
				contrAgentDepositsList &&
				contrAgentDepositsList?.length > 0 && (
					<Table
						columns={columns}
						dataSource={contrAgentDepositsList}
						size='small'
						rowKey='id'
					/>
				)}

			<Modal
				title={isEdit ? 'Редактирование депозита' : 'Добавление депозита'}
				open={modal}
				onCancel={toggleModal}
				width={400}
				footer={null}
			>
				<DepositForm
					isEdit={isEdit}
					onFinish={onFinish}
					loadingBtn={loadingBtn}
					isBuh={isBuh}
					loading={loading}
					isCheckedNds={isCheckedNds}
					onChangeNds={onChangeNds}
					selectedContrAgentDeposit={selectedContrAgentDeposit}
					selectedContrAgent={selectedContrAgent}
					contrAgentsItems={contrAgentsItems}
					selectedOwnCompany={selectedOwnCompany}
					handleOwnCompanyChange={handleOwnCompanyChange}
					handleContrAgentChange={handleContrAgentChange}
				/>
			</Modal>
		</>
	);
};

export default CompanyDeposits;
