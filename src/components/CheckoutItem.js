import './componentsCSS.css';

export function CheckoutItem({product, onIncrease, onDecrease}) {
    const price = (product.price - (product.price * product.discountPercentage) / 100).toFixed(2);
    return (
        <div className="checkout-window__grid__box-item">
            <img src={product.thumbnail} alt={product.title} className="box-item__image"/>
            <p className="box-item__title">{product.title}</p>
            <p className="box-item__price">${price}</p>
            <div className="quantity buttons_added">
                <input type="button" value="-" className="minus" onClick={onDecrease}/>
                <input type="number" step="1" min="1" max="" value={product.quantity} className="input-text qty text"
                       size="4"/>
                <input type="button" value="+" className="plus" onClick={onIncrease}/>
            </div>
            <p className="box-item__total-price">${(product.quantity * price).toFixed(2)}</p>
        </div>

    );

}