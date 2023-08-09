import './App.css';
import {Navbar} from "./components/Navbar";
import {MainPage} from "./pages/MainPage";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
import {AuthProvider, useLocalStorage} from "./components/AuthComponent";
import {useEffect} from "react";
import {CheckoutPage} from "./pages/CheckoutPage";

function App() {
    const [cartStorageValue, setCartStorageValue] = useLocalStorage('cartLocalStorage', []);

    useEffect(() => {
        const storageListener = (event) => {
            if (event.key === 'cartLocalStorage') {
                setCartStorageValue(JSON.parse(event.newValue));
            }
        };

        window.addEventListener('storage', storageListener);

        return () => {
            window.removeEventListener('storage', storageListener);
        };
    }, []);
  return (
          <AuthProvider>
              <Navbar/>
              <Routes>
                  <Route path="/" element={<HomePage/>}/>
                  <Route path="/shop" element={<MainPage/>}/>
                  <Route path="/product/:id" element={<ProductPage/>}/>
                  <Route path="/login" element={<LoginPage/>}/>
                  <Route path="/cart" element={<CheckoutPage/>}/>
              </Routes>
          </AuthProvider>
  );
}

export default App;
