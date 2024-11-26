// DeleteModal

import React from "react"
import { Col, Modal, ModalBody, Row } from "reactstrap";

const DeleteModal = ({ show, onDeleteClick, onCloseClick }) => {
	return (
		<Modal isOpen={show} toggle={onCloseClick} centered={true}>
			<ModalBody className="py-3 px-5">
				<Row>
					<Col lg={12}>
						<div className="text-center">
							<i
								className="mdi mdi-alert-circle-outline"
								style={{ fontSize: "9em", color: "#f39b38" }}
							/>
							<h2>Вы уверены?</h2>
							<h4>{"Вы не сможете это исправить!"}</h4>
						</div>
					</Col>
				</Row>
				<Row>
					<Col>
						<div className="text-center mt-3">
							<button
								type="button"
								className="archi__btn archi__btn-green ms-2"
								onClick={onDeleteClick}
							>
								Да, удалить это!
							</button>
							<button
								type="button"
								className="archi__btn archi__btn-red ms-2"
								onClick={onCloseClick}
							>
								Отмена
							</button>
						</div>
					</Col>
				</Row>
			</ModalBody>
		</Modal>
	)
}

export default DeleteModal
