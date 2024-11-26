// Оплата заказов
import { Table, Input } from 'antd';
import Loader from '@/components/Common/Loader';

import { useOrderPaymentsColumns, useLoadContrAgents } from '@/hooks';
import useOrderPaymentsFilters from './hooks/useOrderPaymentsFilters';
import {
	DangerBtn,
	SecondaryBtn,
	CommonSelect,
	CustomRadio,
} from '@/components';

const ContractOrderPayments = () => {
	const { Search } = Input;

	// колонки в таблице оплат заказов
	const columns = useOrderPaymentsColumns();

	// Загрузка списка контрагентов
	const { contrAgentsItems } = useLoadContrAgents();

	const {
		loading,
		paymentType,
		resetFilters,
		contractOrderId,
		selectedContrAgent,
		paymentTypeOptions,
		filteredSearchData,
		onSearch,
		applyFilters,
		handleContrAgentChange,
		handlePaymentTypeChange,
		handleContractOrderIdChange,
	} = useOrderPaymentsFilters();

	return (
		<>
			<div className='d-flex gap-1 mb-2'>
				<Search
					placeholder='Поиск в таблице'
					allowClear
					onSearch={onSearch}
					style={{
						width: 220,
					}}
					enterButton
				/>
				{/* Поле ввода id заказа для фильтрации */}
				<Input
					type='number'
					value={contractOrderId}
					placeholder='ID заказа'
					onChange={handleContractOrderIdChange}
					style={{ width: 85 }}
				/>
				<div style={{ width: 400 }}>
					{/* Выбор контрагента */}
					<CommonSelect
						value={selectedContrAgent}
						options={contrAgentsItems}
						onChange={handleContrAgentChange}
						placeholder='Выбрать контрагента'
					/>
				</div>
				{/* Нал или безнал */}
				<CustomRadio
					value={paymentType}
					onChange={handlePaymentTypeChange}
					options={paymentTypeOptions}
				/>
				<SecondaryBtn onClick={applyFilters}>Применить</SecondaryBtn>
				<DangerBtn onClick={resetFilters}>Сбросить</DangerBtn>
			</div>

			{loading && <Loader />}
			{!loading && filteredSearchData && filteredSearchData?.length > 0 && (
				<Table
					columns={columns}
					dataSource={filteredSearchData}
					pagination={false}
					size='small'
					rowKey='id'
				/>
			)}
		</>
	);
};

export default ContractOrderPayments;
