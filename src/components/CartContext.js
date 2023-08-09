import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartProducts, setCartProducts] = useState([]);

    const addToCart = (product, quantity) => {
        console.log(product);
        const existingProduct = cartProducts.find(item => item.id === product.id);

        if (!existingProduct) {
            setCartProducts([...cartProducts, { ...product, quantity: quantity }]);
        } else {
            const updatedProducts = cartProducts.map(item => {
                if (item.id === existingProduct.id) {
                    return { ...item, quantity: item.quantity + quantity };
                }
                return item;
            });
            setCartProducts(updatedProducts);
        }
    };



    const setCart = (products) => {
        console.log(products);
        setCartProducts(products);
    }

    const removeFromCart = (productId) => {
        const updatedProducts = cartProducts.reduce((acc, item) => {
            if (item.id === productId) {
                if (item.quantity === 1) {
                    return acc;
                }
                return [...acc, { ...item, quantity: item.quantity - 1 }];
            }
            return [...acc, item];
        }, []);
        setCartProducts(updatedProducts);

    };

    const clearCart = () => {
        setCartProducts([]);
    };

    return (
        <CartContext.Provider value={{ cartProducts, addToCart, removeFromCart, clearCart, setCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
