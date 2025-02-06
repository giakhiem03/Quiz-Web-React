import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CiSquarePlus } from "react-icons/ci";
import { toast } from "react-toastify";
import { putQuizForAdmin } from "../../../../services/apiServices";
import _ from "lodash";
import Select from "react-select";

function ModalUpdateQuiz({
    show,
    setShowModalUpdateQuiz,
    dataUpdate,
    resetUpdateData,
    fetchAllQuiz,
}) {
    const options = [
        { value: "EASY", label: "EASY" },
        { value: "MEDIUM", label: "MEDIUM" },
        { value: "HARD", label: "HARD" },
    ];
    const handleClose = () => {
        setShowModalUpdateQuiz(false);
        setDescription("");
        setName("");
        setType("EASY");
        setImage("");
        setPreviewImage("");
        resetUpdateData();
    };

    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("EASY");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setDescription(dataUpdate.description);
            setName(dataUpdate.name);
            setType(dataUpdate.difficulty);
            setImage("");
            if (dataUpdate.image) {
                setPreviewImage(`data:image/png;base64,${dataUpdate.image}`);
            }
        }
    }, [dataUpdate]);

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    };

    const handleSubmitUpdateQuiz = () => {
        putQuizForAdmin(dataUpdate.id, description, name, type?.value, image)
            .then((res) => {
                if (res && res.EC === 0) {
                    toast.success("Update succeed");
                    handleClose();
                    fetchAllQuiz();
                }
                if (res && res.EC !== 0) {
                    toast.error(res.EM);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal
                className="modal-add-user"
                backdrop="static"
                show={show}
                onHide={handleClose}
                size="xl"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input
                                value={description}
                                type="text"
                                className="form-control"
                                onChange={(event) =>
                                    setDescription(event.target.value)
                                }
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input
                                value={name}
                                type="text"
                                className="form-control"
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Type</label>
                            <Select
                                defaultValue={type}
                                onChange={setType}
                                options={options}
                                placeholder="Quiz type..."
                            />
                        </div>
                        <div className="col-md-12">
                            <label
                                className="form-label label-upload"
                                htmlFor="labelUpload"
                            >
                                <CiSquarePlus />
                                Upload File Image
                            </label>
                            <input
                                type="file"
                                id="labelUpload"
                                hidden
                                onChange={handleUploadImage}
                            />
                        </div>
                        <div className="col-md-12 img-preview">
                            {previewImage ? (
                                <img src={previewImage} alt="" />
                            ) : (
                                <span>Preview Image</span>
                            )}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmitUpdateQuiz}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateQuiz;
