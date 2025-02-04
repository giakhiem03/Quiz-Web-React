import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import { toast } from "react-toastify";
import { postRegister } from "../../services/apiServices";
import { BiHide, BiShow } from "react-icons/bi";

function Register() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const handleShowHidePassword = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate();

    const handleLogin = () => {
        postRegister(email, username, password)
            .then((res) => {
                if (res && +res.EC === 0) {
                    toast.success(res.EM);
                    navigate("/login");
                }
                if (res && +res.EC !== 0) {
                    toast.error(res.EM);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="login-container">
            <div className="header">
                <span>Already have an account?</span>
                <button onClick={() => navigate("/login")}>Sign in</button>
            </div>
            <div className="title col-4 mx-auto">Huynh Gia Khiem</div>
            <div className="welcome col-4 mx-auto">Hello, who's this?</div>
            <div className="content-form col-4 mx-auto">
                <div className="form-group">
                    <label>Email</label>
                    <input
                        value={email}
                        type="email"
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Username</label>
                    <input
                        value={username}
                        type="text"
                        className="form-control"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <div className="position-relative">
                        <label>Password</label>
                        {showPassword ? (
                            <>
                                <input
                                    value={password}
                                    type="text"
                                    className="form-control"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />

                                <BiShow
                                    className="icons-show-hide-password"
                                    onClick={handleShowHidePassword}
                                />
                            </>
                        ) : (
                            <>
                                <input
                                    value={password}
                                    type="password"
                                    className="form-control"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <BiHide
                                    className="icons-show-hide-password"
                                    onClick={handleShowHidePassword}
                                />
                            </>
                        )}
                    </div>

                    <div>
                        <button className="btn-submit" onClick={handleLogin}>
                            Register to HoiDanIT
                        </button>
                    </div>
                    <div className="text-center">
                        <span
                            className="back"
                            onClick={() => navigate("/", { replace: true })}
                        >
                            &lt;&lt; Go to HomePage
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
