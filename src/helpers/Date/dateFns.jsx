import { parse, parseISO, format, isValid } from 'date-fns';

export const formatDateFns = (dateString) => {
	const dateObj = parseISO(dateString);
	const formattedDate = format(dateObj, "EEE MMM dd yyyy 00:00:00 'GMT'xxx (Москва, стандартное время)");
	return formattedDate;
}

// принимает дату в формате 12.10.2022 и возвращает 2022-10-12
export const convertToISO = (inputDate) => {
	if (!inputDate) {
		return null;
	}

	const parsedDate = parse(inputDate, 'dd.MM.yyyy', new Date());
	const formattedDate = format(parsedDate, 'yyyy-MM-dd');
	return formattedDate;
}
