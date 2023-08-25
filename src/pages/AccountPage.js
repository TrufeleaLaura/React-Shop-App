import React from 'react';
import {useAuth} from '../components/AuthComponent';
import '../pages/pagesCSS.css';

export function AccountPage() {
    const {user, logout} = useAuth();

    return (
        <div className="account-container">
            <div className="account-header">
                <h1>Welcome, {user ? user.firstName + " " + user.lastName : 'Guest'}!</h1>
            </div>
            <div className="account-details">
                <div className="account-info">
                    <h2>Your Account Information</h2>
                    {user ? (
                        <>
                            <p><strong>Email: </strong> {user.email}</p>
                            <br></br>
                            <p><strong>Gender: </strong>{user.gender}</p>
                            <br></br>
                            <p><strong>Phone Number: </strong> {user.phoneNumber}</p>
                            <br></br>
                            <p><strong>Date of Birth: </strong>{user.birthDate}</p>
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

            {!user &&
                <div className="account-content">
                    <p>Please log in to view your order history.</p>
                </div>
            }

            <div className="account-footer">
                <p>Contact us: meta-shop@example.com</p>
            </div>
        </div>
    );
}
