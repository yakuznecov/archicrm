// ContractsFilters, Фильтры с выпадающим списком на главной
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Col, Row, Divider, Flex } from 'antd';
import { useLoadContrAgents, useSelectedManager } from '@/hooks';
import SwitchPatentExpires from '../switchPatentExpires';
import SelectCompanyFilters from '../filters/selectCompanyFilters';
import SelectTemplateSetFilters from '../filters/selectTemplateSetFilters';
import { DangerBtn, CommonSelect } from '@/components';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useContractsStore,
	useDateRangeStore,
	useCompaniesStore,
	useTemplatesStore,
	useContrAgentsStore,
} from '@/storeZustand';

import SwitchContractFired from './switchContractFired';
import SwitchContractOnFire from './switchContractOnFire';
import { ReferalAgentBtn } from './ReferalAgentBtn';

const ContractsFilters = () => {
	const [selectedManager, setSelectedManager] = useState(null); // выбранный менеджер

	// выбранный контрагент
	const [selectedContrAgent, setSelectedContrAgent] = useState(null);

	// Шаблоны документов
	const setSelectedTemplateSetFilters = useTemplatesStore(
		(state) => state.setSelectedTemplateSetFilters
	);

	// Диапазоны дат из Zustand store
	const [startDate, endDate] = useDateRangeStore(
		useShallow((state) => [state.startDate, state.endDate])
	);

	// Компании в фильтрах
	const [setSelectedCompanies] = useCompaniesStore(
		useShallow((state) => [state.setSelectedCompanies])
	);

	// Договоры клиента
	const [resetFilters, addFilter, filters, selectedCity] = useContractsStore(
		useShallow((state) => [
			state.resetFilters,
			state.addFilter,
			state.filters,
			state.selectedCity,
		])
	);

	// Установить контрагента
	const setContrAgent = useContrAgentsStore((state) => state.setContrAgent);

	// Сброс фильтров
	const handleResetFilters = () => {
		const filtersData = {
			city: selectedCity,
			fire: 'true',
			start_date: startDate,
			end_date: endDate,
		};

		setSelectedManager(null);
		setSelectedCompanies(null); // очистка выбранных компаний в селекте фильтров договоров
		setSelectedTemplateSetFilters(null); // очистка выбранных компаний в селекте фильтров договоров
		resetFilters(filtersData);
	};

	// Изменение менеджера
	const handleManagerChange = (value) => {
		setSelectedManager(value);

		const filters = {
			manager_id: value || null,
			start_date: value ? null : startDate,
			end_date: value ? null : endDate,
		};

		addFilter(filters);
	};

	// Загрузка списка контрагентов
	const { contrAgentsItems } = useLoadContrAgents();

	// выбранный контрагент
	const handleContrAgentChange = (value) => {
		setSelectedContrAgent(value);

		const filteredContrAgent = contrAgentsItems?.filter(
			(contrAgent) => contrAgent.value === value
		);

		setContrAgent(filteredContrAgent[0]); // Установить контрагента

		// Получаем первое число текущего месяца
		const firstDayOfMonth = dayjs().startOf('month').format('YYYY-MM-DD');

		// Получаем последнее число текущего месяца
		const lastDayOfMonth = dayjs().endOf('month').format('YYYY-MM-DD');

		const filters = {
			contr_agent_id: value || null,
			start_date: value ? null : startDate,
			end_date: value ? null : endDate,
			// fire_start_date: value ? firstDayOfMonth : null,
			// fire_end_date: value ? lastDayOfMonth : null,
			fire: null,
		};

		addFilter(filters);
	};

	// Список менеджеров для селекта
	const { outstaffManagerList } = useSelectedManager();

	return (
		<>
			<Flex gap={8} className='mb-3' align='center'>
				<div style={{ width: '180px' }}>
					{/* Выбор менеджера */}
					<CommonSelect
						value={selectedManager}
						options={outstaffManagerList}
						onChange={handleManagerChange}
						placeholder='Выбрать менеджера'
					/>
				</div>
				<Divider type='vertical' />
				<div style={{ width: '130px' }}>
					{/* Выбор названия шаблонов */}
					<SelectTemplateSetFilters />
				</div>
				<Divider type='vertical' />
				<div style={{ width: '280px' }}>
					{/* Выбор компании */}
					<SelectCompanyFilters />
				</div>
				<Divider type='vertical' />
				{/* Выбор контрагента */}
				<div style={{ width: '400px' }}>
					<CommonSelect
						value={selectedContrAgent}
						options={contrAgentsItems}
						onChange={handleContrAgentChange}
						placeholder='Выбрать контрагента'
					/>
				</div>
				{/* Кнопка для копирования ссылки на контрагента (компания или физик) */}
				<ReferalAgentBtn />
			</Flex>
			<Flex gap={8} align='center' justify='space-between'>
				<Flex gap={8}>
					<div style={{ width: '170px' }}>
						{/* Истекает патент */}
						<SwitchPatentExpires />
					</div>
					<Divider type='vertical' />
					<div style={{ width: '130px' }}>
						{/* Уволенные сотрудники */}
						<SwitchContractFired />
					</div>
					<Divider type='vertical' />
					<div style={{ width: '160px' }}>
						{/* Сотрудники на увольнение */}
						<SwitchContractOnFire />
					</div>
				</Flex>
				{/* сбросить фильтры */}
				<DangerBtn onClick={handleResetFilters}>Сбросить фильтры</DangerBtn>
			</Flex>
		</>
	);
};

export default ContractsFilters;
