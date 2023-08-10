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

function App() {
    return (
        <AuthProvider>

                <Navbar/>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/shop" element={<MainPage/>}/>
                    <Route path="/product/:id" element={<ProductPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/cart" element={<CheckoutPage/>}/>
                    <Route path="/account" element={<AccountPage/>}/>
                </Routes>

        </AuthProvider>
    );
}

export default App;
