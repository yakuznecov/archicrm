// Выбор сотрудника аутстафф
import { useEffect, useState, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useOutStaff } from '@/storeZustand';

const useSelectedOutstaff = () => {
	// Все сотрудники
	const [outstaffList, getOutStaff] = useOutStaff(
		useShallow((state) => [state.outstaffList, state.getOutStaff])
	);

	// получить список доверенностей
	useEffect(() => {
		getOutStaff();
	}, []);

	// Список доверенностей для селекта
	const outstaffData = useMemo(() => {
		return outstaffList?.map(({ id, surname, name, second_name }) => ({
			value: id,
			label: `${surname} ${name} ${second_name}`,
		})) ?? [];
	}, [outstaffList]);

	return { outstaffData };
};

export default useSelectedOutstaff;