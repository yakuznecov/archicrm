// Hooks

export { default as useCustomerSearch } from './useCustomerSearch';
export { default as useSelectedStaff } from './useSelectedStaff';
export { default as useSelectedDepartment } from './useSelectedDepartment';
export { default as useSelectedSku } from './useSelectedSku';
export { default as useSelectedAdditionalSales } from './useSelectedAdditionalSales';
export { default as useTotalSkuAmount } from './useTotalSkuAmount';
export { default as useTotalAdditionalAmount } from './useTotalAdditionalAmount';
export { default as useChangeDate } from './useChangeDate';
export { default as useSelectedServices } from './useSelectedServices';
export { default as useUpdatePayment } from './useUpdatePayment';
export { default as useDangerAlert } from './useDangerAlert';
export { default as useToggle } from './useToggle';
export { default as useSubscriptionsNames } from './useSubscriptionsNames';
export { default as useSubscriptionsByPhone } from './useSubscriptionsByPhone';
export { default as useIntlNumber } from './useIntlNumber';
export { default as useAddSubscription } from './useAddSubscription';
export { default as useDebounce } from './useDebounce';
export { default as useFormPayment } from './useFormPayment';
export { default as useSelectedOutstaff } from './useSelectedOutstaff';
export { default as useSelectedCompanyAddress } from './useSelectedCompanyAddress';

// Статистика
export { default as useStatistics } from './useStatistics';

// Шаблоны
export { default as useSelectedTemplates } from './useSelectedTemplates';
export { default as useSelectedTemplatesSet } from './useSelectedTemplatesSet';

// Поля клиентов в таблице
export { default as useClientFields } from './useClientFields';

// Поля компании
export { default as useCompanyFields } from './useCompanyFields';

// Поля сотрудников компании
export { default as useStaffFields } from './useStaffFields';

// Поля рабочего периода
export { default as useWorkingPeriodFields } from './useWorkingPeriodFields';

// Очистка кэша
export { default as useCacheCleanup } from './useCacheCleanup';

// внешнии компании (заказчик)
export { default as useFetchExternalCompanies } from './useFetchExternalCompanies';

// загрузка собственных компаний
export { default as useFetchOwnCompanies } from './useFetchOwnCompanies';

// выбор менеджера
export { default as useSelectedManager } from './useSelectedManager';

// Оплаты
export { default as usePaymentsFields } from './usePaymentsFields';

// Поиск договоров по параметрам
export { default as useSearchContractsParams } from './useSearchContractsParams';

// Поля для меню в сайдбаре
export { default as useMenuItems } from './useMenuItems';

// колонки для таблицы договоров аутстафф
export { default as useContractTableColumns } from './contract/useContractTableColumns';

// Логика удаления договоров
export { default as useDeleteContract } from './contract/useDeleteContract';

// колонки для таблицы заказов
export { default as useContractOrdersColumns } from './contract/useContractOrdersColumns';

// услуги аутстафф
export { default as useContractService } from './contract/useContractService';

// колонки для таблицы оплат заказов по договорам
export { default as useOrderPaymentsColumns } from './orderPayments/useOrderPaymentsColumns';

// колонки для таблицы депозитов
export { default as useDepositsColumns } from './deposits/useDepositsColumns';

// колонки для таблицы кассы в аутстафф
export { default as useOutstaffCashierColumns } from './outstaffСashier/useOutstaffCashierColumns';

// поиск по всем ячейкам таблицы
export { default as useSearch } from './useSearch';

// статус оплат заказов
export { default as useStatusPaymentOrders } from './useStatusPaymentOrders';

// Выбор строк в таблице
export { default as useRowSelection } from '../pages/Outstaffing/contract-orders/hooks/useRowSelection';

// Тип оплаты заказов
export { default as usePaymentTypeOrders } from './usePaymentTypeOrders';

// Загрузка данных кассы аутстафф
export { default as useLoadOutstaffCashier } from './outstaffСashier/useLoadOutstaffCashier';

// Загрузка контрагентов
export { default as useLoadContrAgents } from './useLoadContrAgents';

// звуковые эффекты
export { default as useAudio } from './useAudio';

// получение внешних компаний
export { useExternalCompaniesGet } from './queries/useExternalCompaniesGet';

// получение контрагентов
export { useContrAgentsGet } from './queries/useContrAgentsGet';

// обновление контрагента
export { useContrAgentPatch } from './queries/useContrAgentPatch';

// Обработка внешних компаний для селекта
export { default as useLoadExternalCompanies } from './useLoadExternalCompanies';
