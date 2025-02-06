import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteQuizForAdmin } from "../../../../services/apiServices";
import { toast } from "react-toastify";

function ModalDeleteQuiz({
    show,
    setShowModalDeleteQuiz,
    dataDelete,
    fetchAllQuiz,
}) {
    const handleClose = () => setShowModalDeleteQuiz(false);
    const handleSubmitDeleteQuiz = () => {
        deleteQuizForAdmin(dataDelete.id)
            .then((data) => {
                if (data && data.EC === 0) {
                    toast.success(data.EM);
                    handleClose();
                    fetchAllQuiz();
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
                    <Modal.Title>Confirm Delete the Quiz?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure to delete this quiz. id =
                    <b> {dataDelete.id}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmitDeleteQuiz}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;
