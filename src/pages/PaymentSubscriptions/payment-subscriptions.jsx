// Оплаты абонементов

import { PaymentSubscriptionsTable } from '@/components';

import { Col, Row, Card, CardBody } from 'reactstrap';

const PaymentSubscriptions = () => {
	return (
		<div className='page-content'>
			<div className='container-fluid'>
				<Row>
					<Col xs='12'>
						<Card>
							<CardBody>
								<PaymentSubscriptionsTable />
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default PaymentSubscriptions;
