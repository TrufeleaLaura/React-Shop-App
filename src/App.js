import './App.css';
import {Navbar} from "./components/Navbar";
import {MainPage} from "./pages/MainPage";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
import {AuthProvider, ProtectedRoute, useLocalStorage} from "./components/AuthComponent";
import {useEffect} from "react";
import {CheckoutPage} from "./pages/CheckoutPage";

import {AccountPage} from "./pages/AccountPage";
import RegisterPage from "./pages/RegisterPage";
import OrderPage from "./pages/OrderPage";
import {ReturnPage} from "./pages/ReturnPage";

function App() {
    return (
        <AuthProvider>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/shop" element={<MainPage/>}/>
                    <Route path="/product/:id" element={<ProductPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/cart" element={<ProtectedRoute><CheckoutPage/></ProtectedRoute>}/>
                    <Route path="/account" element={<AccountPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/order" element={<ProtectedRoute><OrderPage/></ProtectedRoute>}/>
                    <Route path="/return/:orderId" element={<ProtectedRoute><ReturnPage/></ProtectedRoute>}/>
                </Routes>
        </AuthProvider>
    );
}

export default App;
