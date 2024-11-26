import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { deleteContract } from '@/services';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useContractsStore } from '@/storeZustand';

const useDeleteContract = () => {
	const { confirm } = Modal;

	// Договоры клиента
	const [getTodayContracts, selectedCity] = useContractsStore(
		useShallow((state) => [state.getTodayContracts, state.selectedCity])
	);

	const showDeleteConfirm = (contractId, contractNumber) => {
		confirm({
			title: 'Вы уверены в удалении договора?',
			icon: <ExclamationCircleFilled />,
			content: (
				<div>
					Вы собираетесь удалить договор с номером{' '}
					<strong>#{contractNumber}</strong>. Убедитесь, что это правильный
					договор, прежде чем продолжить
				</div>
			),
			okText: 'Да',
			okType: 'danger',
			cancelText: 'Отмена',
			onOk() {
				deleteContract(contractId);
				getTodayContracts(selectedCity);
			},
			onCancel() {
				console.log('Cancel');
			},
		});
	};

	return {
		showDeleteConfirm,
	};
};

export default useDeleteContract;
