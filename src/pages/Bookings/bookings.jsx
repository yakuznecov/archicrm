// Записи

import { Col, Row, Card } from 'antd';
import BookingsTable from '@/components/BookingsTable/BookingsTable';

const Bookings = () => {
	return (
		<div className='page-content'>
			<div className='container-fluid'>
				<Row>
					<Col span={24}>
						<Card>
							<BookingsTable />
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default Bookings;
