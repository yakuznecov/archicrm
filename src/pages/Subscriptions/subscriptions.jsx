// Subscriptions

import React, { useState } from 'react';
import Breadcrumbs from '@/components/Common/Breadcrumb';
import { SubscriptionsTable } from '@/components';

import { Col, Row, Card, CardBody } from 'reactstrap';

import { useToggle } from '@/hooks';

const Subscriptions = () => {
	const [modal, toggleModal] = useToggle(false);
	const [isEdit, setIsEdit] = useState(false);

	// Open modal
	// const handleSubAdd = () => {
	// 	setIsEdit(false);
	// 	toggleModal();
	// }

	const handleIsEditChange = (value) => {
		setIsEdit(value);
	};

	return (
		<div className='page-content'>
			<div className='container-fluid'>
				<Breadcrumbs title='Абонементы' breadcrumbItem='Абонементы' />
				<Row>
					<Col xs='12'>
						<Card>
							<CardBody>
								<SubscriptionsTable
									modal={modal}
									toggle={toggleModal}
									isEdit={isEdit}
									onIsEditChange={handleIsEditChange}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default Subscriptions;
