// общий фильтр для селектов с поиском внутри
export const filterOption = (input, option) =>
	(option?.label ?? '')
		.toLowerCase()
		.includes(input.toLowerCase());