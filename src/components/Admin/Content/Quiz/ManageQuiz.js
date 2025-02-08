import "./ManageQuiz.scss";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { postCreateNewQuiz } from "../../../../services/apiServices";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import Accordion from "react-bootstrap/Accordion";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import { getAllQuizForAdmin } from "../../../../services/apiServices";
import QuizQA from "./QuizQA";
import AssignQuiz from "./AssignQuiz";

function ManageQuiz() {
    const options = [
        { value: "EASY", label: "EASY" },
        { value: "MEDIUM", label: "MEDIUM" },
        { value: "HARD", label: "HARD" },
    ];

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("EASY");
    const [image, setImage] = useState(null);

    const handleChangFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    };

    const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
    const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});
    const [listQuiz, setListQuiz] = useState([]);

    const handleShowDeleteQuiz = (item) => {
        setShowModalDeleteQuiz(true);
        setDataDelete(item);
    };

    useEffect(() => {
        fetchAllQuiz();
    }, []);

    const fetchAllQuiz = () => {
        getAllQuizForAdmin()
            .then((res) => {
                console.log(res);
                if (res && res.EC === 0) {
                    setListQuiz(res.DT);
                }
            })
            .catch((error) => {
                console.log("error catch:", error);
            });
    };

    const handleClickBtnUpdate = (quiz) => {
        setShowModalUpdateQuiz(true);
        setDataUpdate(quiz);
    };

    const resetUpdateData = () => {
        setDataUpdate({});
    };
    const handleSubmitQuiz = () => {
        if (!name || !description) {
            toast.error("Name/Description is required");
            return;
        }

        postCreateNewQuiz(description, name, type?.value, image)
            .then((res) => {
                if (res && res.EC === 0) {
                    toast.success(res.EM);
                    setDescription("");
                    setName("");
                    setImage(null);
                } else {
                    toast.error(res.EM);
                }
            })
            .catch((error) => {
                console.log(" Catch error:", error);
            });
    };

    return (
        <div className="quiz-container">
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Manage Quizzes</Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new">
                            <form action="/action_page.php">
                                <fieldset className="border rounded-3 p-3">
                                    <legend className="float-none w-auto px-3">
                                        Add new quiz:
                                    </legend>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="your quiz name"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                        />
                                        <label>Name</label>
                                    </div>
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="description"
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                        />
                                        <label>Description</label>
                                    </div>
                                    <div className="my-3">
                                        <Select
                                            defaultValue={type}
                                            onChange={setType}
                                            options={options}
                                            placeholder="Quiz type..."
                                        />
                                    </div>
                                    <div className="more-actions form-group">
                                        <label className="mb-2">
                                            Upload Image
                                        </label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            onChange={handleChangFile}
                                        />
                                    </div>
                                    <div className="mt-3">
                                        <input
                                            type="button"
                                            value="Save"
                                            onChange={() => {}}
                                            className="btn btn-warning"
                                            onClick={handleSubmitQuiz}
                                        />
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                        <div className="list-detail">
                            <TableQuiz
                                handleShowDeleteQuiz={handleShowDeleteQuiz}
                                handleClickBtnUpdate={handleClickBtnUpdate}
                                listQuiz={listQuiz}
                            />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Update Q/A Quizzes</Accordion.Header>
                    <Accordion.Body>
                        <QuizQA />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Assign to Users</Accordion.Header>
                    <Accordion.Body>
                        <AssignQuiz />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <ModalDeleteQuiz
                show={showModalDeleteQuiz}
                setShowModalDeleteQuiz={setShowModalDeleteQuiz}
                dataDelete={dataDelete}
                fetchAllQuiz={fetchAllQuiz}
            />
            <ModalUpdateQuiz
                show={showModalUpdateQuiz}
                setShowModalUpdateQuiz={setShowModalUpdateQuiz}
                dataUpdate={dataUpdate}
                fetchAllQuiz={fetchAllQuiz}
                resetUpdateData={resetUpdateData}
            />
        </div>
    );
}

export default ManageQuiz;
