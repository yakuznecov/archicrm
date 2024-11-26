// Список услуг компании

import React, { useEffect } from 'react';
import { Table, Card } from 'antd';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useDepartmentsStore, useCompanyServicesStore } from '@/storeZustand';

const ServicesList = () => {
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	// Услуги компании
	const [getCompanyServices, getCompanyServicesByDepartment, servicesList] =
		useCompanyServicesStore(
			useShallow((state) => [
				state.getCompanyServices,
				state.getCompanyServicesByDepartment,
				state.servicesList,
			])
		);

	// фильтрация по департаменту
	const filteredServices = servicesList?.filter((service) => {
		return service.department === selectedDepartment;
	});

	const columns = [
		{
			title: 'Название услуги',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Стоимость',
			dataIndex: 'service_price',
			key: 'service_price',
		},
		{
			title: 'Описание',
			dataIndex: 'description',
			key: 'description',
		},
		{
			title: 'Департамент',
			dataIndex: 'department',
			key: 'department',
		},
	];

	return (
		<>
			<div className='page-content'>
				<div className='container-fluid'>
					<Card>
						<Table
							columns={columns}
							dataSource={filteredServices}
							pagination={false}
						/>
					</Card>
				</div>
			</div>
		</>
	);
};

export default ServicesList;
