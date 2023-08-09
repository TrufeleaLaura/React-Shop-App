import {useFetchCartProducts} from "../components/hooksApi";
import {useAuth} from "../components/AuthComponent";
import {CheckoutItem} from "../components/CheckoutItem";
import {useEffect, useState} from "react";

export function CheckoutPage() {
    const {user} = useAuth();
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const ID_CART = "64c77ddd8e88f";

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch(`https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${ID_CART}`, {
                    headers: {
                        'Internship-Auth': `${user}`
                    }
                });
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                setProducts([]);
            }
        }

        fetchProducts();
    }, [user]);

    useEffect(() => {
        const total = products.reduce((acc, product) => {
            const price = (product.price - (product.price * product.discountPercentage) / 100);
            return acc + price;
        }, 0);
        setTotalPrice(total);
    }, [products]);

    const handleModifyQuantity = async (productId, quantity) => {
        const product = products.find((product) => product.id === Number(productId));
        try {
            if (product.quantity + quantity <= 0) {
                const response = await fetch(`http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${ID_CART}?products[]=${productId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Internship-Auth': `${user}`
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data.data.products);
                    const total = data.data.products.reduce((acc, product) => {
                        const price = (product.price - (product.price * product.discountPercentage) / 100);
                        return acc + price * product.quantity;
                    }, 0);
                    setTotalPrice(total);
                } else {
                    const response = await fetch(`http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/64c77ddd8e88f`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Internship-Auth': `${user}`
                        },
                        body: JSON.stringify({
                            products: [
                                {
                                    id: productId,
                                    quantity: quantity
                                }
                            ]
                        })
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setProducts(data.data.products);
                        const total = data.data.products.reduce((acc, product) => {
                            const price = (product.price - (product.price * product.discountPercentage) / 100);
                            return acc + price * product.quantity;
                        }, 0);
                        setTotalPrice(total);
                    }
                }
            }
        } catch (error) {
            console.error('Error modifying product quantity:', error);
        }
    }

    return (
        <div className="checkout-section">
            <div className="checkout-window">
                <p className="checkout-window-text">Your products added to the shopping cart:</p>
                <div className="checkout-window__grid">
                    {products.map((product) => (
                        <CheckoutItem key={product.id} product={product}
                                      onIncrease={() => handleModifyQuantity(product.id, 1)}
                                      onDecrease={() => handleModifyQuantity(product.id, -1)}/>
                    ))}
                </div>
            </div>
            <div className="price-checkout">
                <p className="checkout-window-total">Total: ${totalPrice.toFixed(2)}</p>
                <button className="checkout-window__button">Buy Now!</button>
            </div>
        </div>
    );
}
