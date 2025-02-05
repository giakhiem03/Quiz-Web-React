import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuizById } from "../../services/apiServices";
import { toast } from "react-toastify";

function DetailQuiz() {
    const params = useParams();

    const [quiz, setQuiz] = useState();

    useEffect(() => {
        fetchQuestion();
    }, []);

    const fetchQuestion = () => {
        getQuizById(params.id)
            .then((res) => {
                if (res) {
                    setQuiz(res);
                    console.log(res);
                }
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    return (
        <div className="detail-quiz-container">
            {/* {quiz && quiz.length > 0 && (
                <div className="card" style={{ width: "18rem" }}>
                    <img
                        className="card-img-top"
                        src={`data:image/jpeg;base64,${quiz.image}`}
                        alt="Card cap"
                    />
                    <div className="card-body">
                        <h5 className="card-title">{quiz.id}</h5>
                        <p className="card-text">{quiz.description}</p>
                        <button className="btn btn-primary">Start now</button>
                    </div>
                </div>
            )} */}
        </div>
    );
}

export default DetailQuiz;
