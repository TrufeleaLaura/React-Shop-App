import React from 'react';
import './pagesCSS.css';
import coverPicture from "../images/cover.jpg";
import {useNavigate} from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();
    const handleShopNowClick = () => {
        navigate('/shop');
    };
    return (
        <div className="homepage">
            <div className="shop-cover">
                <img src={coverPicture} alt="Shop Cover Image" />
                <div className="details">
                    <h1>Welcome to Meta Shop</h1>
                    <p>Everything you need can be found here!</p>
                    <button className="sh-button" onClick={handleShopNowClick}>
                        Shop Now
                    </button>
            </div>
            </div>
        </div>
    );
}

export default HomePage;
