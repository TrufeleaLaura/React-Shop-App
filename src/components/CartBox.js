import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import CartItemMainPage from "./CartItemMainPage";

const CartBox = ({user, cartProducts}) => {
    const [isCartVisible, setCartVisible] = useState(false);
    const [cartLeaveTimeout, setCartLeaveTimeout] = useState(null);

    useEffect(() => {
        if (cartProducts.length === 0) {
            setCartVisible(false);
        }
    }, [cartProducts]);

    const handleCartToggle = () => {
        clearTimeout(cartLeaveTimeout);
        setCartVisible(!isCartVisible);
    };

    const handleMouseEnter = () => {
        clearTimeout(cartLeaveTimeout);
        setCartVisible(true);
    };

    const handleMouseLeave = () => {
        const timeoutId = setTimeout(() => {
            setCartVisible(false);
        }, 150);
        setCartLeaveTimeout(timeoutId);
    };

    const cartLinkContent = user ? (
        <div
            className="cart-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            Cart: ({cartProducts.length})
            {isCartVisible && (
                <div className="cart-window">
                    {cartProducts.length === 0 ? (
                        <p className="empty-cart">YOUR CART IS EMPTY</p>
                    ) : (
                        <ul className="cart-window-list">
                            {cartProducts.map((item) => (
                                <CartItemMainPage key={item.id} product={item}/>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    ) : (
        "Cart:(0)"
    );

    return (
        <div className="cart-link">
            {user ? (
                <Link to="/cart" onClick={handleCartToggle}>
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
