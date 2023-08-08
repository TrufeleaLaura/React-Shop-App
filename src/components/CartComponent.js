import React, { useState } from 'react';
import './Cart.css';
import {useFetchCartProducts} from "./hooksApi";
import CartItem from "./CartItem";
import {useAuth} from "./AuthComponent";

function Cart() {
    const {user}=useAuth();
    const [isCartVisible, setCartVisible] = useState(false);
    const [cartProducts, setCartProducts] = useFetchCartProducts(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/64c77ddd8e88f`,
        {
        'Internship-Auth': `${user}`
    });

    const handleCartToggle = () => {
        setCartVisible(!isCartVisible);
    };

    return (
        <div className="cart">
            <button
                id="cart"
                className="cart-button"
                onMouseOver={handleCartToggle}
                onMouseOut={handleCartToggle}
                //onClick={() => window.location.href = "checkoutPage.html"}
            >
                Cart: ({cartProducts.length})
            </button>
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
        </div>
    );
}

export default Cart;
