import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getQuizById } from "../../services/apiServices";
import { toast } from "react-toastify";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import { postAnswers } from "../../services/apiServices";
import ModalResult from "./ModalResult";

function DetailQuiz() {
    const { id } = useParams();
    const { state } = useLocation();

    const [quiz, setQuiz] = useState();
    const [index, setIndex] = useState(0);

    const [isShowModalResult, setIsShowModalResult] = useState(false);
    const [dataModalResult, setDataModalResult] = useState({});
    useEffect(() => {
        fetchQuestion();
    }, []);

    const fetchQuestion = () => {
        getQuizById(id)
            .then((res) => {
                if (res && res.EC === 0) {
                    let raw = res.DT;
                    let data = _.chain(raw)
                        .groupBy("id")
                        .map((value, key) => {
                            let answers = [];
                            let questionDescription,
                                image = null;
                            value.forEach((item, index) => {
                                if (index === 0) {
                                    questionDescription = item.description;
                                    image = item.image;
                                }
                                item.answers.isSelected = false;
                                answers.push(item.answers);
                            });
                            return {
                                questionId: key,
                                answers,
                                questionDescription,
                                image,
                            };
                        })
                        .value();
                    setQuiz(data);
                }
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    const handlePrev = () => {
        if (index - 1 < 0) {
            return;
        }
        setIndex((prev) => prev - 1);
    };

    const handleNext = () => {
        if (index + 1 >= quiz.length) {
            return;
        }
        setIndex((prev) => prev + 1);
    };

    const handleFinishQuiz = () => {
        let payload = {
            quizId: +id,
            answers: [],
            // {questionId: 2, userAnswerId: [1]}
        };
        let answers = [];

        if (quiz && quiz.length > 0) {
            quiz.forEach((item) => {
                let questionId = +item.questionId;
                let userAnswerId = [];

                item.answers.forEach((a) => {
                    if (a.isSelected) userAnswerId.push(a.id);
                });
                answers.push({
                    questionId,
                    userAnswerId,
                });
            });
            payload.answers = answers;
            postAnswers(payload)
                .then((res) => {
                    if (res && res.EC === 0) {
                        setIsShowModalResult(true);
                        setDataModalResult({
                            countCorrect: res.DT.countCorrect,
                            countTotal: res.DT.countTotal,
                            quizData: res.DT.quizData,
                        });
                    } else {
                        alert("something wrong");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const handleCheckBoxData = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(quiz);
        let question = dataQuizClone.find(
            (item) => +item.questionId === +questionId
        );
        if (question) {
            question.answers = question.answers.map((item) => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            });
        }
        let index = dataQuizClone.findIndex(
            (item) => +item.questionId === +questionId
        );
        if (index > -1) {
            dataQuizClone[index] = question;
            setQuiz(dataQuizClone);
        }
    };

    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">
                    Quiz {id}: {state?.quizTitle}
                    <hr />
                </div>
                <div className="q-body">
                    <img src="" alt="" />
                </div>
                <div className="q-content">
                    <Question
                        index={index}
                        data={quiz && quiz.length > 0 ? quiz[index] : []}
                        handleCheckBoxData={handleCheckBoxData}
                    />
                </div>
                <div className="footer">
                    <button className="btn btn-secondary" onClick={handlePrev}>
                        Prev
                    </button>
                    <button className="btn btn-primary" onClick={handleNext}>
                        Next
                    </button>
                    <button
                        className="btn btn-warning"
                        onClick={handleFinishQuiz}
                    >
                        Finish
                    </button>
                </div>
            </div>
            <div className="right-content">Right </div>
            <ModalResult
                dataModalResult={dataModalResult}
                show={isShowModalResult}
                setShow={setIsShowModalResult}
            />
        </div>
    );
}

export default DetailQuiz;
