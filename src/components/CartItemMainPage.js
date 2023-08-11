import React from "react";
import "./componentsCSS.css";

function CartItemMainPage({product}) {
    return (
        <div className="item-box">
            <img src={product.thumbnail} alt="Product Image" className="item-box__image"/>
            <p className="item-box-title">{product.title}</p>
            <p className="item-box-price">${product.price}</p>
            <p className="item-box-number">x{product.quantity}</p>
            <p className="item-box-total">${product.price * product.quantity}</p>
        </div>
    );
}

export default CartItemMainPage;