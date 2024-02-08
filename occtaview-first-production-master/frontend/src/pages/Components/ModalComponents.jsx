import React from 'react'
import { Modal } from 'react-bootstrap';

function ModalComponents(props) {
    const { children, title, width, size } = props;
    const modalDialogStyle = {
      width: width, // Set the desired width here or provide a default value
    };
    return (
      <Modal
        {...props}
        size={size || "lg"}
        style={{ minWidth: "auto" }}
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        {/* <Modal.Footer></Modal.Footer> */}
        <style>{`.modal-dialog { max-width: ${modalDialogStyle.width} }`}</style>
      </Modal>
    );

  
}

export default ModalComponents
