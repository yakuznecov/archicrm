// логика загрузки бонусов
import { useEffect, useState } from 'react';
import { Form } from 'antd';
import { getToday } from '@/helpers/Date/dayjs';
import useBonusPenaltyColumns from './useBonusPenaltyColumns';
import useBonusPenaltyFields from './useBonusPenaltyFields';
import useDeleteBonusPenalty from './useDeleteBonusPenalty';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { usePenaltyBonusStore, useSalaryStore } from '@/storeZustand';

export const useLoadBonus = () => {
	const [form] = Form.useForm();
	const { showDeleteConfirm } = useDeleteBonusPenalty();
	const [filteredByBonus, setFilteredByBonus] = useState([]);
	const [filteredByPenalty, setFilteredByPenalty] = useState([]);

	// Загрузка зарплат
	const [toggleBonusModal, togglePenaltyModal, userInfo] = useSalaryStore(
		useShallow((state) => [
			state.toggleBonusModal,
			state.togglePenaltyModal,
			state.userInfo,
		])
	);

	// Получение бонусов сотрудников
	const [
		staffId,
		penaltyBonusByStaffId,
		loading,
		addPenaltyBonus,
		isPenalty,
		getPenaltyBonusByStaffId,
		getPenaltyBonusById,
		penaltyBonusById,
		patchPenaltyBonus,
	] = usePenaltyBonusStore((state) => [
		state.staffId,
		state.penaltyBonusByStaffId,
		state.loading,
		state.addPenaltyBonus,
		state.isPenalty, // открыто ли окно штрафов
		state.getPenaltyBonusByStaffId,
		state.getPenaltyBonusById,
		state.penaltyBonusById,
		state.patchPenaltyBonus,
	]);

	useEffect(() => {
		if (penaltyBonusByStaffId && penaltyBonusByStaffId.length > 0) {
			const filteredBonus = penaltyBonusByStaffId?.filter(
				(item) => +item.amount > 0
			);

			const filteredPenalty = penaltyBonusByStaffId?.filter(
				(item) => +item.amount < 0
			);

			setFilteredByBonus(filteredBonus);
			setFilteredByPenalty(filteredPenalty);
		} else {
			setFilteredByBonus([]);
			setFilteredByPenalty([]);
		}
	}, [penaltyBonusByStaffId]);

	const onFinish = async (values) => {
		// Если открыто окно штрафов, то делаем сумму с минусом
		const finalAmount = isPenalty ? values.amount * -1 : values.amount;

		// данные для добавления бонуса
		const dataBonus = {
			amount: finalAmount,
			staff: staffId,
			date_of_payment: getToday(),
			description: values.description,
			status: 'Одобрено',
		};

		await addPenaltyBonus(dataBonus); // Добавить бонус

		if (isPenalty) {
			togglePenaltyModal();
		} else {
			toggleBonusModal();
		}
	};

	// параметры для календаря в модальном окне бонусов и штрафов
	let month = getToday().split('-')[1];
	let year = getToday().split('-')[0];

	// обновление бонуса при редактировании
	const onFinishEdit = async (values) => {
		const data = {
			amount: values.amount,
			description: values.description,
			date_of_payment: values.date_of_payment,
		};

		await patchPenaltyBonus({ id: penaltyBonusById.id, data });
		form.resetFields(); // очистка формы
		await getPenaltyBonusByStaffId(staffId, month, year);
	};

	// выбор месяца в модальном окне бонусов и штрафов
	const onChangeMonth = (_, dateString) => {
		month = dateString.split('-')[0];
		year = dateString.split('-')[1];

		getPenaltyBonusByStaffId(staffId, month, year);
	};

	// удаление бонуса или штрафа
	const handleCellClick = async (id, amount) => {
		showDeleteConfirm(id, staffId, month, year, amount);
	};

	const columns = useBonusPenaltyColumns(handleCellClick);
	const fields = useBonusPenaltyFields(penaltyBonusById);

	return {
		form,
		onFinish,
		columns,
		loading,
		filteredByBonus,
		filteredByPenalty,
		userInfo,
		onFinishEdit,
		onChangeMonth,
		year,
		month,
		fields,
	};
};
