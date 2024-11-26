// get month from month number

export const getMonthName = (monthNumber) => {
	const monthNames = [
		'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
		'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
	];

	return monthNames[monthNumber - 1];
}

// get current month
export const getCurrentMonth = () => {
	const currentDate = new Date();
	return currentDate.getMonth() + 1;
};