// Contracts Договоры клиентов аутстафф
import React from 'react';
import { Col, Row, Modal, Divider, Checkbox } from 'antd';
import { Toaster } from 'react-hot-toast'; // notifications

// import { getUser } from '@/services';
import { PrimaryBtn, UpdateBtn } from '@/components';
import ContractTabs from './contractTabs';
import ContractsTable from './contractsTable';
import { useToggle } from '@/hooks';
import CollapseFilters from '../filters/collapseFilters';
import CustomRadio from '@/components/Common/CustomRadio';
import { SearchParamsForm } from './components/SearchParamsForm';
import { useCitySelection } from './hooks/useCitySelection';
import { useContractModal } from './hooks/useContractModal';
import { useContractsLk } from './hooks/useContractsLk';
import { useUpdateContracts } from './hooks/useUpdateContracts';

const cities = [
	{ value: 'Москва', label: 'Москва' },
	{ value: 'Химки', label: 'Химки' },
];

const Contracts = () => {
	const { handleUpdateContracts } = useUpdateContracts();

	// модальное окно изменения статуса выбранных договоров
	const [isSelectionModalOpen, toggleSelectionModal] = useToggle(false);

	// Выбор города
	const { OUTSTAFFKIN, selectedCity, handleCityChange } = useCitySelection();

	// Выбор договоров из личного кабинета для фильтрации
	const { isContractsLkChecked, handleContractsLkChange } = useContractsLk();

	// модальное окно
	const {
		form,
		isModalOpen,
		isEdit,
		toggleModal,
		setIsEdit,
		clearContract,
		clearContractId,
		setSelectedManager,
		setSelectedContrAgent,
	} = useContractModal();

	// Добавить договор
	const handleContractAdd = async () => {
		clearContract(); // очистить договор
		clearContractId(); // очистить id договора
		setSelectedManager(null); // очистить выбранного менеджера
		setSelectedContrAgent(null); // очистить выбранного контрагента
		toggleModal();
		setIsEdit(false);
	};

	return (
		<>
			<div className='page-content'>
				<div className='container-fluid'>
					<div
						className='mb-2 d-flex align-items-center gap-3'
						style={{ flexWrap: 'wrap' }}
					>
						<UpdateBtn onClick={handleUpdateContracts}>
							Обновить таблицу
						</UpdateBtn>
						<div style={{ width: '75px' }}>
							<PrimaryBtn onClick={toggleSelectionModal}>Статус</PrimaryBtn>
						</div>
						<div>
							<Checkbox
								checked={isContractsLkChecked}
								onChange={handleContractsLkChange}
							>
								ЛК
							</Checkbox>
						</div>

						<div style={{ width: '160px' }}>
							{OUTSTAFFKIN && (
								<CustomRadio
									defaultValue='Москва'
									value={selectedCity}
									onChange={handleCityChange}
									options={cities}
								/>
							)}
						</div>
						<Divider type='vertical' />

						{/* параметры поиска в догорах */}
						<div>
							<SearchParamsForm />
						</div>
						<Divider type='vertical' />
						<PrimaryBtn onClick={handleContractAdd}>Создать договор</PrimaryBtn>
					</div>

					<Row className='mb-2'>
						<Col span={24}>
							{/* Аккордион с фильтрами */}
							<CollapseFilters />
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<ContractsTable
								toggleModal={toggleModal}
								open={isSelectionModalOpen}
								toggleContractModal={toggleSelectionModal}
							/>
						</Col>
					</Row>

					<Modal
						title='Создание договора'
						open={isModalOpen}
						onCancel={toggleModal}
						width={800}
						footer={null}
					>
						<ContractTabs isEdit={isEdit} form={form} />
					</Modal>
				</div>
			</div>
			<Toaster position='top-right' reverseOrder={true} />
		</>
	);
};

export default Contracts;
