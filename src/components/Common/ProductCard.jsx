// ProductCard
import React, { useState, useEffect } from 'react';
import Counter from './Counter';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useBookingSalesStore, useSkuSalesStore } from '@/storeZustand';

const ProductCard = ({
	id,
	skuId,
	salesId,
	name,
	price,
	updateSelected,
	isSku,
	count = 1,
	oldSku,
	oldSales,
	onRemoveItem,
	setButtonProductClicked,
}) => {
	const [buttonClicked, setButtonClicked] = useState(false);
	const [quantity, setQuantity] = useState(count);
	// console.log('quantity', quantity);
	// console.log('isEdit inside ProductCard', isEdit);
	// console.log('oldSku inside ProductCard', oldSku);
	// console.log('oldSales inside ProductCard', oldSales);

	// update total amount
	useEffect(() => {
		updateSelected(id, price * count);
	}, [count]);

	// Доп. услуги добавление и обновление
	const [addBookingSales, updateBookingSales] = useBookingSalesStore(
		useShallow((state) => [state.addBookingSales, state.updateBookingSales])
	);

	// SKU
	const [addSkuSales, updateSkuSales] = useSkuSalesStore(
		useShallow((state) => [state.addSkuSales, state.updateSkuSales])
	);

	const handleRemoveClick = () => {
		onRemoveItem(id, isSku);
	};

	const handleIncrement = (e) => {
		e.preventDefault();
		setQuantity((prevQuantity) => prevQuantity + 1);
		updateSelected(id, price * (quantity + 1));
	};

	const handleDecrement = (e) => {
		e.preventDefault();
		if (quantity > 1) {
			setQuantity((prevQuantity) => prevQuantity - 1);
			updateSelected(id, price * (quantity - 1));
		}
	};

	const getTotalPrice = () => {
		return price * quantity;
	};

	// additional_sales
	const productDataCreate = {
		additional_count: quantity,
		additional_amount: price,
		additional_sales: id,
	};

	const productDataUpdate = {
		additional_count: quantity,
		additional_amount: price,
		additional_sales: salesId,
	};

	const skuDataUpdate = {
		sku_count: quantity,
		sku_amount: price,
		sku: skuId,
	};

	const skuDataCreate = {
		sku_count: quantity,
		sku_amount: price,
		sku: id,
	};

	const handleUpdate = (e) => {
		e.preventDefault();
		setButtonClicked(true);
		setButtonProductClicked(true); // for calc total price

		if (oldSku) {
			updateSkuSales({ skuDataUpdate, id });
		} else {
			updateBookingSales({ productDataUpdate, id });
		}
	};

	const handleAdd = (e) => {
		e.preventDefault();
		setButtonClicked(true);
		setButtonProductClicked(true); // for calc total price

		if (isSku) {
			addSkuSales(skuDataCreate); // добавление sku
		} else {
			addBookingSales(productDataCreate); // добавление доп. услуг
		}
	};

	return (
		<div className='archi__product_wrapper'>
			<h6 className='archi__product_name'>{name}</h6>
			<p className='archi__product_price'>Цена: {price}</p>

			{!buttonClicked && (
				<Counter
					count={quantity}
					onIncrement={handleIncrement}
					onDecrement={handleDecrement}
				/>
			)}

			<p className='archi__product_Totalprice'>₽: {getTotalPrice()} руб.</p>
			<div className='archi__product_btn_wrapper'>
				{!buttonClicked && (
					<div>
						{oldSku || oldSales ? (
							<button onClick={handleUpdate} className='archi__product_btn'>
								Обновить
							</button>
						) : (
							<button onClick={handleAdd} className='archi__product_btn'>
								Добавить
							</button>
						)}
					</div>
				)}

				{!buttonClicked && (
					<div className='archi__product_btn_box' onClick={handleRemoveClick}>
						<i className='uil-trash'></i>
					</div>
				)}
			</div>

			{buttonClicked && (
				<p className='archi__product_btn_text'>Данные добавлены</p>
			)}
		</div>
	);
};

export default ProductCard;
