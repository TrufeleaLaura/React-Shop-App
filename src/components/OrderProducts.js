import {useEffect, useState} from "react";
import axios from "axios";
import {Table} from "antd";

export default function OrderProducts({orderId}) {
    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Product Price',
            dataIndex: 'discountedPrice',
            key: 'price',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        }
        ,
        {
            title: 'Total Price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
        }
    ]
    const [orderProducts, setOrderProducts] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8080/api/order/${orderId}`)
            .then(response => {
                    setOrderProducts(response.data);
                }
            ).catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <Table columns={columns} dataSource={orderProducts}/>
    )
}