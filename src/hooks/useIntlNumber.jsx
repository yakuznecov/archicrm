// Intl number format

const useIntlNumber = (number) => {
	return Intl.NumberFormat('ru-RU', { style: 'decimal' }).format(number);
}

export default useIntlNumber;