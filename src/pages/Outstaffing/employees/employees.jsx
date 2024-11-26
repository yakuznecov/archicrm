// Сотрудники аутстафф и учет рабочего времени
import { Col, Row } from 'antd';
import StartTimeOutstaffTable from './components/StartTimeOutstaffTable';
import EndTimeOutstaffTable from './components/EndTimeOutstaffTable';

const Employees = () => {
	return (
		<Row gutter={16}>
			<Col span={7}>
				{/* установка начала рабочего времени */}
				<StartTimeOutstaffTable />
			</Col>
			<Col span={17}>
				{/* окончание рабочего времени и часы */}
				<EndTimeOutstaffTable />
			</Col>
		</Row>
	);
};

export default Employees;
