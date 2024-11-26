// SKU товары
import { post, put } from '@/helpers/api_helper';
import { successToast, errorToast } from '@/components';

// Добавление sku
export const addSkuSales = async (data) => {
	try {
		const response = await post('/sku_sales/', data);
		successToast('SKU успешно добавлена.');
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при добавлении SKU.');
	}
};

// Обновление sku
export const updateSkuSales = async ({ skuDataUpdate, id }) => {
	try {
		const response = await put(`/sku_sales/${id}/`, skuDataUpdate);
		successToast('SKU успешно обновлена.');
		return response;
	} catch (error) {
		errorToast('Произошла ошибка при обновлении SKU.');
	}
}