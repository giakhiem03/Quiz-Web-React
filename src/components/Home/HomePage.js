import VideoHomePage from "../../assets/video-homepage.mp4";
function HomePage() {
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
                    <button>Get's started. It's free</button>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
