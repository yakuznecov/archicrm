// Склад
import { get, post, put } from '@/helpers/api_helper';
import { successToast, errorToast } from '@/components';

// Start: Размеры товара
export const getSizeGoods = async () => {
	try {
		const response = await get("/size/");

		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке данных.');
	}
};

export const addSizeGood = async (changedSizeGood) => {
	try {
		const response = await post('/size/', changedSizeGood);

		successToast('Размер товара добавлен.');

		return response;
	} catch (error) {
		errorToast('Произошла ошибка при добавлении размера.');
	}
};

export const updateSizeGood = async ({ id, changedSizeGood }) => {
	try {
		await put(`/size/${id}/`, changedSizeGood);

		successToast('Размер товара обновлен.');

	} catch (error) {
		errorToast('Произошла ошибка при обновлении размера товара.');
	}
}
// End: Размеры товара

// Start: Материал товара
export const getMaterialsGoods = async () => {
	try {
		const response = await get("/material/");

		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке материала товара.');
	}
};

export const addMaterialGood = async (changedMaterialGood) => {
	try {
		const response = await post('/material/', changedMaterialGood);

		successToast('Материал товара добавлен.');

		return response;
	} catch (error) {
		errorToast('Произошла ошибка при добавлении материала.');
	}
};

export const updateMaterialGood = async ({ id, changedMaterialGood }) => {
	try {
		await put(`/material/${id}/`, changedMaterialGood);

		successToast('Материал товара обновлен.');
	} catch (error) {
		errorToast('Произошла ошибка при обновлении материала товара.');
	}
}
// End: Материал товара

// Start: Категория товара
export const getCategoriesGoods = async () => {
	try {
		const response = await get("/category/");
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке категорий.');
	}
};

export const addCategoryGood = async (categoryGood) => {
	try {
		const response = await post("/category/", categoryGood);

		successToast('Категория товара добавлена.');
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при добавлении категории.');
	}
};

export const updateCategoryGood = async ({ id, changedCategoryGood }) => {
	try {
		await put(`/category/${id}/`, changedCategoryGood);

		successToast('Категория товара обновлена.');
	} catch (error) {
		errorToast('Произошла ошибка при обновлении категории.');
	}
}

// End: Категория товара

// Start: Наименование товара
export const getNamesGoods = async () => {
	try {
		const response = await get("/sku_name/");
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке наименований.');
	}
};

export const addNamesGoods = async (nameGood) => {
	try {
		const response = await post("/sku_name/", nameGood);

		successToast('Наименование товара добавлено.');
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при добавлении наименований.');
	}
};

export const updateNamesGoods = async ({ id, changedNameGood }) => {
	try {
		await put(`/sku_name/${id}/`, changedNameGood);

		successToast('Наименование товара обновлено.');
	} catch (error) {
		errorToast('Произошла ошибка при обновлении наименований.');
	}
}
// End: Наименование товара

// Start: Товары склада sku
export const getStoreGoods = async () => {
	try {
		const response = await get("/sku/");
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при загрузке SKU.');
	}
};

// Добавить sku
export const addStoreGood = async (storeGood) => {
	try {
		const response = await post("/sku_create_update/", storeGood);
		successToast('Товар добавлен.');
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при добавлении товара.');
	}
};

export const updateStoreGood = async ({ id, changedStoreGood }) => {
	try {
		await put(`/sku_create_update/${id}/`, changedStoreGood);
		successToast('Товар обновлен.');
	} catch (error) {
		errorToast('Произошла ошибка при обновлении товара.');
	}
}

// End: Товары склада
