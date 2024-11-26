import React from "react";
import { Row } from "antd";

const FooterContent = () => {
	return (
		<Row>
			<span>{new Date().getFullYear()} © ARCHI</span>
			<span>
				Дизайн и Разработка <i className="mdi mdi-heart text-danger"></i> от "ООО Арчи"
			</span>
		</Row>
	)
}

export default FooterContent;
