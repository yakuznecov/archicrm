import { create } from 'zustand';
import {
	getCompanyAddress,
	getCompanies,
	getOwnCompanies,
	getExternalCompanies,
	getCompanyById,
	addCompanyAddress,
	getCompanyAddressById,
	updateCompanyAddress,
	patchCompany,
} from '@/services';

// Компании аутстафф
export const useCompaniesStore = create((set) => ({
	companies: [],
	ownCompanies: [], // собственные компании
	externalCompanies: [], // внешние компании
	singleCompany: {},
	selectedCompany: null, // выбранная компания
	selectedCompanies: null, // выбранные компании в фильтрах договоров
	selectedTypeCompany: 'Внешняя',
	globalTypeCompany: 'Собственная', // тип компании на главной странице
	loading: false,
	getCompanies: async (company_type, department_id) => {
		set({ loading: true });
		const companies = await getCompanies(company_type, department_id);
		set({ companies, loading: false });
	},
	getOwnCompanies: async (department_id) => {
		set({ loading: true });
		const ownCompanies = await getOwnCompanies(department_id);
		set({ ownCompanies, loading: false });
	},
	getExternalCompanies: async (department_id) => {
		set({ loading: true });
		const externalCompanies = await getExternalCompanies(department_id);
		set({ externalCompanies, loading: false });
	},
	getCompanyById: async (id) => {
		const singleCompany = await getCompanyById(id);
		set({ singleCompany, selectedTypeCompany: singleCompany?.company_type });
	},
	patchCompany: async (companyData) => {
		await patchCompany(companyData);
	},
	setSelectedCompany: (company) => {
		set({ selectedCompany: company });
	},
	// установить тип компании глобально на главной в radio
	setGlobalTypeCompany: (type) => {
		set({ globalTypeCompany: type });
	},
	// установить тип компании в radio
	setSelectedTypeCompany: (type) => {
		set({ selectedTypeCompany: type });
	},
	// установить выбранные компании в фильтрах договоров
	setSelectedCompanies: (companies) => {
		set({ selectedCompanies: companies });
	},
}));

// Адреса компаний
export const useCompanyAddress = create((set) => ({
	companyAddress: [],
	selectedAddresses: [], // выбранные адреса в модальном окне создания компании
	singleCompanyAddress: {},
	loading: false,
	getCompanyAddress: async () => {
		set({ loading: true });
		const companyAddress = await getCompanyAddress();
		set({ companyAddress, loading: false });
	},
	addCompanyAddress: async (addressData) => {
		set({ loading: true });
		const companyAddress = await addCompanyAddress(addressData);
		set({ companyAddress, loading: false });
	},
	getCompanyAddressById: async (id) => {
		const singleCompanyAddress = await getCompanyAddressById(id);
		set({ singleCompanyAddress });
	},
	updateCompanyAddress: async (addressData) => {
		set({ loading: true });
		await updateCompanyAddress(addressData);
		set({ loading: false });
	},
	// установить выбранные адреса
	setSelectedAddresses: (addresses) => {
		set({ selectedAddresses: addresses });
	},
}));
