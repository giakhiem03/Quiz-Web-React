import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/apiServices";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";
import Languages from "./Languages";
import { useTranslation } from "react-i18next";
import { FaReact } from "react-icons/fa";
import Profile from "./Profile";
import { useState } from "react";

function Header() {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const account = useSelector((state) => state.user.account);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [showModalProfile, setShowModalProfile] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login", { replace: true });
    };

    const handleRegister = () => {
        navigate("/register", { replace: true });
    };

    const handleLogout = () => {
        logout(account.email, account.refresh_token)
            .then((res) => {
                if (res && res.EC === 0) {
                    dispatch(doLogout());
                    navigate("/login");
                    toast.success(res.EM);
                } else {
                    toast.error(res.EM);
                }
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <NavLink className="navbar-brand" to="/">
                        <FaReact className="brand-icon" />
                        GiaKhiem
                    </NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className="nav-link" to="/">
                                {t("header.home")}
                            </NavLink>
                            <NavLink className="nav-link" to="/users">
                                {t("header.users")}
                            </NavLink>
                            <NavLink className="nav-link" to="/admins">
                                {t("header.admin")}
                            </NavLink>
                        </Nav>
                        <Nav>
                            {!isAuthenticated ? (
                                <>
                                    <button
                                        className="btn-login"
                                        onClick={handleLogin}
                                    >
                                        {t("header.nav.login")}
                                    </button>
                                    <button
                                        className="btn-signup"
                                        onClick={handleRegister}
                                    >
                                        {t("header.nav.signup")}
                                    </button>
                                </>
                            ) : (
                                <NavDropdown
                                    title={t("header.nav.settings")}
                                    id="basic-nav-dropdown"
                                >
                                    <NavDropdown.Item
                                        onClick={() =>
                                            setShowModalProfile(true)
                                        }
                                    >
                                        {t("header.nav.profile")}
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        href="#action/3.2"
                                        onClick={handleLogout}
                                    >
                                        {t("header.nav.logout")}
                                    </NavDropdown.Item>
                                </NavDropdown>
                            )}
                            <Languages />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Profile
                showModalProfile={showModalProfile}
                setShowModalProfile={setShowModalProfile}
            />
        </>
    );
}

export default Header;
