// пункты меню в сайдбаре
import { Badge } from 'antd';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAudio } from '@/hooks';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useUserStore,
	useContractsStore,
	useDepartmentsStore,
	useServiceRequestsStore,
} from '@/storeZustand';

import {
	HomeOutlined,
	DollarOutlined,
	MoneyCollectOutlined,
	LoginOutlined,
	BookOutlined,
	DatabaseOutlined,
	PieChartOutlined,
	ProjectOutlined,
	ScheduleOutlined,
	InfoOutlined,
	ClockCircleOutlined,
	TeamOutlined,
	TruckOutlined,
	ShoppingOutlined,
	SignatureOutlined,
	UngroupOutlined,
	WalletOutlined,
	ReadOutlined,
	ProductOutlined,
	PartitionOutlined,
	ShoppingCartOutlined,
	BankOutlined,
	AreaChartOutlined,
	OneToOneOutlined,
	RobotOutlined,
} from '@ant-design/icons';

const useMenuItems = () => {
	const navigate = useNavigate();
	// Запуск звука при новой заявке
	const { playSound } = useAudio();

	// Выбранный департамент
	const [selectedDepartment] = useDepartmentsStore((state) => [
		state.selectedDepartment,
	]);

	// Счетчик неподтвержденных договоров
	const [disapprovedContractsCount] = useContractsStore((state) => [
		state.disapprovedContractsCount,
	]);
	console.log('disapprovedContractsCount', disapprovedContractsCount);

	// Загрузка данных текущего пользователя
	const [
		isCallCenter,
		isPersonalkin,
		isSuperAdminOut,
		isAutstaffkin,
		isSanatera,
		isSuperAdmin,
		isOutstaff,
	] = useUserStore(
		useShallow((state) => [
			state.isCallCenter,
			state.isPersonalkin,
			state.isSuperAdminOut,
			state.isAutstaffkin,
			state.isSanatera,
			state.isSuperAdmin,
			state.isOutstaff,
		])
	);

	// Загрузка заявок
	const [serviceRequestsCount] = useServiceRequestsStore((state) => [
		state.serviceRequestsCount,
	]);

	const [items, setItems] = useState([]);

	const getItem = useCallback(
		(label, key, icon, extra, children) => ({
			key,
			label,
			icon,
			extra,
			children,
		}),
		[]
	);

	const handleMenuClick = (e) => {
		navigate(`/${e.key}`);
	};

	const generateMenuItems = useCallback(() => {
		// меню медцентров
		const medicineItems = [
			getItem('Главная', 'dashboard', <HomeOutlined />),
			getItem('Оплата записей', 'payment', <DollarOutlined />),
			getItem(
				'Оплата абонем.',
				'payment-subscriptions',
				<MoneyCollectOutlined />
			),
			getItem('Приход/Расход', 'cash', <LoginOutlined />),
			getItem('Все заявки', 'service-requests', <BookOutlined />),
			getItem('Все записи', 'bookings', <DatabaseOutlined />),
			getItem('Услуги', 'services-list', <ProjectOutlined />),
			getItem('Абонементы', 'subscriptions', <ScheduleOutlined />),
			getItem('Глоссарий', 'glossary', <InfoOutlined />),
			getItem('График работы', 'work-schedule', <ClockCircleOutlined />),
			getItem('Сотрудники', 'staff', <TeamOutlined />),
			getItem('SKU', 'storeGoods', <TruckOutlined />),
			getItem('Наименование', 'storeGoodsName', <ShoppingOutlined />),
			getItem('Категория', 'storeGoodsCategory', <SignatureOutlined />),
			getItem('Размер', 'storeGoodsSize', <UngroupOutlined />),
			getItem('Материал', 'storeGoodsMaterial', <WalletOutlined />),
		];

		// меню коллцентра
		const callcenterItems = [
			getItem('Главная', 'dashboard', <HomeOutlined />),
			getItem('Все заявки', 'service-requests', <BookOutlined />),
			getItem('Все записи', 'bookings', <DatabaseOutlined />),
			getItem('Услуги', 'services-list', <ProjectOutlined />),
			getItem('Абонементы', 'subscriptions', <ScheduleOutlined />),
			getItem('Глоссарий', 'glossary', <InfoOutlined />),
			getItem('График работы', 'work-schedule', <ClockCircleOutlined />),
			getItem('Сотрудники', 'staff', <TeamOutlined />),
		];

		// меню аутов
		const outstaffItems = [
			getItem('Статистика', 'summaryDate', <AreaChartOutlined />),
			getItem('Зарплата', 'salary', <PieChartOutlined />),
			getItem('Сотрудники', 'employees', <TeamOutlined />),
			getItem(
				'Заявки',
				'service-requests-outstaff',
				<BookOutlined />,
				<Badge count={serviceRequestsCount} className='mb-1' />
			),
			getItem(
				'Договоры',
				'contracts',
				<DatabaseOutlined />,
				<Badge count={disapprovedContractsCount} className='mb-1' />
			),
			// getItem('Клиенты', 'clients', <UngroupOutlined />),
			getItem('Заказы', 'contractOrders', <ShoppingCartOutlined />),
			{
				key: 'finance',
				label: 'Финансы',
				icon: <DollarOutlined />,
				children: [
					getItem('Депозиты', 'companyDeposits', <PartitionOutlined />),
					getItem('Оплаты', 'contractOrderPayments', <LoginOutlined />),
					getItem('Расходы компаний', 'expenses-companies', <BankOutlined />),
				],
			},
			getItem('Доверенности', 'procuratory', <ReadOutlined />),
			getItem('Компании', 'companies', <OneToOneOutlined />),
			getItem('Контрагенты', 'contr-agents', <ProjectOutlined />),
			getItem('Физики', 'physics', <RobotOutlined />),
			getItem('Адреса', 'company-address', <TruckOutlined />),
			{
				key: 'templates',
				label: 'Шаблоны',
				icon: <ProductOutlined />,
				children: [
					getItem('Список шаблонов', 'template-fields'),
					getItem('Создать документ', 'template'),
					getItem('Набор шаблонов', 'templates-set'),
				],
			},
		];

		if (isOutstaff) {
			return outstaffItems;
		}
		if (isCallCenter) {
			return callcenterItems;
		}
		if (isSanatera || isSuperAdmin) {
			return medicineItems;
		}

		return [];
	}, [selectedDepartment, serviceRequestsCount, disapprovedContractsCount]);

	useEffect(() => {
		const newItems = generateMenuItems();
		setItems(newItems);
	}, [generateMenuItems]);

	useEffect(() => {
		const menuContainer = document.querySelector('.ant-menu');
		if (!menuContainer || serviceRequestsCount <= 0) return;

		const handleClick = (event) => {
			if (event.target.classList.contains('ant-menu-title-content')) {
				if (isOutstaff) {
					playSound();
				}
			}
		};

		// Добавляем обработчик
		menuContainer.addEventListener('click', handleClick);

		return () => {
			menuContainer.removeEventListener('click', handleClick);
		};
	}, [selectedDepartment, serviceRequestsCount]);

	return { items, handleMenuClick };
};

export default useMenuItems;
