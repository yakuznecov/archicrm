import React from "react";
import { Col, Card, CardBody } from "reactstrap";
import CountUp from 'react-countup';
import ReactApexChart from "react-apexcharts";
import ChartDataLogic from './ChartDataLogic';

const MiniWidget = () => {
	const reports = ChartDataLogic();

	return (
		<React.Fragment>
			{reports?.map((report, key) => (
				<Col md={6} xl={3} key={key}>
					<Card>
						<CardBody className="archi__cardBody">
							<div className="float-end mt-2">
								<ReactApexChart
									options={report.options}
									series={report.series}
									type={report.charttype}
									height={report.chartheight}
									width={report.chartwidth}
								/>
							</div>
							<div>
								<h4 className="mb-1 mt-1"><span><CountUp end={report.value} separator="," prefix={report.prefix} suffix={report.suffix} decimals={report.decimal} /></span></h4>
								<p className="text-muted mb-0">{report.title}</p>
							</div>
						</CardBody>
					</Card>
				</Col>
			))}
		</React.Fragment>
	);
};

export default MiniWidget;