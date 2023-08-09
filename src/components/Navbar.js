import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import logoPicture from "../images/magazine.png";
import './componentsCSS.css';
import {useAuth, useLocalStorage} from "./AuthComponent";
import {useFetchCartProducts} from "./hooksApi";
import CartItemMainPage from "./CartItemMainPage";
import CartBox from "./CartBox";
import {useCart} from "./CartContext";

export function Navbar() {
    const links = ["What's new", "Login", "Cart", "Log Out", "Account"];
    const {user, logout} = useAuth();
    const {cartProducts, setCart} = useCart();
    const [cartItems, setCartItems] = useState([]);
    const [isCartVisible, setCartVisible] = useState(false);

    useEffect(() => {
    }, [useCart]);

    useEffect(() => {
        if (user) {
            fetchProducts();
        }
    }, [user]);


    const handleCartToggle = () => {
        setCartVisible(!isCartVisible);
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/64c77ddd8e88f`, {
                headers: {
                    'Internship-Auth': `${user}`
                }
            });
            const data = await response.json();
            setCart(data.products);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <header className="header">
            <nav className="header__navbar">
                <div className="header__navbar__shop-name">
                    <img src={logoPicture} alt="logo"/>
                    <Link to="/">
                        Meta<span>Shop</span>
                    </Link>
                </div>

                <div className="header__navbar__shop-options">
                    {links.map((link, index) => {
                        let linkPath = '/';
                        if (link === "What's new") {
                            linkPath = '/shop';
                        } else if (link === "Account") {
                            linkPath = '/account';
                        } else if (link === 'Login') {
                            if (!user) {
                                linkPath = '/login';
                            } else {
                                return null;
                            }
                        } else if (link === 'Cart') {
                            return (
                                <CartBox
                                    key={index}
                                    user={user}
                                    cartProducts={cartProducts}
                                />
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