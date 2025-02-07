import { useState } from "react";
import Select from "react-select";
import "./Questions.scss";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";

function Questions() {
    const options = [
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
    ];
    const [selectedQuiz, setSelectedQuiz] = useState({});

    return (
        <div className="questions-container">
            <div className="title">Manage Questions</div>
            <div className="add-new-question">
                <div className="col-6 form-group">
                    <label>Select Quiz:</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                        className="select-quiz"
                    />
                </div>
                <div className="mt-3">Add Questions:</div>
                <div className="questions-content">
                    <div className="form-floating description">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="name@example.com"
                        />
                        <label>Description</label>
                    </div>
                    <div className="group-upload">
                        <label className="label-up">Upload Image</label>
                        <input hidden type="file" />
                        <span> 0 file isn't upload</span>
                    </div>
                    <div className="btn-add">
                        <span>
                            <CiSquarePlus className="icon-add" />
                        </span>
                        <span>
                            <CiSquareMinus className="icon-remove" />
                        </span>
                    </div>
                </div>
                <div className="answers-content">
                    <input
                        className="form-check-input iscorrect"
                        type="checkbox"
                    />
                    <div className="form-floating answer-name">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="text"
                        />
                        <label>Answer 1</label>
                    </div>
                    <div className="btn-group">
                        <span>
                            <CiSquarePlus className="icon-add" />
                        </span>
                        <span>
                            <CiSquareMinus className="icon-remove" />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Questions;
