import React from "react";
import {useNavigate} from "react-router-dom";
import logoPicture from "../images/magazine.png";
import './componentsCSS.css';

export function Navbar() {
    const navigate = useNavigate();
    const links = ["What's new", "Login","Cart"];

    return (
            <header className="header">
                <nav className="header__navbar">
                    <div className="header__navbar__shop-name">
                        <img src={logoPicture} alt="logo" />
                        <a href="/">
                            Meta<span>Shop</span>
                        </a>
                    </div>

                    <div className="header__navbar__shop-options">
                        {links.map((link, index) => (
                            <a href={link === "What's new" ? '/shop' : (link === "Login" ? '/login' : '/')} key={index}>
                                {link}
                            </a>
                        ))}
                    </div>
                </nav>
            </header>
    );
}
