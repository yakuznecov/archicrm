import { useEffect, useMemo } from 'react';
import { getDepartmentId } from '@/helpers/localStorageUtils';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useDepartmentsStore, useUserStore } from '@/storeZustand';

const useSelectedDepartment = () => {
	const departmentId = getDepartmentId();

	// Загрузка данных текущего пользователя
	const [
		isSuperAdmin,
		isSuperAdminOut,
		isOstrovok,
		isCallCenter,
		getUser,
		isBuh,
		isPersonalkin,
		isAutstaffkin,
		isPersonalkinRF,
		isSuperUser,
	] = useUserStore(
		useShallow((state) => [
			state.isSuperAdmin,
			state.isSuperAdminOut,
			state.isOstrovok,
			state.isCallCenter,
			state.getUser,
			state.isBuh,
			state.isPersonalkin,
			state.isAutstaffkin,
			state.isPersonalkinRF,
			state.isSuperUser,
		])
	);

	// Загрузка департаментов
	const [
		departments,
		getDepartments,
		setSelectedDepartment,
		selectedDepartment,
	] = useDepartmentsStore((state) => [
		state.departments,
		state.getDepartments,
		state.setSelectedDepartment,
		state.selectedDepartment,
	]);

	// Основные департаменты медцентров
	const mainIds = [1, 3, 4, 6, 8, 15];

	const filteredDepartments = departments?.filter((item) =>
		mainIds.includes(item.id)
	);

	// Основные департаменты аутстаффа
	const mainIdsOutstaff = [7, 16, 19, 20];

	const filteredDepartmentsOutstaff = departments?.filter((item) =>
		mainIdsOutstaff.includes(item.id)
	);

	// Список городов для селекта медцентры
	const departmentsData = useMemo(() => {
		return (
			filteredDepartments?.map(({ id, name, city, address }) => ({
				value: id,
				label: `${name}, ${city}, ${address}`,
			})) ?? []
		);
	}, [filteredDepartments]);

	// Список городов только аутстафф
	const departmentsDataOutstaff = useMemo(() => {
		return (
			filteredDepartmentsOutstaff?.map(({ id, name, city, address }) => ({
				value: id,
				label: `${name}, ${city}, ${address}`,
			})) ?? []
		);
	}, [filteredDepartmentsOutstaff]);
	// console.log('departmentsDataOutstaff', departmentsDataOutstaff);

	// 2 департамента только для островка
	const filteredOstrovokDepartment = departmentsData.filter(
		(item) => item.value === 1 || item.value === departmentId
	);

	// Только персоналкин
	const filteredPersonalkin = departmentsDataOutstaff.filter(
		(item) => item.value === 16
	);

	// Только персоналкин РФ
	const filteredPersonalkinRF = departmentsDataOutstaff.filter(
		(item) => item.value === 19
	);

	// Только аутстаффкин
	const filteredAutstaffkin = departmentsDataOutstaff.filter(
		(item) => item.value === 7
	);

	// только департаменты outstaff
	const filteredOutstaffDepartment = departmentsDataOutstaff.filter(
		(item) => item.value === 16 || item.value === 7 || item.value === 19
	);

	// Отфильтрованный департамент для обычных сотрудников
	const filteredDepartment = departmentsData.filter(
		(item) => item.value === departmentId
	);

	// Разрешенные департаменты
	const authorizedDepartments = useMemo(() => {
		if (isSuperAdmin || isCallCenter) {
			// Администратору разрешено видеть все отделы
			return departmentsData;
		} else if (isOstrovok) {
			// Сотруднику Ostrovok разрешено видеть 2 отдела
			return filteredOstrovokDepartment;
		} else if (isSuperAdminOut || isBuh || isSuperUser) {
			// Админу аутстафф 2 отдела
			return filteredOutstaffDepartment;
		} else if (isPersonalkin) {
			// Для персоналкина Питер
			return filteredPersonalkin;
		} else if (isAutstaffkin) {
			// Для аутстаффкина Москва
			return filteredAutstaffkin;
		} else if (departmentId === 19) {
			// Для персоналкина РФ
			return filteredPersonalkinRF;
		} else {
			// Всем остальным показываем только его отдел
			return filteredDepartment;
		}
	}, [
		isSuperAdmin,
		isOstrovok,
		departmentsData,
		filteredOstrovokDepartment,
		filteredDepartment,
		isCallCenter,
		isSuperAdminOut,
	]);

	useEffect(() => {
		getUser(); // запрос данных пользователя
		getDepartments(); // Запрос всех департаментов
	}, []);

	useEffect(() => {
		let selectedDepartment;

		if (isSuperAdminOut || isBuh || isPersonalkin) {
			selectedDepartment = 16; // по умолчанию персоналкин
		} else if (isAutstaffkin) {
			selectedDepartment = 7; // по умолчанию аутстаффкин Москва
		} else if (isPersonalkinRF) {
			selectedDepartment = 19; // по умолчанию персоналкин РФ
		} else {
			selectedDepartment = departmentId;
		}

		setSelectedDepartment(selectedDepartment);
	}, [isSuperAdmin, isOstrovok, isSuperAdminOut]);

	// Изменение департамента в селекте
	const handleSelectedDepartment = (value) => {
		setSelectedDepartment(value);

		// Получаем текущее состояние из localStorage
		const userStore = JSON.parse(localStorage.getItem('user'));

		// Обновляем localStorage
		if (userStore) {
			// Обновляем только поле departmentId
			userStore.state.departmentId = value;

			// Сохраняем обновлённое состояние обратно в localStorage
			localStorage.setItem('user', JSON.stringify(userStore));
		}
	};

	return {
		authorizedDepartments,
		selectedDepartment,
		handleSelectedDepartment,
	};
};

export default useSelectedDepartment;
