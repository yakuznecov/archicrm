// логика загрузки выдачи зарплаты
import { useState } from 'react';
import { postSalaryPayment } from '@/services';
import { useToggle } from '@/hooks';
import { getToday } from '@/helpers/Date/dayjs';

export function useLoadSalaryPaid(isSuperUser, setUserInfo) {
	// модальное окно обновления выдачи зарплаты
	const [modalSalaryPaid, toggleModalSalaryPaid] = useToggle(false);

	// id сотрудника при нажатии на ячейку таблицы
	const [staffId, setStaffId] = useState(null);

	// функция добавления выплаты зарплаты
	const onFinishPaid = async (values) => {
		const dataPaid = {
			amount: values.amount,
			description: values.description,
			date_of_payment: getToday(),
			staff: staffId,
		};

		await postSalaryPayment(dataPaid);
		toggleModalSalaryPaid();
	};

	// клик по ячейке Оплачено
	const handlePaidClick = (record) => {
		if (!isSuperUser) {
			errorToast('Доступ только для админов');
			return;
		}

		const { id, surname, name } = record;
		const staffName = `${name} ${surname}`;
		setUserInfo(staffName);

		setStaffId(id);
		toggleModalSalaryPaid();
	};

	return {
		modalSalaryPaid,
		onFinishPaid,
		handlePaidClick,
		toggleModalSalaryPaid,
	};
}
