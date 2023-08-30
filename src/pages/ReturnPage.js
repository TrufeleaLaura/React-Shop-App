import { useParams } from "react-router-dom";
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

    useEffect(() => {
        axios.get(`http://localhost:8080/api/order/one-order/${user._id}/${orderId}`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        })
            .then(response => {
               // const purchasedProducts= response.data.products.filter(product => product.status === "purchased");
                setOrderProducts(response.data.products);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleReturn = () => {

    };

    return (
        <div className="return-page-container">
            <div className="product-list">
                <div className="product-card-container">
                    {orderProducts.map((product) => (
                        <Card key={product._id} className="product-card" hoverable>
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
