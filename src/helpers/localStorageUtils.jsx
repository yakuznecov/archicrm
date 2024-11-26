// Получение id департамента из localStorage
export const getDepartmentId = () => {
	const userStore = JSON.parse(localStorage.getItem('user'));
	return userStore?.state?.departmentId;
};

// получение boolean isCallCenter
export const getIsCallCenter = () => {
	const userStore = JSON.parse(localStorage.getItem('user'));
	return userStore?.state?.isCallCenter;
};
