// OutstaffDashboard, баланс компании
import React from "react";
import { Row, Col, Card } from "antd";
import CountUp from 'react-countup';
import ReactApexChart from "react-apexcharts";
import useOutstaffDashboard from './useOutstaffDashboard';

const OutstaffDashboard = () => {
	const reports = useOutstaffDashboard();

	return (
		<Row gutter={10}>
			{reports?.map((report) => (
				<Col span={6} key={report.id}>
					<Card size="small">
						<div className="d-flex justify-content-between align-items-center">
							<div>
								<h3>
									<CountUp end={report.value} separator="," prefix={report.prefix} suffix={report.suffix} decimals={report.decimal} />
								</h3>
								<h6 style={{ color: '#6063aa' }}>{report.title}</h6>
							</div>
							<ReactApexChart
								options={report.options}
								series={report.series}
								type={report.charttype}
								height={report.chartheight}
								width={report.chartwidth}
							/>
						</div>
					</Card>
				</Col>
			))}
		</Row>
	);
};

export default OutstaffDashboard;