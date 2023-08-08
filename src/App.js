import './App.css';
import {Navbar} from "./components/Navbar";
import {MainPage} from "./pages/MainPage";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
      <Router>
          <Navbar/>
          <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/shop" element={<MainPage/>}/>
                <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/login" element={<LoginPage/>}/>
          </Routes>
      </Router>
  );
}

export default App;
