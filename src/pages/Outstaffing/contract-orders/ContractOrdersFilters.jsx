import { Input, Flex } from 'antd';
import {
	DangerBtn,
	PrimaryBtn,
	SecondaryBtn,
	CustomRadio,
	CommonSelect,
	UpdateBtn,
} from '@/components';
import { useStatusPaymentOrders } from '@/hooks';
import { useUpdateOrders } from './hooks/useUpdateOrders';

const ContractOrdersFilters = ({
	handleAddPayment,
	contrAgentsItems,
	applyFilters,
	resetFilters,
	handleManagerChange,
	handleContrAgentChange,
	handleContractNumberChange,
	contractNumber,
	selectedManager,
	selectedContrAgent,
	outstaffManagerList,
}) => {
	// Статус оплаты заказов
	const { statusPayment, paymentOptions, handleStatusPaymentChange } =
		useStatusPaymentOrders();

	// Обновление таблицы с заказами
	const { handleUpdateOrders } = useUpdateOrders();

	return (
		<Flex justify='space-between' className='mb-2'>
			<Flex gap={4}>
				<UpdateBtn onClick={handleUpdateOrders}>Обновить таблицу</UpdateBtn>
				<div style={{ minWidth: '180px' }}>
					{/* Выбор менеджера для фильтрации */}
					<CommonSelect
						value={selectedManager}
						options={outstaffManagerList}
						onChange={handleManagerChange}
						placeholder='Выбрать менеджера'
					/>
				</div>
				<div style={{ width: '490px' }}>
					{/* Выбор контрагента для фильтрации */}
					<CommonSelect
						value={selectedContrAgent}
						options={contrAgentsItems}
						onChange={handleContrAgentChange}
						placeholder='Выбрать контрагента'
					/>
				</div>
				<div style={{ width: '110px' }}>
					{/* Поле ввода номера договора для фильтрации */}
					<Input
						placeholder='№ договора'
						value={contractNumber}
						onChange={handleContractNumberChange}
					/>
				</div>
				<div>
					{/* Выбор оплачено или неоплачено */}
					<CustomRadio
						value={statusPayment}
						onChange={handleStatusPaymentChange}
						options={paymentOptions}
					/>
				</div>
			</Flex>
			<Flex gap={4}>
				{/* Кнопки применить и сбросить фильтры */}
				<SecondaryBtn onClick={applyFilters}>Применить</SecondaryBtn>
				<DangerBtn onClick={resetFilters}>Сбросить</DangerBtn>
				<PrimaryBtn onClick={handleAddPayment}>Добавить списание</PrimaryBtn>
			</Flex>
		</Flex>
	);
};

export default ContractOrdersFilters;
