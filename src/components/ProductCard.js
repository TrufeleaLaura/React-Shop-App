import {Link} from "react-router-dom";

export function ProductCard({products}){
    return (
        <div className="main">
            <div className="product-grid">
                {products.map((product,index) => (
                    <Link to={`/product/${product.id}`} key={index}>
                    <div className="product-grid__product-card" key={index}>
                        <div className="product-grid__product-card__image-wrapper">
                            <div className="product-grid__product-card__image-wrapper__gallery">
                                <img src={product.thumbnail} alt="Product Image" className="product-grid__product-card__image-wrapper__image"/>
                                <div className="product-grid__product-card__image-wrapper__arrows">
                                    <span className="arrow left" >&#8249;</span>
                                    <span className="arrow right" >&#8250;</span>
                                </div>
                                <div className="product-grid__product-card__image-wrapper__discount">-{product.discountPercentage}%</div>
                            </div>
                        </div>
                        <h2 className="product-grid__product-card__title">{product.title}</h2>
                        <div className="product-grid__product-card__prices">
                            <p className="product-grid__product-card__price__initial"> ${product.price}</p>
                            <p className="product-grid__product-card__price__final">${(product.price - (product.price * product.discountPercentage / 100).toFixed(2))}</p>
                        </div>
                        <p className="product-grid__product-card__description">{product.description}</p>
                        <div className="product-grid__product-card__product-details">
                            <div className="brand">Brand: {product.brand}</div>
                            <div className="category">Category: {product.category}</div>
                            <div className="stock">Stock: {product.stock}</div>
                            <div className="rating">Rating:{product.rating}</div>
                        </div>
                        <button className="product-grid__product-card__add-to-cart-button">Add to Cart</button>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}