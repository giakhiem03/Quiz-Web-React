import "./RightContent.scss";
import CountDown from "./CountDown";

function RightContent({ dataQuiz, handleFinishQuiz }) {
    const onTimeUp = () => {
        handleFinishQuiz();
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
                            className="question"
                        >
                            {index + 1}
                        </div>
                    ))}
            </div>
        </>
    );
}

export default RightContent;
