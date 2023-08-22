import React, {useState} from 'react';
import './pagesCSS.css';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../components/AuthComponent";
import axios from "axios";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {login} = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        document.getElementById("invalid").style.display = "none";
        try {
            const response = await axios.post('http://localhost:8080/api/user/login', {
                email: email,
                password: password
            });
            if (response.status === 200) {
                const data = response.data;
                console.log(data);
                const { user } = data;
                login(user);
                //const token = user.token;
                //login(token);
                navigate('/shop');
            } else {
                document.getElementById("invalid").style.display = "block";
                setEmail('');
                setPassword('');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };
    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </div>
                <button className="login-button" type="submit">Login</button>
                <p className="invalid-account" id={"invalid"} style={{display: "none", color: "red"}}>Email or password
                    is not correct! </p>
            </form>
        </div>
    );
}

export default LoginPage;
