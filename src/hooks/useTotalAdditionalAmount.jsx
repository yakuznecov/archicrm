import { useEffect, useState } from 'react';

const useTotalAdditionalAmount = (bookingSalesList, bookingSalesIdsList, selectedAdditionalSales, buttonProductClicked, setButtonProductClicked, singleBooking) => {
	const [totalAdditionalAmount, setTotalAdditionalAmount] = useState(0);

	// total price booking Additional Sales
	useEffect(() => {
		if (selectedAdditionalSales && selectedAdditionalSales?.length === 0) {
			setTotalAdditionalAmount(0);
			return;
		}

		const totalPrice = selectedAdditionalSales && selectedAdditionalSales.reduce((sum, item) => {
			const total = parseFloat(item.totalAmount);
			return sum + total;
		}, 0);

		setTotalAdditionalAmount(totalPrice);
		setButtonProductClicked(false);

	}, [bookingSalesList, bookingSalesIdsList, buttonProductClicked, singleBooking, selectedAdditionalSales]);


	return {
		totalAdditionalAmount,
		setTotalAdditionalAmount
	};
};

export default useTotalAdditionalAmount;
