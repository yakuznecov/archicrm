// Аккордионы с инпутами на вкладке договора клиента
import React, { useState } from "react";
import classnames from "classnames";
import { Col, Row, Form, Input } from 'antd';

import { Collapse } from "reactstrap";

const AccordionContract = ({ validation }) => {
	const [accordionState, setAccordionState] = useState({
		col1: false,
		col2: false,
		col3: false,
		col4: false,
		col5: false,
	});

	// Аккордеоны с документами
	const toggleAccordion = (accordionId) => {
		setAccordionState((prevState) => ({
			...prevState,
			[accordionId]: !prevState[accordionId],
		}));
	};

	return (
		<div className="accordion mb-3">
			<div className="accordion-item">
				<h2 className="accordion-header">
					<button
						className={classnames(
							"accordion-button",
							"fw-medium",
							{ collapsed: !accordionState.col1 }
						)}
						type="button"
						onClick={() => toggleAccordion('col1')}
						style={{ cursor: "pointer" }}
					>
						Доп. соглашение
					</button>
				</h2>
				<Collapse
					className="accordion-collapse"
					isOpen={accordionState.col1}
				>
					<div className="accordion-body">
						<Row gutter={16}>
							{/* Номер Доп соглашения */}
							<Col span={12}>
								<label className="form-label archi-label">№ доп. соглашения</label>
								<Form.Item
									name="extending_number"
								>
									<Input autoComplete='on' />
								</Form.Item>
							</Col>
							{/* Дата доп. соглашения */}
							<Col span={12}>
								<label className="form-label">Дата доп. соглаш.</label>
								<Form.Item
									name="extending_date"
								>
									<Input type="date" min="1900-01-01" max="2100-01-01" />
								</Form.Item>
							</Col>
						</Row>
					</div>
				</Collapse>
			</div>

			<div className="accordion-item">
				<h2 className="accordion-header">
					<button
						className={classnames(
							"accordion-button",
							"fw-medium",
							{ collapsed: !accordionState.col2 }
						)}
						type="button"
						onClick={() => toggleAccordion('col2')}
						style={{ cursor: "pointer" }}
					>
						Справка с места работы
					</button>
				</h2>
				<Collapse
					id="collapseTwo"
					className="accordion-collapse"
					isOpen={accordionState.col2}
				>
					<div className="accordion-body">
						<Row gutter={16}>
							{/* Номер приказа о приёме */}
							<Col span={8}>
								<label className="form-label archi-label">№ приказа о приёме</label>
								<Form.Item
									name="order_hire_number"
								>
									<Input autoComplete='on' />
								</Form.Item>
							</Col>
							{/* Дата приема на работу */}
							<Col span={8}>
								<label className="form-label">Дата приёма на работу</label>
								<Form.Item
									name="order_hire_date"
								>
									<Input type="date" min="1900-01-01" max="2100-01-01" />
								</Form.Item>
							</Col>
							{/* Дата начала работы */}
							<Col span={8}>
								<label className="form-label">Дата начала работы</label>
								<Form.Item
									name="work_start_date"
								>
									<Input type="date" min="1900-01-01" max="2100-01-01" />
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={16}>
							{/* Дата окончания работы */}
							<Col span={8}>
								<label className="form-label">Дата окончания работы</label>
								<Form.Item
									name="work_end_date"
								>
									<Input type="date" min="1900-01-01" max="2100-01-01" />
								</Form.Item>
							</Col>
							{/* Номер приказа об увольнении */}
							<Col span={8}>
								<label className="form-label archi-label">№ приказа об увольнении</label>
								<Form.Item
									name="order_fire_number"
								>
									<Input autoComplete='on' />
								</Form.Item>
							</Col>
						</Row>
					</div>
				</Collapse>
			</div>

			<div className="accordion-item">
				<h2 className="accordion-header">
					<button
						className={classnames(
							"accordion-button",
							"fw-medium",
							{ collapsed: !accordionState.col3 }
						)}
						type="button"
						onClick={() => toggleAccordion('col3')}
						style={{ cursor: "pointer" }}
					>
						Справка о доходах
					</button>
				</h2>
				<Collapse
					className="accordion-collapse"
					isOpen={accordionState.col3}
				>
					<div className="accordion-body">
						{/* Начало периода начисления зп */}
						<Row gutter={16}>
							{/* Дата справки */}
							<Col span={8}>
								<label className="form-label">Дата справки</label>
								<Form.Item
									name="spravka_date"
								>
									<Input type="date" min="1900-01-01" max="2100-01-01" />
								</Form.Item>
							</Col>
							<Col span={8}>
								<label className="form-label">Начало периода начисл. зп</label>
								<Form.Item
									name="start_period"
								>
									<Input type="date" min="1900-01-01" max="2100-01-01" />
								</Form.Item>
							</Col>
							{/* Конец периода начисления зп */}
							<Col span={8}>
								<label className="form-label">Конец периода начисл. зп</label>
								<Form.Item
									name="end_period"
								>
									<Input type="date" min="1900-01-01" max="2100-01-01" />
								</Form.Item>
							</Col>
						</Row>
					</div>
				</Collapse>
			</div>

			<div className="accordion-item">
				<h2 className="accordion-header">
					<button
						className={classnames(
							"accordion-button",
							"fw-medium",
							{ collapsed: !accordionState.col4 }
						)}
						type="button"
						onClick={() => toggleAccordion('col4')}
						style={{ cursor: "pointer" }}
					>
						Ходатайство
					</button>
				</h2>
				<Collapse
					className="accordion-collapse"
					isOpen={accordionState.col4}
				>
					<div className="accordion-body">
						<Row gutter={16}>
							{/* Дата ходатайства */}
							<Col span={8}>
								<label className="form-label">Дата ходатайства</label>
								<Form.Item
									name="hodataystvo_date"
								>
									<Input type="date" min="1900-01-01" max="2100-01-01" />
								</Form.Item>
							</Col>
						</Row>
					</div>
				</Collapse>
			</div>

			<div className="accordion-item">
				<h2 className="accordion-header">
					<button
						className={classnames(
							"accordion-button",
							"fw-medium",
							{ collapsed: !accordionState.col5 }
						)}
						type="button"
						onClick={() => toggleAccordion('col5')}
						style={{ cursor: "pointer" }}
					>
						Справка по уходу за ребёнком
					</button>
				</h2>
				<Collapse
					className="accordion-collapse"
					isOpen={accordionState.col5}
				>
					<div className="accordion-body">
						<Row gutter={16}>
							{/* Имя ребёнка */}
							<Col span={8}>
								<label className="form-label archi-label">Имя ребёнка</label>
								<Form.Item
									name="kid_first_name"
								>
									<Input autoComplete='on' />
								</Form.Item>
							</Col>
							{/* Фамилия ребёнка */}
							<Col span={8}>
								<label className="form-label archi-label">Фамилия ребёнка</label>
								<Form.Item
									name="kid_last_name"
								>
									<Input autoComplete='on' />
								</Form.Item>
							</Col>
							{/* Дата рождения ребёнка */}
							<Col span={8}>
								<label className="form-label">Дата рождения ребёнка</label>
								<Form.Item
									name="kid_dob"
								>
									<Input type="date" min="1900-01-01" max="2100-01-01" />
								</Form.Item>
							</Col>
						</Row>
					</div>
				</Collapse>
			</div>
		</div>
	)
}

export default AccordionContract;