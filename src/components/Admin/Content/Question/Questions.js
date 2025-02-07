import { useState } from "react";
import Select from "react-select";
import "./Questions.scss";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { LuImagePlus } from "react-icons/lu";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

function Questions() {
    const options = [
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
    ];
    const [selectedQuiz, setSelectedQuiz] = useState({});

    const [questions, setQuestions] = useState([
        {
            id: uuidv4(),
            description: "",
            imageFile: "",
            imageName: "",
            answers: [
                {
                    id: uuidv4(),
                    description: "",
                    isCorrect: false,
                },
            ],
        },
    ]);

    const handleAddRemoveQuestion = (type, id) => {
        if (type === "ADD") {
            const newQuestion = {
                id: uuidv4(),
                description: "",
                imageFile: "",
                imageName: "",
                answers: [
                    {
                        id: uuidv4(),
                        description: "",
                        isCorrect: false,
                    },
                ],
            };

            setQuestions([...questions, newQuestion]);
        }

        if (type === "REMOVE") {
            let questionClone = _.cloneDeep(questions);

            questionClone = questionClone.filter((item) => item.id !== id);

            setQuestions(questionClone);
        }
    };
    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionClone = _.cloneDeep(questions);
        if (type === "ADD") {
            const newAnswer = {
                id: uuidv4(),
                description: "",
                isCorrect: false,
            };

            let index = questionClone.findIndex(
                (item) => item.id === questionId
            );

            questionClone[index].answers.push(newAnswer);
            setQuestions(questionClone);
        }

        if (type === "REMOVE") {
            let index = questionClone.findIndex(
                (item) => item.id === questionId
            );
            questionClone[index].answers = questionClone[index].answers.filter(
                (item) => item.id !== answerId
            );

            setQuestions(questionClone);
        }
    };

    const handleOnchange = (type, questionId, value) => {
        if (type === "QUESTION") {
            let questionClone = _.cloneDeep(questions);

            let index = questionClone.findIndex(
                (item) => item.id === questionId
            );
            if (index > -1) {
                questionClone[index].description = value;
                setQuestions(questionClone);
            }
        }
    };

    const handleOnChangeFileQuestion = (questionId, event) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex((item) => item.id === questionId);
        if (
            index > -1 &&
            event.target &&
            event.target.files &&
            event.target.files[0]
        ) {
            questionClone[index].imageFile = event.target.files[0];
            questionClone[index].imageName = event.target.files[0].name;
            setQuestions(questionClone);
        }
    };

    const handleAnswerQuestion = (type, answerId, questionId, value) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex((item) => item.id === questionId);

        if (index > -1) {
            questionClone[index].answers = questionClone[index].answers.map(
                (answer) => {
                    if (answer.id === answerId) {
                        if (type === "CHECKBOX") {
                            answer.isCorrect = value;
                        }
                        if (type === "INPUT") {
                            answer.description = value;
                        }
                    }
                    return answer;
                }
            );
            setQuestions(questionClone);
        }
    };

    const handleSubmitQuestionForQuiz = () => {
        console.log(questions);
    };

    return (
        <div className="questions-container">
            <div className="title">Manage Questions</div>
            <hr />
            <div className="add-new-question">
                <div className="col-6 form-group">
                    <label className="mb-2">Select Quiz:</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                        className="select-quiz"
                    />
                </div>
                <div className="mt-3 mb-2">Add Questions:</div>
                {questions &&
                    questions.length > 0 &&
                    questions.map((question, index) => (
                        <div key={question.id} className="q-main mb-4">
                            <div className="questions-content">
                                <div className="form-floating description">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="name@example.com"
                                        value={question.description}
                                        onChange={(event) =>
                                            handleOnchange(
                                                "QUESTION",
                                                question.id,
                                                event.target.value
                                            )
                                        }
                                    />
                                    <label>
                                        Question's {index + 1} Description
                                    </label>
                                </div>
                                <div className="group-upload">
                                    <label htmlFor={`${question.id}`}>
                                        <LuImagePlus className="label-up" />
                                    </label>
                                    <input
                                        id={`${question.id}`}
                                        hidden
                                        type="file"
                                        onChange={(event) =>
                                            handleOnChangeFileQuestion(
                                                question.id,
                                                event
                                            )
                                        }
                                    />
                                    <span>
                                        {question.imageName
                                            ? question.imageName
                                            : "0 file is uploaded"}
                                    </span>
                                </div>
                                <div className="btn-add">
                                    <span
                                        onClick={() =>
                                            handleAddRemoveQuestion("ADD", "")
                                        }
                                    >
                                        <CiSquarePlus className="icon-add" />
                                    </span>
                                    {questions.length > 1 && (
                                        <span
                                            onClick={() =>
                                                handleAddRemoveQuestion(
                                                    "REMOVE",
                                                    question.id
                                                )
                                            }
                                        >
                                            <CiSquareMinus className="icon-remove" />
                                        </span>
                                    )}
                                </div>
                            </div>
                            {question.answers &&
                                question.answers.length > 0 &&
                                question.answers.map((answer, index) => (
                                    <div
                                        key={answer.id}
                                        className="answers-content"
                                    >
                                        <input
                                            className="form-check-input iscorrect"
                                            type="checkbox"
                                            checked={answer.isCorrect}
                                            onChange={(event) =>
                                                handleAnswerQuestion(
                                                    "CHECKBOX",
                                                    answer.id,
                                                    question.id,
                                                    event.target.checked
                                                )
                                            }
                                        />
                                        <div className="form-floating answer-name">
                                            <input
                                                value={answer.description}
                                                type="text"
                                                className="form-control"
                                                placeholder="text"
                                                onChange={(event) =>
                                                    handleAnswerQuestion(
                                                        "INPUT",
                                                        answer.id,
                                                        question.id,
                                                        event.target.value
                                                    )
                                                }
                                            />
                                            <label>Answer {index + 1}</label>
                                        </div>
                                        <div className="btn-group">
                                            <span
                                                onClick={() =>
                                                    handleAddRemoveAnswer(
                                                        "ADD",
                                                        question.id
                                                    )
                                                }
                                            >
                                                <CiSquarePlus className="icon-add" />
                                            </span>
                                            {question.answers.length > 1 && (
                                                <span
                                                    onClick={() =>
                                                        handleAddRemoveAnswer(
                                                            "REMOVE",
                                                            question.id,
                                                            answer.id
                                                        )
                                                    }
                                                >
                                                    <CiSquareMinus className="icon-remove" />
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    ))}
                {questions && questions.length > 0 && (
                    <div>
                        <button
                            onClick={() => handleSubmitQuestionForQuiz()}
                            className="btn btn-warning"
                        >
                            Save Questions
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Questions;
