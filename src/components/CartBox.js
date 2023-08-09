import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import CartItemMainPage from "./CartItemMainPage";

const CartBox = ({ user, cartProducts }) => {
    const [isCartVisible, setCartVisible] = useState(false);

    const handleCartToggle = () => {
        setCartVisible(!isCartVisible);
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
                                <CartItemMainPage key={item.id} product={item} />
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </>
    ) : (
        "Cart:(0)"
    );

    return (
        <div className="cart-container">
            {user ? (
                <Link
                    to="/cart"
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
};

export default CartBox;
