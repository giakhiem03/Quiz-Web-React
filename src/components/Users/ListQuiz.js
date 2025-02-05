import { useEffect, useState } from "react";
import { getQuizByUser } from "../../services/apiServices";
import { toast } from "react-toastify";
import "./ListQuiz.scss";
import { useNavigate } from "react-router-dom";

function ListQuiz() {
    const [arrQuiz, setArrQuiz] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getQuizData();
    }, []);

    const getQuizData = () => {
        getQuizByUser()
            .then((res) => {
                if (res && res.EC === 0) {
                    console.log(res);
                    setArrQuiz(res.DT);
                }
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    return (
        <div className="list-quiz-container container">
            {arrQuiz &&
                arrQuiz.length > 0 &&
                arrQuiz.map((quiz, index) => (
                    <div
                        key={index}
                        className="card"
                        style={{ width: "18rem" }}
                    >
                        <img
                            className="card-img-top"
                            src={`data:image/jpeg;base64,${quiz.image}`}
                            alt="Card cap"
                        />
                        <div className="card-body">
                            <h5 className="card-title">{index + 1}</h5>
                            <p className="card-text">{quiz.description}</p>
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate(`/quiz/${quiz.id}`)}
                            >
                                Start now
                            </button>
                        </div>
                    </div>
                ))}
            {arrQuiz && arrQuiz.length === 0 && <div>You don't have quiz</div>}
        </div>
    );
}

export default ListQuiz;
