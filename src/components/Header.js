import React from "react";
import headerLogo from "../images/header-logo.svg";

function Header() {
    return (
        <header className="header">
            <img src={headerLogo} className="header__logo" alt="Место Россия"/>
        </header>
    )
}

export default Header;