import SideBar from "./Sidebar";
import "./Admin.scss";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { Outlet } from "react-router-dom";

function Admin() {
    const [collapsed, setCollapsed] = useState(false);
    const handleSetCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed}></SideBar>
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <FaBars onClick={handleSetCollapsed} />
                </div>
                <div className="admin-main">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Admin;
