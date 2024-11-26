import { useEffect, useMemo, useState } from 'react';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useDepartmentsStore,
	useAdditionalSalesStore,
	useUserStore,
} from '@/storeZustand';

const useSelectedAdditionalSales = () => {
	const [selectedAdditionalSales, setSelectedAdditionalSales] = useState([]);
	// console.log('selectedAdditionalSales', selectedAdditionalSales);

	// Загрузка данных текущего пользователя
	const [isPersonalkin, isAutstaffkin, isSuperAdminOut] = useUserStore(
		useShallow((state) => [
			state.isPersonalkin,
			state.isAutstaffkin,
			state.isSuperAdminOut,
		])
	);

	// Выбранный департамент
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	// Additional sales
	const [getAdditionalSales, additionalSalesList] = useAdditionalSalesStore(
		useShallow((state) => [state.getAdditionalSales, state.additionalSalesList])
	);

	useEffect(() => {
		if (!isPersonalkin && !isAutstaffkin) {
			getAdditionalSales();
		}
	}, [selectedDepartment]);

	// Список additional sales для селекта в модальном окне
	const additionalSalesData = useMemo(() => {
		return (
			additionalSalesList?.map(({ id, name, service_price }) => ({
				id,
				price: service_price,
				value: id,
				size: 1,
				label: name,
				totalAmount: service_price,
			})) ?? []
		);
	}, [additionalSalesList]);

	const handleSelectedAdditionalSales = (value) => {
		setSelectedAdditionalSales(value);
	};

	// set selectedAditionalSales when editing single booking
	const setSelectedAdditionalSalesValue = (data) => {
		const editAdditionalSale = data?.map(
			({ id, additional_sales, additional_amount, additional_count }) => ({
				id,
				salesId: additional_sales?.id,
				price: additional_sales?.service_price,
				value: id,
				size: 1,
				oldSales: true,
				count: additional_count,
				label: additional_sales?.name,
				totalAmount: additional_amount,
			})
		);

		setSelectedAdditionalSales(editAdditionalSale);
	};

	return {
		additionalSalesData,
		selectedAdditionalSales,
		handleSelectedAdditionalSales,
		setSelectedAdditionalSales,
		setSelectedAdditionalSalesValue,
	};
};

export default useSelectedAdditionalSales;
