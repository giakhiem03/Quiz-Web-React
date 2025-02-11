import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { toast } from "react-toastify";
import { postLogin } from "../../services/apiServices";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { ImSpinner9 } from "react-icons/im";
import Languages from "../header/Languages";
import { useTranslation } from "react-i18next";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { t, i18n } = useTranslation();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = () => {
        if (!password) {
            toast.error("Invalid password");
            return;
        }

        setIsLoading(true);

        postLogin(email, password)
            .then((res) => {
                if (res && +res.EC === 0) {
                    dispatch(doLogin(res));
                    toast.success(res.EM);
                    setIsLoading(false);
                    navigate("/");
                }
                if (res && +res.EC !== 0) {
                    setIsLoading(false);
                    toast.error(res.EM);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleKeyDown = (event) => {
        if (event && event.key === "Enter") {
            handleLogin();
        }
    };

    return (
        <div className="login-container">
            <div className="header">
                <span>{t("login.question")}</span>
                <button onClick={() => navigate("/register")}>
                    {t("login.signup")}
                </button>
                <Languages />
            </div>
            <div className="title col-4 mx-auto">Huynh Gia Khiem</div>
            <div className="welcome col-4 mx-auto">{t("login.hello")}</div>
            <div className="content-form col-4 mx-auto">
                <div className="form-group">
                    <label>{t("login.email")}</label>
                    <input
                        value={email}
                        type="email"
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>{t("login.password")}</label>
                    <input
                        value={password}
                        type="password"
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e)}
                    />
                    <span className="forgot-password">
                        {t("login.forgotPW")}
                    </span>
                    <div>
                        <button
                            className="btn-submit"
                            onClick={handleLogin}
                            disabled={isLoading}
                        >
                            {isLoading && (
                                <ImSpinner9 className="loaderIcons" />
                            )}
                            {t("login.login")}
                        </button>
                    </div>
                    <div className="text-center">
                        <span
                            className="back"
                            onClick={() => navigate("/", { replace: true })}
                        >
                            &lt;&lt; {t("login.goHomePage")}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
