export { default as addSubPayment } from './addSubPayment';
export { default as addSubVisit } from './addSubVisit';
export { default as addBookingPayment } from './addBookingPayment';
export { default as updateBookingPayment } from './updateBookingPayment';
export { default as addBookingSeparatePayment } from './addBookingSeparatePayment';
export { default as addSubSeparatePayment } from './addSubSeparatePayment';

// Оплаты
export { default as updatePayment } from './updatePayment';
export { getPayments, getPaymentById } from './payments';

// Абонементы
export {
	getSubscriptions,
	getSubscriptionsByPhone,
	getSingleSubscription,
	updateSubscription,
	getPaymentSubscriptions,
	getSinglePaymentSubscription,
	updatePaymentSubscription,
	getSubscriptionsName,
} from './subscriptions';

// Визиты
export { getVisits, getVisitById } from './visit';

// Компании
export {
	getCompanyAddress,
	getCompanies,
	getOwnCompanies,
	getExternalCompanies,
	getCompanyById,
	addCompanyAddress,
	getCompanyAddressById,
	updateCompanyAddress,
	patchCompany,
	addCompany,
} from './company';

// Названия документов
export { getNamesDocuments } from './namesDocuments';

// Услуги компании
export {
	getCompanyServices,
	getCompanyServicesByDepartment,
} from './companyServices';

// Дополнительные услуги
export { getAdditionalSales, updateAdditionalSales } from './additionalSales';

// Sku
export {
	getBookingSales,
	addBookingSales,
	updateBookingSales,
} from './bookingSales';

// sku sales
export { addSkuSales, updateSkuSales } from './skuSales';

// Сотрудники
export {
	getStaff,
	getDepartmentStaff,
	updateStaff,
	patchStaff,
	checkBookingExists,
	getStaffByGroup,
	getOutstaffWorkers,
	getStaffByGroupSingle,
	getOutstaffByDepartment,
	getOutstaffManagers,
	getStaffByCallcenter,
	getAdminStaff,
	getSpecialistStaff,
	getCallcenterStaff,
} from './staff';

// Бонусы и штрафы сотрудников
export {
	getPenaltyBonuses,
	getPenaltyBonusById,
	addPenaltyBonus,
	updatePenaltyBonus,
	updatePenaltyBonusStatus,
	getPenaltyBonusByStaffId,
	patchPenaltyBonus,
	deletePenaltyBonus,
} from './penaltyBonus';

// Аутстафф
export {
	getOutStaff,
	uploadFile,
	getUploadFiles,
	getUploadFileById,
	getContractServices,
	getOutstaffDashboard,
	getContrAgentBalance,
} from './outstaff';

// Клиенты аутстафф
export {
	getClientsOutstaff,
	getSingleClientOutstaff,
	addClientOutstaff,
	updateClientOutstaff,
	patchClientOutstaff,
} from './clientsOutstaff';

// Доверенности
export {
	getProcuratory,
	addProcuratory,
	updateProcuratory,
	getProcuratoryById,
} from './procuratory';

// Товары, склад
export {
	getSizeGoods,
	addSizeGood,
	updateSizeGood,
	getMaterialsGoods,
	addMaterialGood,
	updateMaterialGood,
	getCategoriesGoods,
	addCategoryGood,
	updateCategoryGood,
	getNamesGoods,
	addNamesGoods,
	updateNamesGoods,
	getStoreGoods,
	updateStoreGood,
	addStoreGood,
} from './storeGoods';

// Клиенты
export {
	getCustomers,
	addCustomer,
	updateCustomer,
	patchCustomer,
	searchCustomer,
	fetchCustomerBookings,
} from './customers';

// Пользователь
export { getUser } from './user';

export { getBookings, getBookingById, getBookingsCurrent } from './bookings';

// Поле шаблона документа
export {
	getFields,
	addField,
	updateField,
	patchField,
	getFieldById,
} from './field';

// Шаблоны
export {
	addTemplate,
	getTemplates,
	getTemplatesSet,
	getTemplatesSetById,
	addTemplatesSet,
	updateTemplatesSet,
} from './templates';

export { getDepartments } from './departments';
export { getDashboard } from './dashboard';

// Договоры клиентов аутстафф
export {
	getContracts,
	getContractById,
	addContract,
	updateContract,
	patchContract,
	deleteContract,
	getContractsParams,
	getTodayContracts,
} from './contracts';

// Заказы к договорам и оплаты
export {
	getContractOrders,
	getContractOrdersByDate,
	getContractOrdersParams,
	addContractOrderPayment,
	getOrderPayments,
	getOrderPaymentsByDate,
	getOrderPaymentsParams,
	addContractOrder,
	updateContractOrder,
	getOrderPaymentsByManager,
} from './contractOrders';

// Касса
export { default as addCashierRequest } from './addCashierRequest';
export { default as updateCashierRequest } from './updateCashierRequest';
export { getCashier } from './cashier';

// Заявки
export {
	getServiceRequests,
	updateServiceRequest,
	getServiceRequestById,
	serviceRequestPatch,
} from './serviceRequests';

// Учет рабочего времени и бонусы
export {
	getWorkingPeriod,
	addWorkingPeriod,
	updateWorkingPeriod,
	patchWorkingPeriod,
	getWorkingPeriodById,
} from './workingPeriod';

// График работы сотрудников
export {
	getWorkShedule,
	updateSpecialist,
	newDateSpecialist,
	deleteDate,
} from './workShedule';

// Депозиты компаний
export {
	getDeposits,
	addDeposit,
	getDepositsParams,
	getSingleCompanyDeposits,
	getDepositsByDate,
	updateDeposit,
} from './deposits';

// Касса аутстафф
export {
	getOutstaffCashier,
	postOutstaffCashier,
	getOutstaffCashierByDate,
	putOutstaffCashier,
	getOutstaffCashierByDepartment,
} from './outstaffCashier';

// Телеграм
export { addToTelegram } from './telegram';

// Аналитика
export { postAnalytics, postAnalyticsByDate } from './contrAgentAnalytics';

// Контрагенты
export {
	getContrAgents,
	addContrAgent,
	getContrAgentById,
	updateContrAgent,
} from './contrAgent';

// Физики
export { getPhysics, addPhysic, updatePhysic } from './physics';

// Депозиты контрагента
export {
	getContrAgentDeposits,
	addContrAgentDeposit,
	updateContrAgentDeposit,
	getContrAgentDepositsParams,
	getSingleContrAgentDeposits,
} from './contrAgentDeposit';

// Аналитика по менеджерам
export { getManagersAnalytics } from './managersAnalytics';

// Данные по приходам контрагентов
export { getContrAgentData } from './contrAgentData';

// Данные баланса внутренних компаний с аналитикой по приходу от внешних компаний
export { getCompanyBalanceData } from './companyBalanceData';

// Расходы внутренних компаний в связке с контрагентами
export { addContrAgentCost, getContrAgentCost } from './contrAgentCost';

// Зарплата сотрудников аутстафф
export {
	getSalaryDelo,
	getSalaryManagers,
	getSalaryBuh,
	getSalaryCourier,
	postSalaryPayment,
} from './salary';

// Личный процент в таблице зп
export { postManagersRate } from './managersRate';
