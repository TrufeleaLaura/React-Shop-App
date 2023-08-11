import { useEffect, useState } from "react";
import { useAuth } from "../components/AuthComponent";
import { CheckoutItem } from "../components/CheckoutItem";
import {useDispatch, useSelector} from "react-redux";
import {setCart} from "../redux/cartRedux";
import {useRemoveFromCartMutation, useUpdateCartMutation} from "../redux/apiRedux";



export function CheckoutPage() {
    const { user } = useAuth();
    const cartProducts = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const [updateCart]=useUpdateCartMutation();
    const [removeFromCart]=useRemoveFromCartMutation();
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
            const product = cartProducts.find((product) => product.id === Number(productId));

            if (product.quantity + quantity <= 0) {
                console.log(productId)
               const response=await removeFromCart({token:user,productId:Number(productId)});
                if (response.data) {
                    dispatch(setCart(response.data.data.products));
                }
            } else {
                const response = await updateCart({token:user,product:[{id:Number(productId),quantity:quantity}]
                });
                if (response.data) {
                    dispatch(setCart(response.data.data.products));
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
                    {cartProducts.map((product) => (
                        <CheckoutItem key={product.id} product={product}
                                      onIncrease={() => handleModifyQuantity(product.id, 1)}
                                      onDecrease={() => handleModifyQuantity(product.id, -1)} />
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
