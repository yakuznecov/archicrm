// ProfileMenu

import React, { useState } from "react";
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
} from "reactstrap"

import { Link } from "react-router-dom";

const ProfileMenu = props => {
	const username = localStorage.getItem("username");

	const [menu, setMenu] = useState(false);

	return (
		<React.Fragment>
			<Dropdown
				isOpen={menu}
				toggle={() => setMenu(!menu)}
				className="d-inline-block"
			>
				<DropdownToggle
					className="btn header-item waves-effect"
					id="page-header-user-dropdown"
					tag="button"
				>
					<span className="d-none d-xl-inline-block ms-1 fw-medium font-size-15">{username}</span>
					<i className="uil-angle-down d-none d-xl-inline-block font-size-15"></i>
				</DropdownToggle>
				<DropdownMenu className="dropdown-menu-end">

					{/* <div className="dropdown-divider" /> */}
					<Link to="/logout" className="dropdown-item">
						<i className="uil uil-sign-out-alt font-size-18 align-middle me-1 text-muted"></i>
						<span>Logout</span>
					</Link>
				</DropdownMenu>
			</Dropdown>
		</React.Fragment>
	)
}

export default ProfileMenu;  
