// Принимает дату в формате 1975-12-26T00:00:00+03:00 и возвращает 28.10.2022
export const formatDate = (dateString) => {
	if (!dateString) {
		return null;
	}
	const date = new Date(dateString);
	const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
	return date.toLocaleDateString('ru-RU', options);
};

export const convertDate = (dateStr) => {
	return dateStr + 'T00:00:00.000Z';
};

// принимает дату в формате 1975-12-26T00:00:00+03:00 и возвращает 1975-12-26
export const convertModalDate = (dateStr) => {
	return dateStr.split('T')[0] || '';
};

export const getFirstDayOfMonth = () => {
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const month = String(currentDate.getMonth() + 1).padStart(2, '0');
	const day = '01';
	const formattedDate = `${year}-${month}-${day}`;
	return formattedDate;
};

// 2023-09-07T21:00:00.000Z принимает
export const formatDateString = (dateString) => {
	const date = new Date(dateString);
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const formattedDate = `${day}/${month}`;
	return formattedDate;
};

// из даты Thu Jun 29 2023 09:00:00 GMT+0300 выводит дату в формате 2023-06-29
export const formatIsoTimeToString = (dateString) => {
	if (!dateString) {
		return null;
	}

	const originalDate = new Date(dateString);
	const year = originalDate.getFullYear();
	const month = String(originalDate.getMonth() + 1).padStart(2, '0');
	const day = String(originalDate.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
};

// текущая дата
export const getCurrentDate = () => {
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
	const day = currentDate.getDate().toString().padStart(2, '0');
	return `${year}-${month}-${day}`;
};

// последняя дата текущего месяца
export const getLastDayOfMonth = () => {
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();

	const lastDay = new Date(year, month + 1, 0).getDate();

	const formattedLastDay = `${year}-${(month + 1)
		.toString()
		.padStart(2, '0')}-${lastDay.toString().padStart(2, '0')}`;

	return formattedLastDay;
};

// принимает дату в формате 1975-12-26T00:00:00+03:00
export const formatDateTime = (inputDateTime) => {
	if (!inputDateTime) {
		return null;
	}

	const dateTimeObject = new Date(inputDateTime);

	// Форматируем дату
	const formattedDate = dateTimeObject.toLocaleDateString('ru-RU', {
		year: '2-digit',
		month: '2-digit',
		day: '2-digit',
	});

	// Форматируем время
	const formattedTime = dateTimeObject.toLocaleTimeString('ru-RU', {
		hour: '2-digit',
		minute: '2-digit',
	});

	return formattedDate + ' - ' + formattedTime;
};

// принимает дату и время в виде 2023-07-06T10:00:00+03:00, а возвращает время 10:00
export const getTimeFromDate = (dateString) => {
	const date = new Date(dateString);
	const hours = date.getHours();
	const minutes = date.getMinutes();

	// Добавляем ведущий ноль к минутам, если значение < 10
	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

	return `${hours}:${formattedMinutes}`;
};

// принимает "1975-12-26T00:00:00+03:00" и добавляет 1 день Выводит "1975-12-27T00:00:00.000Z"
export const addOneDayToDate = (dateString) => {
	const initialDate = new Date(dateString);
	const nextDayDate = new Date(initialDate);
	nextDayDate.setDate(initialDate.getDate() + 1);
	const nextDayDateString = nextDayDate.toISOString();
	return nextDayDateString;
};

// const inputDate = "Thu Jul 20 2023 18:00:00 GMT+0300 (Москва, стандартное время)";
// const formattedDate = "2023-07-20T18:00:00";
export const formatDateToIso = (dateString) => {
	if (isNaN(Date.parse(dateString))) {
		// Обработка невалидного значения dateString
		return null;
	}

	const date = new Date(dateString);
	// Add 3 hours to the date
	date.setHours(date.getHours() + 3);

	const formattedDate = date.toISOString().slice(0, 19);
	return formattedDate;
};
