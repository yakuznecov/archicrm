// Cash page
import React, { useState, useCallback } from 'react';
import { CashTable } from '@/components';
import Breadcrumbs from '@/components/Common/Breadcrumb';
import MiniWidget from '@/pages/Dashboard/mini-widget';
import ChartDataLogic from '@/pages/Dashboard/ChartDataLogic';
import { Col, Row, Card } from 'antd';

const Cash = () => {
	const reports = ChartDataLogic(); // данные виджета кассы

	const [modal, setModal] = useState(false);
	const [isEdit, setIsEdit] = useState(false);

	// Open modal
	const handleCashAdd = () => {
		setIsEdit(false);
		toggle();
	};

	const handleIsEditChange = (value) => {
		setIsEdit(value);
	};

	const toggle = useCallback(() => {
		setModal((prevModal) => !prevModal);
	}, [modal]);

	return (
		<div className='page-content'>
			<div className='container-fluid'>
				<Breadcrumbs
					title='Приход / расход'
					breadcrumbItem='Приход / расход'
					addButtonLabel='Добавить приход / расход'
					onClick={handleCashAdd}
				/>
				<Row>
					<MiniWidget reports={reports} />
				</Row>
				<Row>
					<Col span={24}>
						<Card>
							<CashTable
								modal={modal}
								toggle={toggle}
								isEdit={isEdit}
								onIsEditChange={handleIsEditChange}
							/>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default Cash;
