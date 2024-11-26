// addContract, добавление договора
import { post } from '@/helpers/api_helper';
import { successToast, errorToast } from '@/components';

const addContract = async (contract) => {
	try {
		const response = await post('/outstaff/contract/', contract);
		successToast('Договор успешно создан.');
		return response.id;
	} catch (error) {
		if (error?.response?.data?.contract_number) {
			errorToast('Договор с таким номером уже существует.');
		}

		errorToast('Произошла ошибка при создании договора.');
	}
};

export default addContract;
