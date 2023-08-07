import { useState, useEffect } from 'react';

const ID_CART = "64c77ddd8e88f";

export const useCartProducts = ({productsAlreadyInPage}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchCartProducts = async () => {
        try {
            const response = await fetch(`https://dummyjson.com/products?limit=9&skip=${productsAlreadyInPage}&select=title,price,description,discountPercentage,rating,stock,brand,category,thumbnail,images,discountedPrice`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const data = await response.json();
            setData(data.products);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchCartProducts();
    }, []);

    return { data };
};


