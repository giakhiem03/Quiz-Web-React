function TableQuiz({ listQuiz, handleShowDeleteQuiz, handleClickBtnUpdate }) {
    return (
        <>
            <div>List Quizzes:</div>
            <table className="table table-hover table-bordered my-2">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz &&
                        listQuiz.length > 0 &&
                        listQuiz.map((quiz, index) => (
                            <tr key={index}>
                                <td>{quiz.id}</td>
                                <td>{quiz.name}</td>
                                <td>{quiz.description}</td>
                                <td>{quiz.difficulty}</td>
                                <td style={{ display: "flex", gap: "15px" }}>
                                    <button
                                        className="btn btn-warning"
                                        onClick={() =>
                                            handleClickBtnUpdate(quiz)
                                        }
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            handleShowDeleteQuiz(quiz)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
}

export default TableQuiz;
