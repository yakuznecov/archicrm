import { Select } from 'antd';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { usePenaltyBonusStore } from '@/storeZustand';

import { updatePenaltyBonusStatus } from '@/services';
import { DataFilter } from '@/containers';

const PenaltyStatusSelect = ({ text }) => {
	// Фильтр даты и выбор департамента
	const { filteredWorkingPeriod } = DataFilter();

	// Загрузка данных текущего пользователя
	// const [isSuperAdmin] = useUserStore(useShallow((state) => [state.isSuperAdmin]));

	// Данные о рабочем периоде
	// const [
	// 	getWorkingPeriod,
	// ] = useWorkingPeriodStore(useShallow((state) => [
	// 	state.getWorkingPeriod,
	// ]));

	// Получение бонусов сотрудников
	const [penaltyBonusList, getPenaltyBonuses] = usePenaltyBonusStore(
		useShallow((state) => [state.penaltyBonusList, state.getPenaltyBonuses])
	);

	// console.log('penaltyBonusList', penaltyBonusList);

	const filteredPenaltyBonus = penaltyBonusList?.filter((item) => {
		return item?.staff?.id === text?.staff?.id;
	});
	// console.log('filteredPenaltyBonus', filteredPenaltyBonus);
	const penaltyBonusById = filteredPenaltyBonus
		? filteredPenaltyBonus[0]?.id
		: '';
	// console.log('penaltyBonusById', penaltyBonusById);
	const statusData = filteredPenaltyBonus
		? filteredPenaltyBonus[0]?.status
		: '';
	// console.log('statusData', statusData);

	const handleSelectChange = async (newValue) => {
		try {
			const status = {
				status: newValue,
			};

			await updatePenaltyBonusStatus({ id: penaltyBonusById, status });
			// await getWorkingPeriod(filteredWorkingPeriod); // загрузить рабочие периоды
			await getPenaltyBonuses(filteredWorkingPeriod); // загрузить бонусы
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Select
			defaultValue='В процессе'
			style={{
				width: '100%',
			}}
			value={statusData}
			onChange={handleSelectChange}
			options={[
				{
					value: 'В процессе',
					label: 'В процессе',
				},
				{
					value: 'Одобрено',
					label: 'Одобрено',
				},
				{
					value: 'Отклонено',
					label: 'Отклонено',
				},
			]}
		/>
	);
};

export default PenaltyStatusSelect;
