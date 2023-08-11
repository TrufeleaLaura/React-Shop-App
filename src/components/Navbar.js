import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import logoPicture from "../images/magazine.png";
import './componentsCSS.css';
import {useAuth} from "./AuthComponent";
import CartBox from "./CartBox";
import {useDispatch, useSelector} from "react-redux";
import {setCart} from "../redux/cartRedux";
import {useGetCartQuery} from "../redux/apiRedux";

export function Navbar() {
    const links = ["What's new", "Login", "Cart", "Log Out", "Account"];
    const {user, logout} = useAuth();
    const cartProducts = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const { data: cartData, error: cartError } = useGetCartQuery(user);

    useEffect(() => {
        if (user) {
            dispatch(setCart(cartData?.products || []));
        }
    }, [user, cartData, dispatch]);

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
                            if(!user) {
                                linkPath = '/login';
                            } else {
                                return (
                                    <CartBox
                                        key={index}
                                        user={user}
                                        cartProducts={cartProducts}
                                    />
                                );
                            }
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