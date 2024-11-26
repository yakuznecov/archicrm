import dayjs from 'dayjs';

export const formatPointDate = (date) => {
	if (!date) {
		return null;
	}

	return dayjs(date).format('DD.MM.YYYY');
};

export const getSevenDaysAgo = () => {
	return dayjs().subtract(14, 'days').format('YYYY-MM-DD');
};

// return today format date
export const getToday = () => {
	return dayjs().format('YYYY-MM-DD');
};

export const getTodayWithTime = () => {
	return dayjs().format('YYYY-MM-DDTHH:mm');
};
