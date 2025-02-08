import { useEffect, useState } from "react";
import Select from "react-select";
import {
    getAllQuizForAdmin,
    getAllUsers,
    postAssignQuiz,
} from "../../../../services/apiServices";
import { toast } from "react-toastify";

function AssignQuiz() {
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState({});

    const [listUser, setListUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});

    useEffect(() => {
        fetchAllQuiz();
        fetchUsers();
    }, []);
    const fetchAllQuiz = () => {
        getAllQuizForAdmin()
            .then((res) => {
                if (res && res.EC === 0) {
                    let newQuiz = res.DT.map((item) => {
                        return {
                            value: item.id,
                            label: `${item.id} - ${item.name}`,
                        };
                    });
                    setListQuiz(newQuiz);
                }
            })
            .catch((error) => {
                console.log("error catch:", error);
            });
    };

    const fetchUsers = () => {
        getAllUsers()
            .then((res) => {
                if (res && res.EC === 0) {
                    let users = res.DT.map((item) => {
                        return {
                            value: item.id,
                            label: `${item.id} - ${item.username} - ${item.email}`,
                        };
                    });
                    setListUser(users);
                }
            })
            .catch((error) => {
                console.log("error catch:", error);
            });
    };

    const handleAssign = () => {
        postAssignQuiz(selectedQuiz.value, selectedUser.value)
            .then((res) => {
                if (res && res.EC === 0) {
                    toast.success(res.EM);
                } else {
                    toast.error(res.EM);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="assign-quiz-container row">
            <div className="col-6 form-group ">
                <label className="mb-2">Select Quiz:</label>
                <Select
                    defaultValue={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                    className="select-quiz"
                />
            </div>
            <div className="col-6 form-group">
                <label className="mb-2">Select User:</label>
                <Select
                    defaultValue={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                    className="select-quiz"
                />
            </div>
            <div>
                <button
                    className="btn btn-warning mt-3"
                    onClick={() => handleAssign()}
                >
                    Assign
                </button>
            </div>
        </div>
    );
}

export default AssignQuiz;
