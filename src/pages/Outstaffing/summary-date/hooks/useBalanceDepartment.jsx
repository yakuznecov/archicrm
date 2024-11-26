// логика загрузки баланса департамента
import { useEffect } from 'react';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useOutstaffCashierStore, useDepartmentsStore } from '@/storeZustand';

const useBalanceDepartment = () => {
	// Выбранный департамент
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	const [
		getOutstaffCashierByDepartment,
		outstaffCashierByDepartment,
		loadingBalance,
	] = useOutstaffCashierStore((state) => [
		state.getOutstaffCashierByDepartment,
		state.outstaffCashierByDepartment,
		state.loadingBalance,
	]);

	// загрузить баланс департамента
	useEffect(() => {
		if (selectedDepartment) {
			getOutstaffCashierByDepartment({ department_id: selectedDepartment });
		}
	}, []);

	return {
		getOutstaffCashierByDepartment,
		outstaffCashierByDepartment,
		loadingBalance,
	};
};

export default useBalanceDepartment;
