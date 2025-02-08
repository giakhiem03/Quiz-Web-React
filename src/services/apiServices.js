import axios from "../utils/axiosCustomize";

const postCreateUser = (email, password, username, role, image) => {
    const form = new FormData();
    form.append("email", email);
    form.append("password", password);
    form.append("username", username);
    form.append("role", role);
    form.append("userImage", image);
    return axios.post("api/v1/participant", form);
};

const getAllUsers = () => {
    return axios.get("api/v1/participant/all");
};

const putUpdateUser = (id, username, role, image) => {
    const form = new FormData();
    form.append("id", id);
    form.append("username", username);
    form.append("role", role);
    form.append("userImage", image);
    return axios.put("api/v1/participant", form);
};

const deleteUser = (userId) => {
    return axios.delete("api/v1/participant", { data: { id: userId } });
};

const getUserWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

const postLogin = (email, password) => {
    return axios.post("api/v1/login", { email, password });
};

const postRegister = (email, username, password) => {
    return axios.post("api/v1/register", { email, username, password });
};

const getQuizByUser = () => {
    return axios.get("api/v1/quiz-by-participant");
};

const getQuizById = (id) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
};

const postAnswers = (data) => {
    return axios.post("api/v1/quiz-submit", { ...data });
};

const postCreateNewQuiz = (description, name, difficulty, image) => {
    const form = new FormData();
    form.append("description", description);
    form.append("name", name);
    form.append("difficulty", difficulty);
    form.append("quizImage", image);
    return axios.post("api/v1/quiz", form);
};

const getAllQuizForAdmin = () => {
    return axios.get("api/v1/quiz/all");
};

const deleteQuizForAdmin = (id) => {
    return axios.delete(`api/v1/quiz/${id}`);
};

const putQuizForAdmin = (id, description, name, difficulty, quizImage) => {
    const form = new FormData();
    form.append("id", id);
    form.append("description", description);
    form.append("name", name);
    form.append("difficulty", difficulty);
    form.append("quizImage", quizImage);
    return axios.put(`api/v1/quiz`, form);
};

const postCreateNewQuestionForQuiz = (quizId, description, image) => {
    const form = new FormData();
    form.append("quiz_id", quizId);
    form.append("description", description);
    form.append("questionImage", image);
    return axios.post("api/v1/question", form);
};

const postCreateNewAnswerForQuestion = (
    description,
    correct_answer,
    question_id
) => {
    return axios.post("api/v1/answer", {
        description,
        correct_answer,
        question_id,
    });
};

export {
    postCreateUser,
    getAllUsers,
    putUpdateUser,
    deleteUser,
    getUserWithPaginate,
    postLogin,
    postRegister,
    getQuizByUser,
    getQuizById,
    postAnswers,
    postCreateNewQuiz,
    getAllQuizForAdmin,
    deleteQuizForAdmin,
    putQuizForAdmin,
    postCreateNewQuestionForQuiz,
    postCreateNewAnswerForQuestion,
};
