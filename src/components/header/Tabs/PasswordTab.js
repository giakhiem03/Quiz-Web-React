import { useState } from "react";
import { postChangePassowrd } from "../../../services/apiServices";
import { toast } from "react-toastify";
function PasswordTab() {
    const [oldPW, setOldPW] = useState("");
    const [newPW, setNewPW] = useState("");

    const handleChangePassword = (e) => {
        e.preventDefault();
        postChangePassowrd(oldPW, newPW)
            .then((res) => {
                if (res && res.EC === 0) {
                    setOldPW("");
                    setNewPW("");
                    toast.success(res.EM);
                } else {
                    toast.error(res.EM);
                }
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    return (
        <>
            <form className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Old Passowd</label>
                    <input
                        value={oldPW}
                        type="password"
                        className="form-control"
                        onChange={(event) => setOldPW(event.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">New Password</label>
                    <input
                        value={newPW}
                        type="password"
                        className="form-control"
                        onChange={(event) => setNewPW(event.target.value)}
                    />
                </div>
                <button
                    className="btn btn-primary"
                    onClick={handleChangePassword}
                >
                    Save
                </button>
            </form>
        </>
    );
}

export default PasswordTab;
