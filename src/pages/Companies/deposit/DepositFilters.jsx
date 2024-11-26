import React from 'react';
import {
	PrimaryBtn,
	SecondaryBtn,
	DangerBtn,
	CommonSelect,
} from '@/components';

const DepositFilters = ({
	handleAddDeposit,
	handleContrAgentFilterChange,
	contrAgentsItems,
	applyFilters,
	resetFilters,
	selectedContrAgentFilter,
}) => {
	return (
		<div className='d-flex gap-2 mb-3'>
			<PrimaryBtn onClick={handleAddDeposit}>Добавить депозит</PrimaryBtn>
			<div style={{ width: '400px' }}>
				{/* Выбор контрагента */}
				<CommonSelect
					value={selectedContrAgentFilter}
					options={contrAgentsItems}
					onChange={handleContrAgentFilterChange}
					placeholder='Выбрать контрагента'
				/>
			</div>
			{/* <div style={{ width: '180px' }}>
				<SelectManager selectedManager={selectedManager} setSelectedManager={handleManagerChange} />
			</div> */}
			{/* <CustomRadio value={paymentType} onChange={handlePaymentTypeChange} options={paymentTypeOptions} /> */}
			{/* Кнопки применить и сбросить фильтры */}
			<SecondaryBtn onClick={applyFilters}>Применить</SecondaryBtn>
			<DangerBtn onClick={resetFilters}>Сбросить</DangerBtn>
		</div>
	);
};

export default DepositFilters;
