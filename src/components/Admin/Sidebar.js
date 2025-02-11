import "react-pro-sidebar/dist/css/styles.css";
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from "react-pro-sidebar";
import { FaReact, FaConnectdevelop } from "react-icons/fa";
import "./SideBar.scss";
import { FaTachometerAlt, FaGem } from "react-icons/fa";
import sidebarBg from "../../assets/bg2.png";
import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function SideBar({ collapsed, toggled, handleToggleSidebar }) {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    // {t("register.goHomePage")}
    return (
        <>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "24px",
                            textTransform: "uppercase",
                            fontWeight: "bold",
                            fontSize: 14,
                            letterSpacing: "1px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            cursor: "pointer",
                        }}
                        onClick={() => navigate("/", { replace: true })}
                    >
                        <FaReact
                            size={"3em"}
                            color="#00bfff"
                            style={{ marginRight: "10px" }}
                        ></FaReact>
                        Hoi Dan IT
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaTachometerAlt />}
                            // suffix={<span className="badge red">New</span>}
                        >
                            <Link to={"/admins"}>{t("sidebar.dashboard")}</Link>
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            // suffix={<span className="badge yellow">3</span>}
                            icon={<FaGem />}
                            title={t("sidebar.features")}
                        >
                            <MenuItem>
                                <Link to={"/admins/manage-users"}>
                                    {t("sidebar.manageUsers")}
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to={"/admins/manage-quizzes"}>
                                    {t("sidebar.manageQuiz")}
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to={"/admins/manage-questions"}>
                                    {t("sidebar.manageQuestion")}
                                </Link>
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: "center" }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: "20px 24px",
                        }}
                    >
                        <a
                            href="https://github.com/azouaoui-med/react-pro-sidebar"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaConnectdevelop />
                            <span
                                style={{
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                }}
                            >
                                Hỏi Dân IT
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    );
}

export default memo(SideBar);
