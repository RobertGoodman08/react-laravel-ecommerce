import React, { useState, SyntheticEvent } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');

    const navigate = useNavigate();

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        // Reset errors
        setEmailError('');
        setPasswordError('');
        setLoginError('');

        // Check if email is valid
        if (!email.includes('@')) {
            setEmailError('Email is not valid');
            return;
        }

        // Check if password is valid
        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
            return;
        }

        // Create a URLSearchParams object to encode the data
        const formData = new URLSearchParams();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('scope', 'admin');

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });


            // Check if the response contains a token
            if (response.data && response.data.token) {
                // Save the token to localStorage or sessionStorage
                localStorage.setItem('token', response.data.token);

                axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

                // Redirect to the desired path after successful login
                navigate('/');
            } else {
                console.error('Login Error: Token not found in the response');
                // Handle errors here
            }
        } catch (error: unknown) {
            console.error('Login AxiosError:', error);

            // Check if the error response contains additional information
            if ((error as AxiosError)?.response) {
                const errorResponse = (error as AxiosError).response;

                if (errorResponse && errorResponse.status === 401) {
                    // Handle specific case of invalid credentials
                    const errorMessage = (errorResponse.data as { error?: string })?.error || 'Invalid Credentials';
                    setLoginError(errorMessage);
                    // You can display the error on the page or set a state variable to control error display
                } else {
                    console.error('Login Error Response Data:', errorResponse?.data);
                    // Handle other errors
                }
            }

            // Handle errors here
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center h-100 bg-body-tertiary">
            <form className="form-signin text-center" onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Login</h1>

                <div className="form-floating">
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="name@example.com"
                        required
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="email">Email address</label>
                    {emailError && <div className="text-danger">{emailError}</div>}
                </div>
                <br />

                <div className="form-floating">
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                    {passwordError && <div className="text-danger">{passwordError}</div>}
                </div>

                <br />

                {loginError && <div className="text-danger">{loginError}</div>}

                <button className="w-100 btn btn-lg btn-primary" type="submit">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
