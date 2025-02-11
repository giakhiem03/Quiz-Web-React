import SideBar from "./Sidebar";
import "./Admin.scss";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import Languages from "../header/Languages";
import NavDropdown from "react-bootstrap/NavDropdown";

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
                    <span onClick={handleSetCollapsed}>
                        <FaBars className="left-side" />
                    </span>
                    <div className="right-side">
                        <Languages />
                        <NavDropdown title="Settings" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.3">
                                Profile
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </div>
                <div className="admin-main">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>
            </div>
        </div>
    );
}

export default Admin;
