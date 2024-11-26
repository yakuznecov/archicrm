import React from "react";
import { UncontrolledAlert } from "reactstrap";

const DangerAlert = ({ isOpen, toggle, text }) => {
  return (
    <UncontrolledAlert
      color="danger"
      className="alert-danger alert-dismissible fade show mt-4 px-4 mb-0 text-center archiDangerAlert"
      role="alert"
      isOpen={isOpen}
      toggle={toggle}
    >
      <i className="uil uil-exclamation-octagon d-block display-4 mt-2 mb-3 text-danger"></i>
      <h5 className="text-danger">Error</h5>
      <p className="fw-bold">{text}</p>
    </UncontrolledAlert>
  );
};

export default DangerAlert;
