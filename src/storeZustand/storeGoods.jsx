// Склад
import { create } from 'zustand';
import { getSizeGoods, addSizeGood, updateSizeGood, getMaterialsGoods, addMaterialGood, updateMaterialGood, getCategoriesGoods, addCategoryGood, updateCategoryGood, getNamesGoods, addNamesGoods, updateNamesGoods, getStoreGoods, updateStoreGood, addStoreGood } from '@/services';

// Склад товаров
export const useStoreGoods = create((set) => ({
	storeGoodsList: [],
	loading: false,
	getStoreGoods: async () => {
		set({ loading: true });
		const storeGoodsList = await getStoreGoods();
		set({ storeGoodsList, loading: false });
	},
	updateStoreGood: async ({ id, changedStoreGood }) => {
		await updateStoreGood({ id, changedStoreGood });
	},
	addStoreGood: async (storeGood) => {
		await addStoreGood(storeGood);
	}
}))

// Размеры товара
export const useSizeGoodsStore = create((set) => ({
	sizeGoods: [],
	loading: false,
	getSizeGoods: async () => {
		set({ loading: true });
		const sizeGoods = await getSizeGoods();
		set({ sizeGoods, loading: false });
	},
	addSizeGood: async (changedSizeGood) => {
		await addSizeGood(changedSizeGood);
	},
	updateSizeGood: async ({ id, changedSizeGood }) => {
		await updateSizeGood({ id, changedSizeGood });
	}
}))

// Материал товара
export const useMaterialGoodsStore = create((set) => ({
	materialsGoods: [],
	loading: false,
	getMaterialsGoods: async () => {
		set({ loading: true });
		const materialsGoods = await getMaterialsGoods();
		set({ materialsGoods, loading: false });
	},
	addMaterialGood: async (changedMaterialGood) => {
		await addMaterialGood(changedMaterialGood);
	},
	updateMaterialGood: async ({ id, changedMaterialGood }) => {
		await updateMaterialGood({ id, changedMaterialGood });
	}
}))

// Категория товара
export const useCategoryGoodsStore = create((set) => ({
	categoriesGoods: [],
	loading: false,
	getCategoriesGoods: async () => {
		set({ loading: true });
		const categoriesGoods = await getCategoriesGoods();
		set({ categoriesGoods, loading: false });
	},
	addCategoryGood: async (categoryGood) => {
		await addCategoryGood(categoryGood);
	},
	updateCategoryGood: async ({ id, changedCategoryGood }) => {
		await updateCategoryGood({ id, changedCategoryGood });
	}
}))

// Наименование товара
export const useNamesGoodsStore = create((set) => ({
	namesGoods: [],
	loading: false,
	getNamesGoods: async () => {
		set({ loading: true });
		const namesGoods = await getNamesGoods();
		set({ namesGoods, loading: false });
	},
	addNamesGoods: async (namesGoods) => {
		await addNamesGoods(namesGoods);
	},
	updateNamesGoods: async ({ id, changedNameGood }) => {
		await updateNamesGoods({ id, changedNameGood });
	}
}))
