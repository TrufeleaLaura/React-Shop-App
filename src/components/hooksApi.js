import { useState, useEffect } from 'react';

const ID_CART = "64c77ddd8e88f";

export function useFetchProductsInitial(api = 'https://dummyjson.com/products/?limit=9') {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch(api);
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                setProducts([]);
            }
        }
        fetchProducts();
    }, [api]);

    return [products, setProducts];
}




export async function getProducts(fetchApi) {
    const response = await fetch(fetchApi);
    const productsElements = await response.json();
    return productsElements.products;
}
