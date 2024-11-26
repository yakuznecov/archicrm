// Договоры клиентов
import { create } from 'zustand';
import {
	getContracts,
	getContractById,
	addContract,
	updateContract,
	getTodayContracts,
} from '@/services';

export const useContractsStore = create((set) => ({
	activeKey: '1', // Активный таб в модальном окне создания договора
	contractsList: [],
	contractById: {}, // договор клиента
	contractId: null, // id договора
	contractClientId: null, // id клиента выбранного договора
	selectedCity: '', // выбранный город
	selectedManager: null, // выбранный менеджер
	selectedContrAgent: null, // выбранный контрагент
	filters: {}, // фильтры договоров
	disapprovedContractsCount: 0, // счетчик неодобренных договоров
	searchValue: '',
	isEdit: false, // режим редактирования договора
	loadingSingle: false,
	isContractsLkChecked: false, // договоры из личного кабинета
	getContracts: async (selectedCity) => {
		set({ loading: true });
		const contractsList = await getContracts(selectedCity);
		set({ contractsList, loading: false });
	},
	getTodayContracts: async (selectedCity) => {
		set({ loading: true });
		const contractsList = await getTodayContracts(selectedCity);
		set({ contractsList, loading: false });
	},
	// Получить договор по ID
	getContractById: async (id) => {
		set({ loadingSingle: true });
		const contractById = await getContractById(id);
		set({
			contractById,
			loadingSingle: false,
			contractClientId: contractById?.client?.id,
			contractId: contractById?.id,
			// установка менеджера при редактировании договора
			selectedManager: contractById?.manager,
			// установка контрагента при редактировании договора
			selectedContrAgent: contractById?.contr_agent?.id,
			isEdit: true,
		});
	},
	// Добавить договор и получить его id
	addContract: async (contractData) => {
		const contract = await addContract(contractData);
		set({ contractId: contract?.id });
	},
	// Обновить договор
	updateContract: async (data) => {
		await updateContract(data);
	},
	// Установить активный ключ таба в создании договора
	setActiveKey: (key) => set({ activeKey: key }),
	// Выбрать менеджера
	setSelectedManager: (manager) => set({ selectedManager: manager }),
	// Выбрать контрагента
	setSelectedContrAgent: (contrAgent) =>
		set({ selectedContrAgent: contrAgent }),
	// Обновить город
	updateCity: (city) => set({ selectedCity: city }),
	// Добавить фильтр
	addFilter: (filter) =>
		set((state) => ({ filters: { ...state.filters, ...filter } })),
	// Сбросить фильтры
	resetFilters: (filters) => set({ filters }),
	// Поиск значения в списке договоров
	setSearchValue: (value) => set({ searchValue: value }),
	// Добавить id договора клиента
	setContractId: (id) => set({ contractId: id }),
	// Очистить договор
	clearContract: () => set({ contractById: {} }),
	// Очистить id договора
	clearContractId: () => set({ contractId: null }),
	// очистить id клиента
	clearContractClientId: () => set({ contractClientId: null }),
	// установить id клиента
	setContractClientId: (id) => set({ contractClientId: id }),
	// установить режим редактирования
	setIsEdit: (isEdit) => set({ isEdit: isEdit }),
	// установить чекбокс договоров из личного кабинета
	setIsContractsLkChecked: (isContractsLk) =>
		set({ isContractsLkChecked: isContractsLk }),
	// Записать договоры
	setContracts: (contracts) => set({ contractsList: contracts }),
	// loading
	setLoading: (loading) => set({ loading }),
	// установить фильтры поиска договоров
	setSearchFilters: (filters) => set({ filters }),
	// установить счетчик неодобренных договоров
	setDisapprovedContractsCount: (count) =>
		set({ disapprovedContractsCount: count }),
}));
