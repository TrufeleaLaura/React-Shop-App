import {useEffect, useState} from "react";
import {useAuth} from "../components/AuthComponent";
import {CheckoutItem} from "../components/CheckoutItem";
import {useDispatch, useSelector} from "react-redux";
import {setCart} from "../redux/cartRedux";
import {useRemoveAllFromCartMutation, useRemoveFromCartMutation, useUpdateCartMutation} from "../redux/apiRedux";
import {useNavigate} from "react-router-dom";


export function CheckoutPage() {
    const {user} = useAuth();
    const cartProducts = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const [updateCart] = useUpdateCartMutation();
    const [removeFromCart] = useRemoveFromCartMutation();
    const [removeAllFromCart] = useRemoveAllFromCartMutation();
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setTotalPrice(
            cartProducts.reduce((acc, product) => {
                const price = (product.price - (product.price * product.discountPercentage) / 100) * product.quantity;
                return acc + price;
            }, 0)
        );
    }, [cartProducts]);

    const handleModifyQuantity = async (productId, quantity) => {
        try {
            const product = cartProducts.find((product) => product.productId === Number(productId));

            if (product.quantity + quantity <= 0) {
                console.log(productId)
                const response = await removeFromCart({user: user, productId: Number(productId)});
                if (response.data) {
                    dispatch(setCart(response.data.products));
                }
            } else {
                const response = await updateCart({
                    user: user,  product: { productId: Number(productId), quantity: quantity }
                });
                if (response.data) {
                    dispatch(setCart(response.data.products));
                }

            }
        } catch (error) {
            console.error('Error modifying product quantity:', error);
        }
    }

    const handleBuyProducts = async () => {
        alert('Thank you for your purchase!');
        const response = await removeAllFromCart({token: user});
        if (response.data) {
            dispatch(setCart(response.data.data.products));
        }
        navigate('/');
    }

    return (
        <div className="checkout-section">
            <div className="checkout-window">
                <p className="checkout-window-text">Your products added to the shopping cart:</p>
                <div className="checkout-window__grid">
                    {cartProducts.map((product) => (
                        <CheckoutItem key={product.id} product={product}
                                      onIncrease={() => handleModifyQuantity(product.productId, 1)}
                                      onDecrease={() => handleModifyQuantity(product.productId, -1)}/>
                    ))}
                </div>
            </div>
            <div className="price-checkout">
                <p className="checkout-window-total">Total: ${totalPrice.toFixed(2)}</p>
                <button className="checkout-window__button" onClick={handleBuyProducts}>Buy Now!</button>
            </div>
        </div>
    );
}
