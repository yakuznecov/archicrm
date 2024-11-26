import React, { useEffect } from "react";
import withRouter from "./Common/withRouter";
import { useLocation } from "react-router-dom";

const NonAuthLayout = (props) => {
	const path = useLocation();
	useEffect(() => {
		const title = path.pathname;
		let currentage = title.charAt(1).toUpperCase() + title.slice(2);

		document.title = currentage;
	}, [path.pathname]);

	return <React.Fragment>{props.children}</React.Fragment>;
};

export default withRouter(NonAuthLayout);
