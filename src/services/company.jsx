// Компании
import { get, post, put, patch } from '@/helpers/api_helper';
import { successToast, errorToast } from '@/components';

export const getCompanies = async (company_type = 'Собственная', department_id = 16) => {
	try {
		const response = await get(`/outstaff/company/?company_type=${company_type}&department_id=${department_id}`);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке компаний.');
	}
};

// Получение собственных компаний
export const getOwnCompanies = async (department_id) => {
	try {
		const response = await get(`/outstaff/company/?company_type=Собственная&department_id=${department_id}`);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке собственных компаний.');
	}
};

// Получение внешних компаний
export const getExternalCompanies = async (department_id) => {
	try {
		const response = await get(`/outstaff/company/?company_type=Внешняя&department_id=${department_id}`);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке внешних компаний.');
	}
};


export const getCompanyById = async (id) => {
	try {
		const response = await get(`/outstaff/company/${id}/`);
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке компании.');
	}
}

// Добавить компанию
export const addCompany = async (companyData) => {
	try {
		const response = await post('/outstaff/company/', companyData);
		successToast('Компания добавлена.');
		return response.id;
	} catch (error) {
		errorToast('Произошла ошибка при создании компании.');
	}
}

export const patchCompany = async ({ id, companyData }) => {
	try {
		await patch(`/outstaff/company/${id}/`, companyData);
		successToast('Компания обновлена.');
	} catch (error) {
		errorToast('Произошла ошибка при обновлении данных компании.');
	}
}

export const getCompanyAddress = async () => {
	try {
		const response = await get('/outstaff/company_address/');
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке адресов.');
	}
};

export const addCompanyAddress = async (addressData) => {
	try {
		const response = await post('/outstaff/company_address/', addressData);

		successToast('Адрес добавлен.');

		return response;
	} catch (error) {
		errorToast('Произошла ошибка при сохранении адреса.');
	}
};

export const getCompanyAddressById = async (id) => {
	try {
		const response = await get(`/outstaff/company_address/${id}`);

		return response;
	} catch (error) {
		errorToast('Произошла ошибка при получении адреса.');
	}
};

export const updateCompanyAddress = async ({ id, addressData }) => {
	try {
		await put(`/outstaff/company_address/${id}/`, addressData);

		successToast('Адрес обновлен.');

		return addressData;
	} catch (error) {
		errorToast('Произошла ошибка при обновлении адреса.');
	}
}
