// all routes

import React from 'react';
import { Navigate } from 'react-router-dom';

// Dashboard
import Dashboard from '../pages/Dashboard/dashboard';

// Staff
import Staff from '../pages/Staff/staff';
import WorkSchedule from '../pages/Staff/work-schedule';

// Services
import ServicesList from '../pages/Services/services-list';

// Bookings
import Bookings from '../pages/Bookings/bookings';

// Payment
import Payment from '../pages/Payment/payment';
import PaymentSubscriptions from '../pages/PaymentSubscriptions/payment-subscriptions';

// Cash
import Cash from '../pages/Cash/cash';

// Fields
import TemplateFields from '../pages/Templates/template-fields';

// Subscriptions
import Subscriptions from '../pages/Subscriptions/subscriptions';

// Procuratory
import Procuratory from '../pages/Outstaffing/procuratory';

// Депозиты компаний
import CompanyDeposits from '../pages/Companies/deposit/companyDeposits';

// Общая касса аутстафф
import OutstaffCashier from '../pages/Outstaffing/summary-date/outstaffCash';

// Сводка за дату
import SummaryDate from '../pages/Outstaffing/summary-date/summaryDate';

// Договоры клиентов
import Contracts from '../pages/Outstaffing/contracts/contracts';

// Заказы в договорах
import ContractOrders from '../pages/Outstaffing/contract-orders/contractOrders';

// Store
import StoreGoods from '../pages/StoreGoods/storeGoods';
import StoreGoodsSize from '../pages/StoreGoods/storeGoodsSize';
import StoreGoodsCategory from '../pages/StoreGoods/storeGoodsCategory';
import StoreGoodsMaterial from '../pages/StoreGoods/storeGoodsMaterial';
import StoreGoodsName from '../pages/StoreGoods/storeGoodsName';

// Service requests
import ServiceRequests from '../pages/Services/service-requests';
import ServiceRequestsOutstaff from '../pages/Outstaffing/service-requests-outstaff/service-requests-outstaff';

// Contacts
import CustomersList from '../pages/Customers/customers-list';

// Clients
import Clients from '../pages/Outstaffing/clients/clients';

// Companies
import Companies from '../pages/Companies/companies';
import CompanyAddress from '../pages/Companies/company-address';

// Physics
import Physics from '../pages/Physics/physics';

// Templates
import Template from '../pages/Templates/template';
import TemplatesSet from '../pages/Templates/templates-set';

// Glossary
import Glossary from '../pages/Glossary/glossary';

// Authentication related pages
import Login from '../pages/Authentication/Login';
import Logout from '../pages/Authentication/Logout';

// Profile
import ServicesAdd from '../pages/Services/ServicesAdd';

// Зарплата
import Salary from '../pages/Outstaffing/salary/salary';

// Сотрудники аутстафф
import Employees from '../pages/Outstaffing/employees/employees';

// Расходы внутренних компаний
import ExpensesCompanies from '../pages/Outstaffing/expenses-companies/expensesCompanies';

// Контрагенты
import ContrAgents from '../pages/Outstaffing/contr-agents/contrAgents';

// Договоры
import Sanatera from '../pages/Online/Dogovora/Sanatera/sanatera';
import Ushakov from '../pages/Online/Dogovora/IPUshakov/ipushakov';
import Sukorskiy from '../pages/Online/Dogovora/IPSukorskiy/ipsukorskiy';
import Feeriya from '../pages/Online/Dogovora/Feeriya/feeriya';
import Liberty from '../pages/Online/Dogovora/Liberty/liberty';
import IpZhiuris from '../pages/Online/Dogovora/Zhiuris/ipzhiuris';
import Leon from '../pages/Online/Dogovora/IPLeon/ipleon';
import M1 from '../pages/Online/Dogovora/M1/m1';
import Arkona from '../pages/Online/Dogovora/nds/Arkona/arkona';
import Art from '../pages/Online/Dogovora/nds/Art/art';
import Atlant from '../pages/Online/Dogovora/nds/Atlant/atlant';
import Aurum from '../pages/Online/Dogovora/nds/Aurum/aurum';
import Grand from '../pages/Online/Dogovora/nds/Grand/grand';
import Ra from '../pages/Online/Dogovora/nds/Ra/ra';
import Resurs from '../pages/Online/Dogovora/nds/Resurs/resurs';
import Ritm from '../pages/Online/Dogovora/nds/Ritm/ritm';
import Rus from '../pages/Online/Dogovora/nds/Rus/rus';
import Servis from '../pages/Online/Dogovora/nds/Servis/servis';
import Sfera from '../pages/Online/Dogovora/nds/Sfera/sfera';
import Vektor from '../pages/Online/Dogovora/nds/Vektor/vektor';
import Znak from '../pages/Online/Dogovora/nds/Znak/znak';
import Prioritet from '../pages/Online/Dogovora/nds/Prioritet/prioritet';
import Arenda from '../pages/Arenda/arenda';
import IpZhiurisKd from '../pages/Online/Dogovora/IPZhiuris_kd/ipzhiuris_kd';

// Оплаты заказов в договорах
import ContractOrderPayments from '../pages/Outstaffing/contract-order-payments/contractOrderPayments';

