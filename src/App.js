import "./App.scss";
import Header from "./components/header/header";
import { BrowserRouter, Routes, Route } from "react-router";
import Admin from "./components/Admin/Admin";
import Users from "./components/Users/Users";
import HomePage from "./components/Home/HomePage";

function App() {
    return (
        <BrowserRouter>
            <div className="app-container">
                <div className="header-container">
                    <Header />
                </div>
                <div className="main-container">
                    <div className="sidenav-container"></div>
                    <div className="app-content">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/users" element={<Users />} />
                            <Route path="/admin" element={<Admin />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
