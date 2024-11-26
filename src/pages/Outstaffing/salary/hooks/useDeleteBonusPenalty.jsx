// модалка удаления бонусов и штрафов
import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { deletePenaltyBonus } from '@/services';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { usePenaltyBonusStore } from '@/storeZustand';

export default function useDeleteBonusPenalty() {
	const { confirm } = Modal;

	// Договоры клиента
	const [getPenaltyBonusByStaffId] = usePenaltyBonusStore(
		useShallow((state) => [state.getPenaltyBonusByStaffId])
	);

	const showDeleteConfirm = (id, staffId, month, year, amount) => {
		confirm({
			title: 'Вы уверены в удалении данных?',
			icon: <ExclamationCircleFilled />,
			content: (
				<div>
					Вы собираетесь удалить сумму <strong>{amount}</strong> руб. Данную
					операцию нельзя будет отменить!
				</div>
			),
			okText: 'Да',
			okType: 'danger',
			cancelText: 'Отмена',
			onOk() {
				deletePenaltyBonus(id);
				getPenaltyBonusByStaffId(staffId, month, year);
			},
			onCancel() {
				console.log('Cancel');
			},
		});
	};

	return {
		showDeleteConfirm,
	};
}
