import React from 'react';
import {useAuth} from '../components/AuthComponent';
import '../pages/pagesCSS.css';

export function AccountPage() {
    const {user, logout} = useAuth();

    return (
        <div className="account-container">
            <div className="account-header">
                <h1>Welcome, {user ? "Laura" : 'Guest'}!</h1>
            </div>
            <div className="account-details">
                <div className="account-info">
                    <h2>Your Account Information</h2>
                    {user ? (
                        <>
                            <p><strong>Username:</strong> laura.trufelea</p>
                            <p><strong>Email:</strong> ltrufelea</p>
                        </>
                    ) : (
                        <p>Please log in to view your account information.</p>
                    )}
                </div>
                <div className="account-actions">
                    {user ? (
                        <button className="button-acc" onClick={logout}>Log Out</button>
                    ) : (
                        <a className="a-acc" href="/login">Log In</a>
                    )}
                </div>
            </div>
            <div className="account-content">
                <h2>Your Orders</h2>
                {user ? (
                    <ul>
                        <li>Order #1111 - Total: $1000</li>
                        <li>Order #222 - Total: $1500</li>
                        <li>Order #3333 - Total: $2000</li>
                    </ul>
                ) : (
                    <p>Please log in to view your order history.</p>
                )}
            </div>
            <div className="account-footer">
                <p>Contact us: contact@example.com</p>
            </div>
        </div>
    );
}
