// Breadcrumb

import React from "react";
import { Col, Row } from 'antd';

const Breadcrumb = ({ breadcrumbItem, addButtonLabel, onClick }) => {
	return (
		<Row className='mb-3 align-items-center'>
			<Col span={16}>
				<div className="d-flex align-items-center justify-content-between">
					<h4 className="mb-0">{breadcrumbItem}</h4>
				</div>
			</Col>

			{/* Добавление кнопки на страницу */}
			{addButtonLabel && (
				<Col span={8} className="col-4 text-end">
					<button className="archi__btn archi__btn-purple" onClick={onClick}>
						{addButtonLabel}
					</button>
				</Col>
			)}
		</Row>
	)
}

export default Breadcrumb
