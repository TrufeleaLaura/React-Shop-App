import React, {useEffect, useState} from "react";
import {useAuth} from "../components/AuthComponent";
import {Button, Modal, Table} from "antd";
import axios from "axios";
import OrderProducts from "../components/OrderProducts";
import {useNavigate} from "react-router-dom";

export default function OrderPage() {
    const [order, setOrder] = useState([]);
    const {user} = useAuth();
    const [orderProducts, setOrderProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState('');
    const navigate = useNavigate();
    const columnsProducts = [
        {
            title: 'Product Name',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Product Price',
            dataIndex: 'price',
            key: 'price',
        },

        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Discounted Price',
            dataIndex: 'discountPercentage',
            key: 'discountPercentage',
        },
        {
            title: 'Total Price',
            dataIndex: 'discountedPrice',
            key: 'discountedPrice',
        }
    ]

    const columns = [
        {
            title: 'Order ID',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Order Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Total Price',
            dataIndex: 'total',
            key: 'total',
        },
        {
            title: 'Payment Method',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
        },
        {
            title: 'Status',
            dataIndex: 'deliveryStatus',
            key: 'deliveryStatus',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: "Products",
            key: "actions",
            "render": (text, record) => (
                <div>
                    <Button
                        type="link"
                        style={{color: "midnightblue", borderColor: "midnightblue"}}
                        onClick={() => handleShowModal(record)}
                    >
                        Click for Products
                    </Button>
                </div>
            ),
        },
    ]
    const handleShowModal = async (record) => {
        setSelectedOrder(record._id);
        console.log(selectedOrder)
        console.log(selectedOrder)
        const response = await axios.get(`http://localhost:8080/api/order/${selectedOrder}`);
        if (response.data) {
            console.log(response.data)
            const products = [...response.data.products];
            console.log("aici" + products)
            setOrderProducts(response.data.products);
            setIsModalOpen(true);
            console.log(response.data)
        }

    }
    const handleCloseModal = () => {
        setIsModalOpen(false);
    }
    useEffect(() => {
        axios.get(`http://localhost:8080/api/order/all-orders/${user._id}`,
            {headers: {Authorization: `Bearer ${user.token}`}})
            .then(response => {
                    setOrder(response.data);
                }
            ).catch(error => {
            if (error.response.message === "Invalid token" || error.response.message === "Unauthorized access") {
                alert("You are not logged in!")
                navigate('/login');
            }
            console.log(error);
        });
    }, []);

    return (
        <>
            <Table style={{marginTop: '8rem'}} columns={columns} dataSource={order} rowKey={record => record._id}/>
            <Modal
                visible={isModalOpen}
                onOk={handleCloseModal}
                onCancel={handleCloseModal}
            >
                <Table
                    columns={columnsProducts}
                    dataSource={orderProducts}
                    rowKey={(record) => record._id}
                />
            </Modal>

        </>
    );


}
