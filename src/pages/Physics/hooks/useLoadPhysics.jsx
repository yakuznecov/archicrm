// загрузка физиков
import { useEffect, useState } from 'react';
import { useToggle } from '@/hooks';
import usePhysicFields from './usePhysicFields';
import usePhysicsColumns from './usePhysicsColumns';
import { addPhysic } from '@/services';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useContrAgentsStore, usePhysicsStore } from '@/storeZustand';

const useLoadPhysics = () => {
	const [modal, toggleModal] = useToggle(false);
	const [isEdit, setIsEdit] = useState(false); // режим редактирования
	const [loadingBtn, setLoadingBtn] = useState(false); // кнопка загрузки

	// Физики
	const [
		physicsList,
		getPhysics,
		updatePhysic,
		loading,
		selectedPhysic,
		setSelectedPhysic,
	] = usePhysicsStore(
		useShallow((state) => [
			state.physicsList,
			state.getPhysics,
			state.updatePhysic,
			state.loading,
			state.selectedPhysic,
			state.setSelectedPhysic,
		])
	);

	// Контрагенты, добавление после создания физика
	const [addContrAgent] = useContrAgentsStore(
		useShallow((state) => [state.addContrAgent])
	);

	useEffect(() => {
		getPhysics();
	}, []);

	const onFinish = async (values) => {
		setLoadingBtn(true);

		const data = {
			last_name: values.last_name,
			first_name: values.first_name,
			second_name: values.second_name || null,
			dob: values.dob,
			phone: values.phone || null,
			// birth_place: values.birth_place || null,
			// citizen: values.citizen || null,
			// passport_serial: values.passport_serial || null,
			// passport_number: values.passport_number || null,
			// passport_place_created: values.passport_place_created || null,
			// passport_place_created_date: values.passport_place_created_date || null,
			// passport_address: values.passport_address || null,
			// bank_account: values.bank_account || null,
			description: values.description || null,
		};

		if (isEdit) {
			await updatePhysic({ id: selectedPhysic?.id, data });
		} else {
			const newPhysicId = await addPhysic(data);

			if (newPhysicId) {
				const data = {
					type: 'Физик',
					physic: newPhysicId,
				};

				await addContrAgent(data);
			}
		}

		setTimeout(() => {
			setLoadingBtn(false);
			getPhysics();
			toggleModal();
			setIsEdit(false);
		}, 1500);
	};

	// клик по физику для обновления
	const handlePhysicClick = (physic) => {
		setSelectedPhysic(physic);
		setIsEdit(true);
		toggleModal();
	};

	// колонки в таблице физиков
	const columns = usePhysicsColumns(handlePhysicClick);
	// Поля при редактировании заполнение
	const fields = usePhysicFields(selectedPhysic);

	// Добавить физика
	const handleAddPhysic = () => {
		toggleModal();
	};

	return {
		modal,
		toggleModal,
		isEdit,
		setIsEdit,
		loading,
		loadingBtn,
		onFinish,
		handleAddPhysic,
		physicsList,
		columns,
		fields,
	};
};

export default useLoadPhysics;