const userRoutes = [
	{ path: '/dashboard', component: <Dashboard /> },

	// Staff
	{ path: '/staff', component: <Staff /> },
	{ path: '/work-schedule', component: <WorkSchedule /> },

	// Services
	{ path: '/services-list', component: <ServicesList /> },
	{ path: '/services-add', component: <ServicesAdd /> },

	// Service Requests
	{ path: '/service-requests', component: <ServiceRequests /> },
	{
		path: '/service-requests-outstaff',
		component: <ServiceRequestsOutstaff />,
	},

	// Bookings
	{ path: '/bookings', component: <Bookings /> },

	// Payment
	{ path: '/payment', component: <Payment /> },
	{ path: '/payment-subscriptions', component: <PaymentSubscriptions /> },

	// Cash
	{ path: '/cash', component: <Cash /> },

	// Subscriptions
	{ path: '/subscriptions', component: <Subscriptions /> },

	// Procuratory
	{ path: '/procuratory', component: <Procuratory /> },

	// Депозиты компаний
	{ path: '/companyDeposits', component: <CompanyDeposits /> },

	// Store
	{ path: '/storeGoods', component: <StoreGoods /> },
	{ path: '/storeGoodsSize', component: <StoreGoodsSize /> },
	{ path: '/storeGoodsCategory', component: <StoreGoodsCategory /> },
	{ path: '/storeGoodsMaterial', component: <StoreGoodsMaterial /> },
	{ path: '/storeGoodsName', component: <StoreGoodsName /> },

	// Договоры аутстафф
	{ path: '/contracts', component: <Contracts /> },

	// Заказы в договорах
	{ path: '/contractOrders', component: <ContractOrders /> },

	// Общая касса аутстафф
	{ path: '/outstaff-cashier', component: <OutstaffCashier /> },

	// Сводка за дату
	{ path: '/summaryDate', component: <SummaryDate /> },

	// Contacts
	{ path: '/customers-list', component: <CustomersList /> },

	// Clients
	{ path: '/clients', component: <Clients /> },

	// Companies
	{ path: '/companies', component: <Companies /> },
	{ path: '/company-address', component: <CompanyAddress /> },

	// Physics
	{ path: '/physics', component: <Physics /> },

	// Templates
	{ path: '/template', component: <Template /> },
	{ path: '/template-fields', component: <TemplateFields /> },
	{ path: '/templates-set', component: <TemplatesSet /> },

	// Glossary
	{ path: '/glossary', component: <Glossary /> },

	// Оплаты заказов в договорах
	{ path: '/contractOrderPayments', component: <ContractOrderPayments /> },

	// Зарплата
	{ path: '/salary', component: <Salary /> },

	// Сотрудники аутстафф
	{ path: '/employees', component: <Employees /> },

	// Расходы внутренних компаний
	{ path: '/expenses-companies', component: <ExpensesCompanies /> },

	// Контрагенты
	{ path: '/contr-agents', component: <ContrAgents /> },

	// this route should be at the end of all other routes
	// eslint-disable-next-line react/display-name
	{
		path: '/',
		exact: true,
		component: <Navigate to='/dashboard' />,
	},
	{ path: '*', component: <Navigate to='/dashboard' /> },
];

const authRoutes = [
	{ path: '/logout', component: <Logout /> },
	{ path: '/login', component: <Login /> },
];

// опубликованные договоры
const contactsRoutes = [
	{ path: 'online/dogovora/sanatera', component: <Sanatera /> },
	{ path: 'online/dogovora/ipushakov', component: <Ushakov /> },
	{ path: 'online/dogovora/ipsukorskiy', component: <Sukorskiy /> },
	{ path: 'online/dogovora/feeriya', component: <Feeriya /> },
	{ path: 'online/dogovora/liberty', component: <Liberty /> },
	{ path: 'online/dogovora/ipzhiuris', component: <IpZhiuris /> },
	{ path: 'online/dogovora/ipzhiuris_kd', component: <IpZhiurisKd /> },
	{ path: 'online/dogovora/ipleon', component: <Leon /> },
	{ path: 'online/dogovora/m1', component: <M1 /> },
	{ path: 'online/dogovora/nds/arkona', component: <Arkona /> },
	{ path: 'online/dogovora/nds/art', component: <Art /> },
	{ path: 'online/dogovora/nds/atlant', component: <Atlant /> },
	{ path: 'online/dogovora/nds/aurum', component: <Aurum /> },
	{ path: 'online/dogovora/nds/grand', component: <Grand /> },
	{ path: 'online/dogovora/nds/ra', component: <Ra /> },
	{ path: 'online/dogovora/nds/resurs', component: <Resurs /> },
	{ path: 'online/dogovora/nds/ritm', component: <Ritm /> },
	{ path: 'online/dogovora/nds/rus', component: <Rus /> },
	{ path: 'online/dogovora/nds/sfera', component: <Sfera /> },
	{ path: 'online/dogovora/nds/vektor', component: <Vektor /> },
	{ path: 'online/dogovora/nds/znak', component: <Znak /> },
	{ path: 'online/dogovora/nds/prioritet', component: <Prioritet /> },
	{ path: 'online/dogovora/nds/servis', component: <Servis /> },
	{ path: 'arenda', component: <Arenda /> },
];

export { userRoutes, authRoutes, contactsRoutes };
