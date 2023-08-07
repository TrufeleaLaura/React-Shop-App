import React from "react";
import logoPicture from "../images/magazine.png";
import './componentsCSS.css';

export function Navbar() {
    const links = ["What's new", "Account", "Cart"];
    return (
            <header className="header">
                <nav className="header__navbar">
                    <div className="header__navbar__shop-name">
                        <img src={logoPicture} alt="logo" />
                        <a href="#">
                            Meta<span>Shop</span>
                        </a>
                    </div>

                    <div className="header__navbar__shop-options">
                        {links.map((link, index) => (
                            <a key={index} href="#">
                                {link}
                            </a>
                        ))}
                    </div>
                </nav>
            </header>
    );
}
