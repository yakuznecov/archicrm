// Заказы
import React from 'react';
import { Table, Modal } from 'antd';
import Loader from '@/components/Common/Loader';
import { Toaster } from 'react-hot-toast';

import {
	useContractOrdersColumns,
	useSelectedManager,
	useLoadContrAgents,
} from '@/hooks';

import CompanyBalanceDashboard from './CompanyBalanceDashboard';
import ContractOrdersForm from './ContractOrdersForm';
import useContractOrdersFilters from './hooks/useContractOrdersFilters';
import useLoadContractOrders from './hooks/useLoadContractOrders';
import ContractOrdersFilters from './ContractOrdersFilters';

const paymentTypeOptions = [
	{ value: 1, label: 'Нал' },
	{ value: 2, label: 'Безнал' },
];

const ContractOrders = () => {
	// фильтры заказов
	const {
		selectedManager,
		selectedContrAgent,
		contractNumber,
		resetFilters,
		handleManagerChange,
		applyFilters,
		handleContractNumberChange,
		handleContrAgentChange,
	} = useContractOrdersFilters();

	// Заказы к договорам
	const {
		form,
		companyName,
		companyBalance,
		// editModal,
		modal,
		contractOrdersList,
		loading,
		// loadingEditBtn,
		// toggleEditModal,
		// onEditFinish,
		toggleModal,
		handleCellClick,
		handleAddPayment,
		paymentType,
		handlePaymentTypeChange,
		loadingBtn,
		rowSelection,
		totalPaymentAmount,
		onFinish,
	} = useLoadContractOrders();

	// Список менеджеров для селекта
	const { outstaffManagerList } = useSelectedManager();

	// Загрузка списка контрагентов
	const { contrAgentsItems } = useLoadContrAgents();

	// колонки в таблице заказов
	const columns = useContractOrdersColumns(handleCellClick);

	return (
		<>
			<div className='mb-2'>
				<CompanyBalanceDashboard />
			</div>

			{/* Фильтры */}
			<ContractOrdersFilters
				outstaffManagerList={outstaffManagerList}
				contrAgentsItems={contrAgentsItems}
				handleAddPayment={handleAddPayment}
				resetFilters={resetFilters}
				selectedManager={selectedManager}
				selectedContrAgent={selectedContrAgent}
				contractNumber={contractNumber}
				applyFilters={applyFilters}
				handleManagerChange={handleManagerChange}
				handleContrAgentChange={handleContrAgentChange}
				handleContractNumberChange={handleContractNumberChange}
			/>

			{loading && <Loader />}
			{!loading && contractOrdersList && contractOrdersList?.length > 0 && (
				<Table
					rowSelection={rowSelection}
					columns={columns}
					dataSource={contractOrdersList}
					size='small'
					rowKey='id'
				/>
			)}

			<Modal
				title='Создать оплату'
				open={modal}
				onCancel={toggleModal}
				width={320}
				footer={null}
			>
				<ContractOrdersForm
					form={form}
					companyName={companyName}
					companyBalance={companyBalance}
					totalPaymentAmount={totalPaymentAmount}
					paymentType={paymentType}
					handlePaymentTypeChange={handlePaymentTypeChange}
					paymentTypeOptions={paymentTypeOptions}
					loadingBtn={loadingBtn}
					onFinish={onFinish}
				/>
			</Modal>

			{/* <Modal
				title='Проверьте баланс компании перед изменением суммы'
				open={editModal}
				onCancel={toggleEditModal}
				width={300}
				footer={null}
			>
				<OrdersEditForm
					onFinish={onEditFinish}
					loadingEditBtn={loadingEditBtn}
				/>
			</Modal> */}

			<Toaster position='top-right' reverseOrder={true} />
		</>
	);
};

export default ContractOrders;
