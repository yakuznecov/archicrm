// формы для штрафов
import { CommonTable } from '@/components';
import { useLoadBonus } from '../hooks/useLoadBonus';
import BonusPenaltyAddForm from './BonusPenaltyAddForm';

const PenaltyForms = () => {
	const { form, onFinish, columns, loading, filteredByPenalty, userInfo } =
		useLoadBonus();

	return (
		<>
			<BonusPenaltyAddForm
				form={form}
				onFinish={onFinish}
				btnText='Добавить штраф'
				userInfo={userInfo}
			/>

			{/* Таблица штрафов сотрудника */}
			<CommonTable
				columns={columns}
				data={filteredByPenalty}
				loading={loading}
			/>
		</>
	);
};

export default PenaltyForms;
