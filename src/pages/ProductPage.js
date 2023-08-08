import React, {useEffect, useState} from 'react';
import './pagesCSS.css';
import {useParams} from "react-router-dom";


function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    async function fetchData() {
        try {
            const response = await fetch(`https://dummyjson.com/products/${id}`);
            const data = await response.json();
            setProduct(data);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-page">
            <div className="product-page__image">
                <img src={product.thumbnail} alt="Product"/>
            </div>
            <div className="product-page__details">
                <h2 className="product-page__details__title">{product.title}</h2>
                <div className="product-page__details__prices">
                    <p className="product-page__details__price__initial">${product.price}</p>
                    <p className="product-page__details__price__final">
                        ${(
                        product.price -
                        (product.price * product.discountPercentage) / 100
                    ).toFixed(2)}
                    </p>
                </div>
                <p className="product-page__details__description">{product.description}</p>
                <div className="product-page__details__product-details">
                    <div className="product-page__details__detail">Brand: {product.brand}</div>
                    <div className="product-page__details__detail">
                        Category: {product.category}
                    </div>
                    <div className="product-page__details__detail">Stock: {product.stock}</div>
                    <div className="product-page__details__detail">Rating: {product.rating}</div>
                </div>
                <button className="product-page__details__add-to-cart-button">Add to Cart</button>
            </div>
        </div>
    );
}

export default ProductPage;
