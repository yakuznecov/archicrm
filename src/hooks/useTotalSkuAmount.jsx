import { useEffect, useState } from 'react';

const useTotalSkuAmount = (selectedSku, skuSalesIdsList, skuSalesList, buttonProductClicked, setButtonProductClicked, singleBooking) => {

	const [totalSkuAmount, setTotalSkuAmount] = useState(0);

	// total price sku
	useEffect(() => {
		if (selectedSku && selectedSku?.length === 0) {
			setTotalSkuAmount(0);
			return;
		}

		const totalPrice = selectedSku.reduce((sum, item) => {
			const total = parseFloat(item.totalAmount);
			return sum + total;
		}, 0);

		setTotalSkuAmount(totalPrice);
		setButtonProductClicked(false);
	}, [skuSalesList, skuSalesIdsList, buttonProductClicked, singleBooking, selectedSku]);

	return {
		totalSkuAmount,
		setTotalSkuAmount
	};
};

export default useTotalSkuAmount;
