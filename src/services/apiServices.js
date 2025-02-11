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

const postAssignQuiz = (quizId, userId) => {
    return axios.post("api/v1/quiz-assign-to-user", { quizId, userId });
};

const getQuizWithQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`);
};

const postUpsertQA = (data) => {
    return axios.post(`api/v1/quiz-upsert-qa`, { ...data });
};

const logout = (email, refresh_token) => {
    return axios.post(`api/v1/logout`, { email, refresh_token });
};

const getOverview = () => {
    return axios.get(`api/v1/overview`);
};

const putUpdateProfile = (username, userImage) => {
    const form = new FormData();
    form.append("username", username);
    form.append("userImage", userImage);
    return axios.post(`api/v1/profile`, form);
};

const postChangePassowrd = (current_password, new_password) => {
    return axios.post(`api/v1/change-password`, {
        current_password,
        new_password,
    });
};

const getHistory = () => {
    return axios.get(`api/v1/history`);
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
    postAssignQuiz,
    getQuizWithQA,
    postUpsertQA,
    logout,
    getOverview,
    putUpdateProfile,
    postChangePassowrd,
    getHistory,
};
