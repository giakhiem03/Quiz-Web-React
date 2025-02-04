// import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../../services/apiServices";
import { toast } from "react-toastify";

function ModalDeleteUser({
    show,
    setShowModalDeleteUser,
    dataDelete,
    fetchListUsersWithPaginate,
    setCurrentPage,
}) {
    const handleClose = () => setShowModalDeleteUser(false);
    const handleSubmitDeleteUser = () => {
        deleteUser(dataDelete.id)
            .then((data) => {
                console.log("vao");
                if (data && data.EC === 0) {
                    toast.success(data.EM);
                    handleClose();
                    setCurrentPage(1);
                    fetchListUsersWithPaginate(1);
                }
                if (data && data.EC !== 0) {
                    toast.error(data.EM);
                }
            })
            .catch((error) => {
                toast.error(error);
            });
    };
    return (
        <>
            {/* <Button variant="primary" onClick={handleShow} backdrop="static">
                Launch demo modal
            </Button> */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete the User?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure to delete this user. email =
                    <b> {dataDelete.email}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmitDeleteUser}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;
