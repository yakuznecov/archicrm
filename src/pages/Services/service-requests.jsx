import React from 'react';
import { Card } from 'antd';

import ServiceRequestsTable from '@/pages/Outstaffing/service-requests-outstaff/components/ServiceRequestsTable';

const ServiceRequests = () => {
	return (
		<div className='page-content'>
			<div className='container-fluid'>
				<Card>
					<ServiceRequestsTable />
				</Card>
			</div>
		</div>
	);
};

export default ServiceRequests;
