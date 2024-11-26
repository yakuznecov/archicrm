import React from 'react';
import Breadcrumbs from '@/components/Common/Breadcrumb';
import { Col, Row, Card } from 'antd';
import ServiceRequestsTable from './components/ServiceRequestsTable';
import { statusRequestsData } from '@/common/data/statusRequestsData';
import { useLoadServiceRequests } from './hooks/useLoadServiceRequests';
import MainRadioButtons from '@/components/Common/MainRadioButtons';
import EditRequestModal from './components/EditRequestModal';
import useEditRequestModal from './hooks/useEditRequestModal';

const ServiceRequestsOutstaff = () => {
	const {
		data,
		isFetching,
		selectedStatus,
		setSelectedStatus,
		handleRadioChange,
	} = useLoadServiceRequests();

	// управление модальным окном
	const {
		modal,
		toggleModal,
		form,
		onFinish,
		fields,
		cancelFormFields,
		handleCellClick,
	} = useEditRequestModal();

	return (
		<div className='page-content'>
			<div className='container-fluid'>
				<Breadcrumbs title='Заявки' breadcrumbItem='Список заявок' />
				{/* фильтры заявок */}
				<div className='mb-2'>
					<MainRadioButtons
						radioOptions={statusRequestsData}
						selectedRadio={selectedStatus}
						setSelectedRadio={setSelectedStatus}
						handleRadioChange={handleRadioChange}
					/>
				</div>

				<Row>
					<Col span={24}>
						<Card>
							<ServiceRequestsTable
								data={data}
								loading={isFetching}
								handleCellClick={handleCellClick}
							/>
						</Card>
					</Col>
				</Row>

				<EditRequestModal
					modal={modal}
					form={form}
					onFinish={onFinish}
					fields={fields}
					cancelFormFields={cancelFormFields}
				/>
			</div>
		</div>
	);
};

export default ServiceRequestsOutstaff;
