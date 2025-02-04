import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { toast } from "react-toastify";
import { postLogin } from "../../services/apiServices";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = () => {
        postLogin(email, password)
            .then((res) => {
                if (res && +res.EC === 0) {
                    toast.success(res.EM);
                    navigate("/");
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
                <span>Don't have an account yet?</span>
                <button onClick={() => navigate("/register")}>Sign up</button>
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
                    <label>Password</label>
                    <input
                        value={password}
                        type="password"
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="forgot-password">Forgot password ?</span>
                    <div>
                        <button className="btn-submit" onClick={handleLogin}>
                            Login to HoiDanIT
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

export default Login;
