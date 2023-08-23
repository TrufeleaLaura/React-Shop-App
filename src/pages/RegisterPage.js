import React, { useState } from 'react';
import './pagesCSS.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        document.getElementById('invalid').style.display = 'none';

        axios.post('http://localhost:8080/api/user/register', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            address: address,
            phoneNumber: phoneNumber,
            gender: gender,
            birthDate: birthDate.toString()
        })
            .then(response => {
                if (response.status === 200) {
                    navigate('/login');
                } else {

                    console.log('Registration failed:', response.data);
                }
            })
            .catch(error => {
                console.error('Error during registration:', error);
                document.getElementById('invalid').style.display = 'block';
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
                setAddress('');
                setPhoneNumber('');
                setGender('');
                setBirthDate('');
            });
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <p
                className="invalid-account"
                id="invalid"
                style={{ display: 'none', color: 'red' }}
            >
                Registration failed! Please check your inputs.
            </p>
            <form onSubmit={handleRegister}>
                <div className="input-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter your first name"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter your last name"
                    />
                </div>
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
                <div className="input-group">
                    <label htmlFor="address">Address</label>
                    <input
                        id="address"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your address"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter your phone number"
                    />
                </div>
                <div className="radio-group">
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={gender === 'female'}
                            onChange={() => setGender('female')}
                        />
                        Female
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={gender === 'male'}
                            onChange={() => setGender('male')}
                        />
                        Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="preferNotToSay"
                            checked={gender === 'preferNotToSay'}
                            onChange={() => setGender('preferNotToSay')}
                        />
                        Prefer not to say
                    </label>
                </div>
                <div className="input-group">
                    <label htmlFor="birthDate">Birth Date</label>
                    <input
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                    />
                </div>
                <button className="register-button" type="submit">
                    Register
                </button>

            </form>
        </div>
    );
}

export default RegisterPage;
