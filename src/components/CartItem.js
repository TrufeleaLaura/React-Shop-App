import React from "react";

function CartItem({ product }) {
    return (
        <div className="item-box">
            <img src={product.image} alt="Product Image" className="item-box__image" />
            <p className="item-box-title">{product.title}</p>
            <p className="item-box-price">${product.price}</p>
            <p className="item-box-number">x{product.quantity}</p>
            <p className="item-box-total">${product.price * product.quantity}</p>
        </div>
    );
}

export default CartItem;