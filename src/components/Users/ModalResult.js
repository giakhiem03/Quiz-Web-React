// import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalResult({ show, setShow, dataModalResult }) {
    const handleClose = () => setShow(false);

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow} backdrop="static">
                Launch demo modal
            </Button> */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Your Result...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="">
                        Total Question: <b> {dataModalResult.countTotal}</b>
                    </div>
                    <div className="">
                        Total Correct Answers:
                        <b> {dataModalResult.countCorrect}</b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalResult;
