import { useEffect, useMemo, useState } from 'react';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useDepartmentsStore,
	useSkuSalesStore,
	useStoreGoods,
} from '@/storeZustand';

const useSelectedSku = () => {
	const [selectedSku, setSelectedSku] = useState([]);
	// console.log('selectedSku >>>>>', selectedSku);

	// Склад товаров
	const [getStoreGoods, storeGoodsList] = useStoreGoods(
		useShallow((state) => [state.getStoreGoods, state.storeGoodsList])
	);

	// Выбранный департамент
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	// SKU
	const [clearSkuSales] = useSkuSalesStore(
		useShallow((state) => [state.clearSkuSales])
	);

	useEffect(() => {
		getStoreGoods();
	}, [selectedDepartment]);

	// Список sku для селекта в модальном окне
	const skuData = useMemo(() => {
		return (
			storeGoodsList?.map(({ id, sku_name, sku_size, sku_price }) => ({
				id,
				price: sku_price,
				value: id,
				size: 1,
				nameId: sku_name && sku_name?.id,
				isSku: true,
				label: `${sku_name && sku_name?.name} : ${
					sku_size?.size || ''
				} - ${sku_price}`,
				totalAmount: sku_price,
			})) ?? []
		);
	}, [storeGoodsList]);

	const handleSelectedSku = (value) => {
		setSelectedSku(value);
	};

	// если пустой массив выбранных sku, то очистить sku_sales
	useEffect(() => {
		if (selectedSku && selectedSku?.length === 0) {
			clearSkuSales();
		}
	}, [selectedSku]);

	// set selectedSku when editing single booking
	const setSelectedSkuValue = (data) => {
		const editSku = data?.map(({ id, sku, sku_count, sku_amount }) => ({
			id,
			skuId: sku?.id,
			price: sku?.sku_price,
			value: id,
			size: 1,
			nameId: sku?.sku_name?.id,
			isSku: true,
			count: sku_count,
			oldSku: true,
			label: `${sku?.sku_name?.name} : ${sku?.sku_size?.size || ''}`,
			totalAmount: sku_amount,
		}));

		setSelectedSku(editSku);
	};

	// Обновление выбранных sku
	const updateSelectedSku = (id, newTotalAmount) => {
		setSelectedSku((prevSelectedSku) =>
			prevSelectedSku?.map((item) =>
				item.id === id ? { ...item, totalAmount: newTotalAmount } : item
			)
		);
	};

	return {
		skuData,
		selectedSku,
		setSelectedSku,
		handleSelectedSku,
		setSelectedSkuValue,
		updateSelectedSku,
	};
};

export default useSelectedSku;
