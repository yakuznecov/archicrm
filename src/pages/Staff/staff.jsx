// staff Список администраторов компании и учет рабочего времени
import { Col, Row } from 'reactstrap';

import StartTimeTable from './startTimeTable';
import WorkingPeriodTable from './workingPeriodTable';

const Staff = () => {
	return (
		<div className='page-content'>
			<div className='container-fluid'>
				<Row>
					<Col className='col-3'>
						<StartTimeTable />
					</Col>
					<Col className='col-9'>
						<WorkingPeriodTable />
					</Col>
				</Row>
				{/* Бонусы сотрудников */}
				{/* <Row>
					<Col className="col-8">
						<PenaltyBonusTable />
					</Col>
				</Row> */}
			</div>
		</div>
	);
};

export default Staff;
