import VideoHomePage from "../../assets/video-homepage.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

function HomePage() {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    return (
        <div>
            <video autoPlay muted loop>
                <source src={VideoHomePage} />
            </video>
            <div className="homepage-content">
                <div className="title-1">{t("homepage.title1")}</div>
                <div className="title-2">{t("homepage.title2")}</div>
                <div className="title-3">
                    {!isAuthenticated ? (
                        <button onClick={() => navigate("/login")}>
                            {t("homepage.title3.login")}
                        </button>
                    ) : (
                        <button onClick={() => navigate("/users")}>
                            Doing Quiz
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
