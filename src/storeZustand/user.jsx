// useUserStore  Запрос данных текущего пользователя
import { create } from 'zustand';
import { getUser } from '@/services';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getIsCallCenter } from '@/helpers/localStorageUtils';

export const useUserStore = create(
	persist(
		(set) => ({
			userData: {},
			isBuh: false, // бухгалтер
			isCourier: false, // курьер аутстафф
			isDelo: false, // делопроизводство
			isManager: false, // менеджер аутстафф
			isCallCenter: getIsCallCenter(),
			staffId: 0, // id сотрудника
			departmentId: 0, // департамент
			userId: 0, // создатель записи
			isSuperAdmin: false, // суперадмин
			isSanatera: false, // сотрудник медцентров
			isSuperAdminOut: false, // суперадмин аутстафф
			isSuperUser: false, // суперпользователь
			isOstrovok: false, // сотрудник ostrovok
			isOutstaff: false, // сотрудник аутстафф
			isPersonalkin: false, // сотрудник из группы персоналкин
			isPersonalkinRF: false, // сотрудник из группы персоналкин РФ, 19 департамент
			isAutstaffkin: false, // сотрудник из группы аутстаффкин
			getUser: async () => {
				const userData = await getUser();
				// console.log('userData', userData);
				const isBuh = userData?.groups.some((group) => group.name === 'buh');
				const isCourier = userData?.groups.some(
					(group) => group.name === 'courier'
				);
				const isDelo = userData?.groups.some((group) => group.name === 'delo');
				const isManager = userData?.groups.some(
					(group) => group.name === 'outstaff_manager'
				);
				const isOutstaff = userData?.groups.some(
					(group) => group.name === 'outstaff'
				);
				const staffId = userData?.staff?.id;
				const userId = userData?.staff?.user;
				const departmentId = userData?.staff?.department;
				const isOstrovok = userData?.staff?.department === 8;
				const isSuperAdmin = userData?.groups.some(
					(group) => group.name === 'megaadmin'
				);
				const isSanatera = userData?.groups.some(
					(group) => group.name === 'sanatera'
				);
				const isSuperAdminOut = userData?.groups.some(
					(group) => group.name === 'admin_outstaff'
				);
				const isSuperUser = userData?.is_superuser;
				const isCallCenter = userData?.groups.some(
					(group) => group.name === 'callcenter'
				);
				const isPersonalkin = userData?.groups.some(
					(group) => group.name === 'personalkin'
				);

				const isPersonalkinRF = userData?.staff?.department === 19;

				const isAutstaffkin = userData?.groups.some(
					(group) => group.name === 'autstaffkin'
				);

				set({
					userData,
					isBuh,
					isCourier,
					isDelo,
					isManager,
					isOutstaff,
					staffId,
					isSuperAdmin,
					isSanatera,
					isSuperAdminOut,
					isOstrovok,
					departmentId,
					userId,
					isCallCenter,
					isSuperUser,
					isPersonalkin,
					isPersonalkinRF,
					isAutstaffkin,
				});
			},
		}),
		{ name: 'user', storage: createJSONStorage(() => localStorage) }
	)
);
