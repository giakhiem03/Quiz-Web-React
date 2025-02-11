import { useState } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation } from "react-i18next";

function Languages() {
    const { t, i18n } = useTranslation();

    const handleChangeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    return (
        <>
            <NavDropdown
                className="languages"
                title={i18n.language === "vi" ? "Việt Nam" : "English"}
                id="basic-nav-dropdown"
            >
                <NavDropdown.Item onClick={() => handleChangeLanguage("en")}>
                    EngLish
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleChangeLanguage("vi")}>
                    Việt Nam
                </NavDropdown.Item>
            </NavDropdown>
        </>
    );
}

export default Languages;
