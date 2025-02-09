import "./RightContent.scss";
import CountDown from "./CountDown";
import { useRef } from "react";

function RightContent({ dataQuiz, handleFinishQuiz, setIndex }) {
    const refDiv = useRef([]);

    const onTimeUp = () => {
        handleFinishQuiz();
    };

    const getClassQuestion = (question) => {
        if (question && question.answers.length > 0) {
            if (question.answers.find((a) => a.isSelected === true)) {
                return "question selected";
            }
        }
        return "question";
    };

    const handleClickQuestion = (question, index) => {
        setIndex(index);
        if (refDiv.current) {
            refDiv.current.forEach((item) => {
                if (item && item.className === "question clicked") {
                    item.className = "question";
                }
            });
            if (question && question.answers.length > 0) {
                if (question.answers.find((a) => a.isSelected === true)) {
                    return;
                }
            }
            refDiv.current[index].className = "question clicked";
        }
    };

    return (
        <>
            <div className="main-timer">
                <CountDown onTimeUp={onTimeUp} />
            </div>
            <div className="main-question">
                {dataQuiz &&
                    dataQuiz.length > 0 &&
                    dataQuiz.map((quiz, index) => (
                        <div
                            key={`questions-abc-${index}`}
                            className={getClassQuestion(quiz)}
                            onClick={() => handleClickQuestion(quiz, index)}
                            ref={(ref) => (refDiv.current[index] = ref)}
                        >
                            {index + 1}
                        </div>
                    ))}
            </div>
        </>
    );
}

export default RightContent;
