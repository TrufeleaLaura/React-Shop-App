import {Link} from "react-router-dom";
import React, {useState} from "react";
import {useAuth} from "./AuthComponent";
import {useSelector} from "react-redux";


export function ProductCard({products, handleAddToCart}) {
    const {user} = useAuth();
    const [addedProducts, setAddedProducts] = useState({});

    const handleAddClick = (product) => {
        handleAddToCart(product, 1);
        setAddedProducts((prevAddedProducts) => {
            return {...prevAddedProducts, [product.id]: true};
        });
        setTimeout(() => {
            setAddedProducts((prevAddedProducts) => {
                return {...prevAddedProducts, [product.id]: false};
            });
        }, 2000);
    };
    return (
        <div className="main">
            <div className="product-grid">
                {products.map((product, index) => (
                    <div className="product-grid__product-card" key={index}>
                        <div className="product-grid__product-card__image-wrapper">
                            <div className="product-grid__product-card__image-wrapper__gallery">
                                <img src={product.thumbnail} alt="Product Image"
                                     className="product-grid__product-card__image-wrapper__image"/>
                                {/*<div className="product-grid__product-card__image-wrapper__arrows">*/}
                                {/*    <span className="arrow left" >&#8249;</span>*/}
                                {/*    <span className="arrow right" >&#8250;</span>*/}
                                {/*</div>*/}
                                <div
                                    className="product-grid__product-card__image-wrapper__discount">-{product.discountPercentage}%
                                </div>
                            </div>
                        </div>
                        <Link to={`/product/${product.id}`} key={index}>
                            <h2 className="product-grid__product-card__title">{product.title}</h2>
                            <div className="product-grid__product-card__prices" style={{color: "black"}}>
                                <p className="product-grid__product-card__price__initial"> ${product.price}</p>
                                <p className="product-grid__product-card__price__final">${(product.price - (product.price * product.discountPercentage / 100).toFixed(2))}</p>
                            </div>
                            <p className="product-grid__product-card__description"
                               style={{color: "black"}}>{product.description}</p>
                            <div className="product-grid__product-card__product-details" style={{color: "black"}}>
                                <div className="brand">Brand: {product.brand}</div>
                                <div className="category">Category: {product.category}</div>
                                <div className="stock">Stock: {product.stock}</div>
                                <div className="rating">Rating:{product.rating}</div>
                            </div>
                        </Link>
                        {user ? (
                            <button
                                className={`product-grid__product-card__add-to-cart-button ${addedProducts[product.id] ? 'added' : ''}`}
                                onClick={() => handleAddClick(product)}
                            >
                                {addedProducts[product.id] ? 'Added!' : 'Add to Cart'}
                            </button>
                        ) : (
                            <Link to="/login">
                                <button className="product-grid__product-card__add-to-cart-button">Add To Cart</button>
                            </Link>
                        )}
                    </div>

                ))}
            </div>
        </div>
    )
}