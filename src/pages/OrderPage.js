import {useEffect, useState} from "react";
import {useAuth} from "../components/AuthComponent";
import {Button, Table} from "antd";
import axios from "axios";

export default function OrderPage() {
    const [order, setOrder] = useState([]);
    const {user} = useAuth();
    const columns= [
        {
            title: 'Order ID',
            dataIndex:'_id',
            key:'_id',
        },
        {
            title: 'Order Date',
            dataIndex:'date',
            key:'date',
        },
        {
            title: 'Total Price',
            dataIndex:'total',
            key:'total',
        },
        {
            title:'Payment Method',
            dataIndex:'paymentMethod',
            key:'paymentMethod',
        },
        {
            title:'Status',
            dataIndex:'deliveryStatus',
            key:'deliveryStatus',
        },
        {
            title:'Address',
            dataIndex:'address',
            key:'address',
        },
        {
            title: "Products",
            key: "actions",
            "render": (text, record) => (
                <div>

                    <Button
                        type="link"
                        style={{ color: "midnightblue", borderColor: "midnightblue" }}
                        //onClick={() => handleDelete(record)}
                    >
                        Click for Products
                    </Button>
                </div>
            ),
        },
        ]
    useEffect(() => {
        axios.get(`http://localhost:8080/api/order/all-orders/${user._id}`,
            {headers: {Authorization: `Bearer ${user.token}`}})
            .then(response => {
                setOrder(response.data);}
            ).catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <Table style={{ marginTop: '8rem' }} columns={columns} dataSource={order} rowKey={record => record._id} />
    );


}
