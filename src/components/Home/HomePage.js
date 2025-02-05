import VideoHomePage from "../../assets/video-homepage.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    const navigate = useNavigate();

    return (
        <div>
            <video autoPlay muted loop>
                <source src={VideoHomePage} />
            </video>
            <div className="homepage-content">
                <div className="title-1">There's the best way to ask</div>
                <div className="title-2">
                    Body of There's the best way to ask Body of There's the best
                    way to ask Body of There's the best way to ask
                </div>
                <div className="title-3">
                    {!isAuthenticated ? (
                        <button onClick={() => navigate("/login")}>
                            Get's started. It's free
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
