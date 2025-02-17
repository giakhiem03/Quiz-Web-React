import "./App.scss";
import Header from "./components/header/header";
import { Outlet } from "react-router";
import PerfectScrollbar from "react-perfect-scrollbar";

function App() {
    return (
        <div className="app-container">
            <div className="header-container">
                <Header />
            </div>
            <div className="main-container">
                <div className="sidenav-container"></div>
                <div className="app-content">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>
            </div>
        </div>
    );
}

export default App;
