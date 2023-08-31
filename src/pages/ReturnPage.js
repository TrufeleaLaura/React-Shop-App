import {useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../components/AuthComponent";
import axios from "axios";
import { Input, Button, Card } from "antd";
import "./pagesCSS.css";

export function ReturnPage() {
    const { orderId } = useParams();
    const { user } = useAuth();
    const [orderProducts, setOrderProducts] = useState([]);
    const [returnReason, setReturnReason] = useState("");
    const [selectedProducts, setSelectedProducts] = useState(["initial"]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/order/one-order/${user._id}/${orderId}`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        })
            .then(response => {
                setOrderProducts(response.data.products.filter(product => product.status === "Purchased"));
                setSelectedProducts(["initial"])
            })
            .catch(error => {
                console.log(error);
            });

    }, []);

    const handleReturn = () => {
        //something is not ok with the request on the backend
        axios.post(`http://localhost:8080/api/order/return/${user._id}/${orderId}`, {
            productsIds: selectedProducts,
            returnReason: returnReason},{
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        }).then(
            response => {
                alert("Products returned successfully!")
                navigate("/order");
            }
        )

    };

    useEffect(() => {
        if(selectedProducts.includes("initial")){
            setSelectedProducts([]);
        }
    }, [selectedProducts])

    const handleSelect = (product) => {
        if(selectedProducts.includes("initial")){
            setSelectedProducts([product.productId]);
        }
        if (selectedProducts.includes(product.productId)) {
            setSelectedProducts(selectedProducts.filter(item => item !== product.productId));
        } else {
            setSelectedProducts([...selectedProducts, product.productId]);
        }
    }

    return (
        <div className="return-page-container">
            <div className="product-list">
                <div className="product-card-container">
                    {orderProducts.map((product) => (
                        <Card key={product._id} className={`product-card ${selectedProducts.includes(product.productId) ? 'selected' : ''}`}
                              hoverable onClick={() => handleSelect(product)}>
                            <img src={product.thumbnail} alt={product.title} />
                            <h3>{product.title}</h3>
                        </Card>
                    ))}
                </div>
            </div>
            <div className="return-form">
                <h2>Write here why you are returning these products...</h2>
                <Input.TextArea
                    value={returnReason}
                    onChange={(e) => setReturnReason(e.target.value)}
                />
                <Button className="submit-button" onClick={handleReturn}>Return Products</Button>
            </div>
        </div>
    );
}
