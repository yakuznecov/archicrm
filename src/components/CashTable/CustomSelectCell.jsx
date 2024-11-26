import { DataFilter } from '@/containers';
import { updateCashierRequest } from '@/services';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useCashierStore, useUserStore } from '@/storeZustand';

const CustomSelectCell = ({ value }) => {
	// Загрузка данных текущего пользователя
	const [isSuperAdmin] = useUserStore(
		useShallow((state) => [state.isSuperAdmin])
	);
	const { filteredData } = DataFilter();

	// Данные кассира
	const [getCashier] = useCashierStore(
		useShallow((state) => [state.getCashier])
	);

	const { id, status, amount, type, staff, description, department } = value;

	const handleSelectChange = async (newValue) => {
		try {
			const changedCashier = {
				amount,
				status: newValue,
				type,
				description,
				staff: staff.id,
				department: department.id,
			};

			await updateCashierRequest({ id, changedCashier });
			await getCashier(filteredData);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='select-container'>
			<select
				style={{ width: '160px' }}
				onChange={(e) => handleSelectChange(e.target.value)}
				value={status}
			>
				{isSuperAdmin && <option>Одобрено</option>}
				{type === 2 && <option>В процессе</option>}
				<option>Отклонено</option>
			</select>
		</div>
	);
};

export default CustomSelectCell;
