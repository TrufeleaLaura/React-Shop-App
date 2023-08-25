import React, {useEffect, useState} from "react";
import {useAuth} from "../components/AuthComponent";
import {CheckoutItem} from "../components/CheckoutItem";
import {useDispatch, useSelector} from "react-redux";
import {setCart} from "../redux/cartRedux";
import {useRemoveAllFromCartMutation, useRemoveFromCartMutation, useUpdateCartMutation} from "../redux/apiRedux";
import {useNavigate} from "react-router-dom";
import {Form, Input, Modal, Radio} from "antd";
import axios from "axios";
import {setProducts} from "../redux/productsRedux";
import OrderProducts from "../components/OrderProducts";


export function CheckoutPage() {
    const {user} = useAuth();
    const cartProducts = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [updateCart] = useUpdateCartMutation();
    const [removeFromCart] = useRemoveFromCartMutation();
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


    const handleFullNameChange = (event) => {
        setFullName(event.target.value);
    };

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const handleDeliveryAddressChange = (event) => {
        setDeliveryAddress(event.target.value);
    };

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

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
                    user: user, product: {productId: Number(productId), quantity: quantity}
                });
                if (response.data) {
                    dispatch(setCart(response.data.products));
                }

            }
        } catch (error) {
            console.error('Error modifying product quantity:', error);
        }
    }

    const handleBuyProducts = async (values) => {
        try {
            const response = await axios.post(
                `http://localhost:8080/api/order/${user._id}`,
                {
                    fullName,
                    phoneNumber,
                    address: deliveryAddress,
                    paymentMethod,
                    products: cartProducts,
                    total: totalPrice,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
            if (response.data) {
                alert('Thank you for your order!')
                navigate('/');
                dispatch(setCart(response.data.products));
            }

        } catch (error) {
            if (error.response.data === "Invalid token" || error.response.data === "Unauthorized access") {
                alert("You are not logged in!")
                navigate('/login');
            }
        }
    }

    return (
        <div className="checkout-section">
            <div className="checkout-window">
                <p className="checkout-window-text">Your products added to the shopping cart:</p>
                <div className="checkout-window__grid">
                    {cartProducts.map((product) => (
                        <CheckoutItem
                            key={product.id}
                            product={product}
                            onIncrease={() => handleModifyQuantity(product.productId, 1)}
                            onDecrease={() => handleModifyQuantity(product.productId, -1)}
                        />
                    ))}
                </div>
                <p className="checkout-window-total">Total: ${totalPrice.toFixed(2)}</p>
            </div>
            {cartProducts.length !== 0 && (
                <div className="delivery-info">
                    <Form>
                        <Form.Item
                            label="Full Name"
                            name="fullName"
                            rules={[{required: true, message: 'Please enter your full name'}]}
                        >
                            <Input
                                placeholder="Enter your full name"
                                value={fullName}
                                onChange={handleFullNameChange}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Phone Number"
                            name="phoneNumber"
                            rules={[{required: true, message: 'Please enter your phone number'}]}
                        >
                            <Input
                                placeholder="Enter your phone number"
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Delivery Address"
                            name="deliveryAddress"
                            rules={[{required: true, message: 'Please enter your delivery address'}]}
                        >
                            <Input
                                placeholder="Enter your delivery address"
                                value={deliveryAddress}
                                onChange={handleDeliveryAddressChange}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Payment Method"
                            name="paymentMethod"
                            rules={[{required: true, message: 'Please select a payment method'}]}
                        >
                            <Radio.Group value={paymentMethod} onChange={handlePaymentMethodChange}>
                                <Radio value="cash">Cash on Delivery</Radio>
                                <Radio value="online">Online Payment</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <div className="price-checkout">
                            <button className="checkout-window__button" onClick={handleBuyProducts}>
                                Order Now!
                            </button>
                        </div>
                    </Form>
                </div>

            )}
        </div>
    );

}
