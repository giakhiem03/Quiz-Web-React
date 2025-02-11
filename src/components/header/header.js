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

function Header() {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const account = useSelector((state) => state.user.account);
    const dispatch = useDispatch();

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
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <NavLink className="navbar-brand" to="/">
                    GiaKhiem
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink className="nav-link" to="/">
                            Home
                        </NavLink>
                        <NavLink className="nav-link" to="/users">
                            Users
                        </NavLink>
                        <NavLink className="nav-link" to="/admins">
                            Admin
                        </NavLink>
                    </Nav>
                    <Nav>
                        {!isAuthenticated ? (
                            <>
                                <button
                                    className="btn-login"
                                    onClick={handleLogin}
                                >
                                    Log in
                                </button>
                                <button
                                    className="btn-signup"
                                    onClick={handleRegister}
                                >
                                    Sign up
                                </button>
                            </>
                        ) : (
                            <NavDropdown
                                title="Settings"
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item href="#action/3.3">
                                    Profile
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    href="#action/3.2"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                        <Languages />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
