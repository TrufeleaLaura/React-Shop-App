import React, {useEffect, useState} from 'react';
import './pagesCSS.css';
import {useParams} from "react-router-dom";
import {useAuth} from "../components/AuthComponent";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../redux/cartRedux";


function ProductPage() {
    const [isAdded, setIsAdded] = useState(false);
    const { id } = useParams();
    const {user}=useAuth();
    const ID_CART = "64c77ddd8e88f";
    const cartProducts = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);

    const handleAddClick = () => {
        handleAddToCart(product, 1);
        setIsAdded(true);
        setTimeout(() => {
            setIsAdded(false);
        }, 2000);
    };



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
    }, []);

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleAddToCart = async (product, quantity = 1) => {
        try {
            await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${ID_CART}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Internship-Auth': `${user}`,
                },
                body: JSON.stringify({
                    products: [
                        {
                            id: product.id,
                            quantity: quantity,
                        }
                    ]
                })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Request failed with status ${response.status}`);
                    }
                    return response.json();
                })
            dispatch(addToCart(product,quantity));
            console.log(cartProducts);

        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };


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
                {user ? (
                <button className={`product-page__details__add-to-cart-button ${isAdded ? 'added' : ''}`} onClick={handleAddClick}>{isAdded ? 'Added!' : 'Add to Cart'}</button>)
                    : (<Link to="/login">
                        <button className={`product-page__details__add-to-cart-button`}>Login to Add</button>
                    </Link>)}
            </div>
        </div>
    );
}

export default ProductPage;
