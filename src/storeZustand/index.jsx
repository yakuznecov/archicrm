// Auth store
export { useAuthStore } from './auth.jsx';

export { useCashierStore } from './cashier.jsx';

// Оплаты
export { usePaymentsStore } from './payments.jsx';

// Визиты
export { useVisitStore } from './visit.jsx';

// Названия документов
export { useNamesDocumentsStore } from './namesDocuments';

// Выбор департамента
export { useDepartmentsStore } from './departments.jsx';
export { useUserStore } from './user';
export { useStaffStore } from './staff';

// Записи к специалистам
export { useBookingsStore } from './bookings.jsx';

// Доп. услуги
export { useBookingSalesStore } from './bookingSales.jsx';

// SKU
export { useSkuSalesStore } from './skuSales';

// Additional sales
export { useAdditionalSalesStore } from './additionalSales.jsx';

// Панель статистики
export { useDashboardStore } from './dashboard.jsx';

// Абонементы
export {
	useSubscriptionsStore,
	usePaymentSubscriptionsStore,
} from './subscriptions';

// Календарь
export { useCalendarStore } from './calendar.jsx';
export { useServiceRequestsStore } from './serviceRequests';

// патент
export { useApprovalDocumentStore } from './approvalDocument.jsx';

// Аутстафф
export { useOutStaff } from './outstaff';

// Услуги компании
export { useCompanyServicesStore } from './companyServices.jsx';

// Клиенты аутстафф
export { useClientsOutstaffStore } from './clientsOutstaff.jsx';

// Клиенты мед. центров
export { useCustomersStore } from './customers.jsx';

// Склад, товары
export {
	useNamesGoodsStore,
	useStoreGoods,
	useCategoryGoodsStore,
	useMaterialGoodsStore,
	useSizeGoodsStore,
} from './storeGoods';

// Компании
export { useCompaniesStore, useCompanyAddress } from './company.jsx';

// Шаблоны
export { useTemplatesStore } from './templates';

// Поля шаблонов
export { useFieldsStore } from './fields.jsx';

// Учет рабочего времени и бонусы
export { useWorkingPeriodStore } from './workingPeriod';

// Бонусы сотрудников
export { usePenaltyBonusStore } from './penaltyBonus.jsx';

// Доверенности
export { useProcuratory } from './procuratory';

// Договоры клиентов
export { useContractsStore } from './contracts.jsx';

// Заказы в договорах
export { useContractOrdersStore } from './contractOrders.jsx';

// График работы сотрудников
export { useWorkSheduleStore } from './workShedule';

// Dashboard, панель статистики на странице оплат
export { useOutstaffDashboardStore } from './outstaffDashboard';

// Депозиты компаний
export { useDepositsStore } from './deposits.jsx';

// Баланс компании контрагента
export { useContrAgentBalanceStore } from './balance.jsx';

// Касса аутстафф
export { useOutstaffCashierStore } from './outstaffCashier';

// Диапазон выбранных дат в аналитике
export { useDateRangeStore } from './dateRange.jsx';

// Контрагенты
export { useContrAgentsStore } from './contrAgents.jsx';

// Физики
export { usePhysicsStore } from './physics';

// Депозиты контрагента
export { useContrAgentDepositsStore } from './contrAgentDeposit.jsx';

// Аналитика контрагентов
export { useContrAgentAnalyticsStore } from './contrAgentAnalytics.jsx';

// Аналитика менеджеров
export { useManagersAnalyticsStore } from './managersAnalytics';

// Данные о приходах контрагентов
export { useContrAgentDataStore } from './contrAgentData.jsx';

// Баланс внутренних компаний с аналитикой по приходу от внешних компаний
export { useCompanyBalanceStore } from './companyBalance.jsx';

// Данные о расходах внутренних компаний
export { useContrAgentCostStore } from './contrAgentCost.jsx';

// Зарплата аутстафф
export { useSalaryStore } from './salary';

// личный процент менеджера
export { useManagersRateStore } from './managersRate';
