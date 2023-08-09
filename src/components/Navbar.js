import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import logoPicture from "../images/magazine.png";
import './componentsCSS.css';
import { useAuth } from "./AuthComponent";
import {useFetchCartProducts} from "./hooksApi";
import CartItem from "./CartItem";

export function Navbar() {
    const links = ["What's new", "Login", "Cart", "Log Out"];
    const { user, logout } = useAuth();
    const [isCartVisible, setCartVisible] = useState(false);
    const [cartProducts, setCartProducts] = useState([]);


    const handleCartToggle = () => {
        setCartVisible(!isCartVisible);
    };

    useEffect(() => {
        if (user) {
            fetchProducts();
        }
    }, [user]);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/64c77ddd8e88f`, {
                headers: {
                    'Internship-Auth': `${user}`
                }
            });
            const data = await response.json();
            setCartProducts(data.products);
        } catch (error) {
            setCartProducts([]);
        }
    };

    const cartLinkContent = user ? (
        <>
            Cart: ({cartProducts.length})
            {isCartVisible && (
                <div className="cart-window">
                    {cartProducts.length === 0 ? (
                        <p className="empty-cart">YOUR CART IS EMPTY</p>
                    ) : (
                        <ul className="cart-window-list">
                            {cartProducts.map((item) => (
                                <CartItem key={item.id} product={item} />
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </>
    ) : (
        'Cart:(0)'
    );
    return (
        <header className="header">
            <nav className="header__navbar">
                <div className="header__navbar__shop-name">
                    <img src={logoPicture} alt="logo" />
                    <Link to="/">
                        Meta<span>Shop</span>
                    </Link>
                </div>

                <div className="header__navbar__shop-options">
                    {links.map((link, index) => {
                        let linkPath = '/';
                        if (link === "What's new") {
                            linkPath = '/shop';
                        } else if (link === 'Login') {
                            if (!user) {
                                linkPath = '/login';
                            } else {
                                return null;
                            }
                        } else if (link === 'Cart') {
                            return (
                                <div key={index} className="cart-container">
                                    {user ? (
                                        <Link
                                            to="/cart"
                                            className="cart-link"
                                            onMouseEnter={handleCartToggle}
                                            onMouseLeave={handleCartToggle}
                                        >
                                            {cartLinkContent}
                                        </Link>
                                    ) : (
                                        <Link to="/login" className="cart-link">
                                            {cartLinkContent}
                                        </Link>
                                    )}
                                </div>
                            );
                        } else if (link === 'Log Out') {
                            if (user) {
                                return (
                                    <Link to={linkPath} key={index} onClick={logout}>
                                        {link}
                                    </Link>
                                );
                            } else {
                                return null;
                            }
                        }

                        return (
                            <Link to={linkPath} key={index}>
                                {link}
                            </Link>
                        );
                    })}

                </div>
            </nav>
        </header>
    );
}