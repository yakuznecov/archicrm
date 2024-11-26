// формы для премий
import { CommonTable } from '@/components';
import { useLoadBonus } from '../hooks/useLoadBonus';
import BonusPenaltyAddForm from './BonusPenaltyAddForm';

const BonusForms = () => {
	const { onFinish, columns, loading, filteredByBonus, userInfo } =
		useLoadBonus();

	return (
		<>
			<BonusPenaltyAddForm
				onFinish={onFinish}
				btnText='Добавить премию'
				userInfo={userInfo}
			/>

			{/* Таблица премий сотрудника */}
			<CommonTable columns={columns} data={filteredByBonus} loading={loading} />
		</>
	);
};

export default BonusForms;
