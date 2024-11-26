// Логика загрузки заказов
import { useEffect, useState } from 'react';
import { Form } from 'antd';

import { errorToast } from '@/components';
import { useRowSelection, useToggle } from '@/hooks';
import { addContractOrderPayment } from '@/services';
import { formatIsoTimeToString } from '@/helpers/Date/formatDate';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useContractOrdersStore,
	useUserStore,
	useContrAgentBalanceStore,
	useDateRangeStore,
} from '@/storeZustand';

const useLoadContractOrders = () => {
	const [form] = Form.useForm();

	// модальное окно для создания оплаты
	const [modal, toggleModal] = useToggle(false);
	// модальное окно для редактирования заказа
	const [editModal, toggleEditModal] = useToggle(false);
	const [loadingBtn, setLoadingBtn] = useState(false);
	const [loadingEditBtn, setLoadingEditBtn] = useState(false);
	// id выбранного заказа при редактировании
	const [orderId, setOrderId] = useState(null);
	// тип оплаты
	const [paymentType, setPaymentType] = useState(1);

	// Диапазоны дат
	const [startDate, endDate] = useDateRangeStore(
		useShallow((state) => [state.startDate, state.endDate])
	);

	// Заказы
	const [
		contractOrdersList,
		getContractOrders,
		loading,
		addOrderFilter,
		orderFilters,
		// resetFilters
		getContractOrdersByDate,
	] = useContractOrdersStore(
		useShallow((state) => [
			state.contractOrdersList,
			state.getContractOrders,
			state.loading,
			state.addOrderFilter,
			state.orderFilters,
			// state.resetFilters
			state.getContractOrdersByDate,
		])
	);

	// Получить баланс выбранной компании заказчика
	const [companyBalance, clearBalance, setCompanyName, companyName] =
		useContrAgentBalanceStore(
			useShallow((state) => [
				state.companyBalance,
				state.clearBalance,
				state.setCompanyName,
				state.companyName,
			])
		);

	// Баланс депозита заказчика
	const totalDepositCompany = companyBalance?.balance;

	// Пользователь
	const [staffId] = useUserStore(useShallow((state) => [state.staffId]));

	useEffect(() => {
		const data = {
			start_date: startDate,
			end_date: endDate,
		};

		getContractOrdersByDate(data);
		clearBalance();
	}, [startDate, endDate]);

	// выбранные строки в таблице и общая сумма
	const { selectedRows, rowSelection, totalPaymentAmount, setSelectedRowKeys } =
		useRowSelection();

	const onFinish = async (values) => {
		setLoadingBtn(true);
		let remainingAmount = values.amount; // введенная сумма

		// цикл оплат
		for (const row of selectedRows) {
			const paymentData = {
				amount: row.amount,
				payment_type: paymentType, // тип оплаты нал или безнал
				date_of_payment: formatIsoTimeToString(new Date()),
				contract_order: row.id,
				creator: staffId,
			};

			if (remainingAmount > totalDepositCompany) {
				errorToast('Недостаточно средств на балансе компании');
				setLoadingBtn(false);
				return;
			}

			// если суммы полностью не хватает на оплату заказа, она начисляется частично
			if (row.amount <= remainingAmount) {
				await addContractOrderPayment(paymentData);
				remainingAmount -= row.amount;
			} else {
				paymentData.amount = Number(remainingAmount);
				await addContractOrderPayment(paymentData);
				break;
			}
		}

		setTimeout(() => {
			setSelectedRowKeys([]);
			setLoadingBtn(false);
			getContractOrders();
			toggleModal();
			form.resetFields();
		}, 1000);
	};

	// Изменение суммы созданного заказа
	// const onEditFinish = async (values) => {
	// 	setLoadingEditBtn(true);

	// 	const updatedOrder = {
	// 		amount: values.amount,
	// 		date_of_payment: formatIsoTimeToString(new Date()),
	// 	};

	// 	await updateContractOrder({ orderId, updatedOrder });

	// 	setTimeout(() => {
	// 		setLoadingEditBtn(false);
	// 		toggleEditModal();
	// 	}, 1000);
	// };

	// Информация о конкретном заказе клиента
	// const handleCellClick = (id) => {
	// 	setOrderId(id);
	// 	toggleEditModal();
	// };

	// Нал или безнал
	const handlePaymentTypeChange = (event) => {
		const value = event.target.value;
		setPaymentType(value);
	};

	// Добавить оплату
	const handleAddPayment = () => {
		setPaymentType(1);
		toggleModal();
	};

	return {
		form,
		contractOrdersList,
		getContractOrders,
		loading,
		addOrderFilter,
		orderFilters,
		clearBalance,
		companyName,
		companyBalance,
		setCompanyName,
		modal,
		rowSelection,
		totalPaymentAmount,
		toggleModal,
		loadingBtn,
		loadingEditBtn,
		paymentType,
		orderId,
		toggleEditModal,
		editModal,
		staffId,
		onFinish,
		setOrderId,
		setLoadingBtn,
		setPaymentType,
		handleAddPayment,
		setLoadingEditBtn,
		handlePaymentTypeChange,
	};
};

export default useLoadContractOrders;
