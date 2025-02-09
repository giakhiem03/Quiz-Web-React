import { useEffect, useState } from "react";
import Select from "react-select";
import "./QuizQA.scss";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { LuImagePlus } from "react-icons/lu";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import {
    getAllQuizForAdmin,
    getQuizWithQA,
    postUpsertQA,
} from "../../../../services/apiServices";
import { toast } from "react-toastify";

function QuizQA() {
    const initQuestions = [
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
    ];
    const [selectedQuiz, setSelectedQuiz] = useState({});

    const [questions, setQuestions] = useState(initQuestions);

    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [dataImagePreview, setDataImagePreview] = useState({
        title: "",
        url: "",
    });

    const [listQuiz, setListQuiz] = useState([]);
    useEffect(() => {
        fetchAllQuiz();
    }, []);

    useEffect(() => {
        if (selectedQuiz && selectedQuiz.value) {
            fetchQuizWithQA();
        }
    }, [selectedQuiz]);

    function urltoFile(url, filename, mimeType) {
        if (url.startsWith("data:")) {
            var arr = url.split(","),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[arr.length - 1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            var file = new File([u8arr], filename, { type: mime || mimeType });
            return Promise.resolve(file);
        }
        return fetch(url)
            .then((res) => res.arrayBuffer())
            .then((buf) => new File([buf], filename, { type: mimeType }));
    }

    const fetchQuizWithQA = async () => {
        let res = await getQuizWithQA(selectedQuiz.value);
        if (res && res.EC === 0) {
            let newQA = [];
            for (let i = 0; i < res.DT.qa.length; i++) {
                let q = res.DT.qa[i];
                if (q.imageFile) {
                    q.imageName = `Question-${q.id}.png`;
                    q.imageFile = await urltoFile(
                        `data:image/png;base64,${q.imageFile}`,
                        `Question-${q.id}.png`,
                        "image/png"
                    );
                    newQA.push(q);
                }
            }
            setQuestions(newQA);
        }
    };

    const fetchAllQuiz = () => {
        getAllQuizForAdmin()
            .then((res) => {
                if (res && res.EC === 0) {
                    let newQuiz = res.DT.map((item) => {
                        return {
                            value: item.id,
                            label: `${item.id} - ${item.description}`,
                        };
                    });
                    setListQuiz(newQuiz);
                }
            })
            .catch((error) => {
                console.log("error catch:", error);
            });
    };
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

    const handleSubmitQuestionForQuiz = async () => {
        //check empty
        if (_.isEmpty(selectedQuiz)) {
            toast.error("Please choose a Quiz!");
            return;
        }
        //validate answer
        let isValidAnswer = true;
        let indexQ,
            indexA = 0;
        for (let i = 0; i < questions.length; i++) {
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    isValidAnswer = false;
                    indexA = j;
                    break;
                }
            }
            indexQ = i;
            if (isValidAnswer === false) {
                break;
            }
        }
        if (isValidAnswer === false) {
            toast.error(
                `Not empty Answer ${indexA + 1} at Question ${indexQ + 1}`
            );
            return;
        }
        //validate question
        let isValidQ = true;
        let indexQ1 = 0;
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                isValidQ = false;
                indexQ1 = i;
                break;
            }
        }
        if (isValidQ === false) {
            toast.error(`Not empty description for Question ${indexQ1 + 1}`);
            return;
        }

        let questionClone = _.cloneDeep(questions);
        for (let i = 0; i < questionClone.length; i++) {
            if (questionClone[i].imageFile) {
                questionClone[i].imageFile = await toBase64(
                    questionClone[i].imageFile
                );
            }
        }
        let res = await postUpsertQA({
            quizId: selectedQuiz.value,
            questions: questionClone,
        });
        if (res && res.EC === 0) {
            toast.success("Create questions and answers succeed!");
            setQuestions(initQuestions);
            fetchQuizWithQA();
        }
    };

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        });

    const handlePreviewImage = (questionId) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex((item) => item.id === questionId);
        if (index > -1) {
            setDataImagePreview({
                url: URL.createObjectURL(questionClone[index].imageFile),
                title: questionClone[index].imageName,
            });
            setIsPreviewImage(true);
        }
    };

    return (
        <div className="questions-container">
            <div className="add-new-question">
                <div className="col-6 form-group">
                    <label className="mb-2">Select Quiz:</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
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
                                        {question.imageName ? (
                                            <span
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                    handlePreviewImage(
                                                        question.id
                                                    )
                                                }
                                            >
                                                {question.imageName}
                                            </span>
                                        ) : (
                                            "0 file is uploaded"
                                        )}
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
                            {isPreviewImage && (
                                <Lightbox
                                    image={dataImagePreview.url}
                                    title={dataImagePreview.title}
                                    onClose={() => setIsPreviewImage(false)}
                                ></Lightbox>
                            )}
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

export default QuizQA;
