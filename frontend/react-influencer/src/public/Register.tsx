import React, { useState, SyntheticEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirm, setPasswordConfirm] = useState('');

    const navigate = useNavigate();

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', {
                first_name,
                last_name,
                email,
                password,
                password_confirm,
                role_id: 1,
            });

            console.log(response);

            // Redirect to the desired path after successful registration
            navigate('/login');
        } catch (error) {
            console.error('AxiosError:', error);
            // Handle errors here
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center h-100 bg-body-tertiary">
            <form className="form-signin text-center" onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Register</h1>

                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="First Name"
                        required
                        autoFocus
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label htmlFor="floatingInput">First Name</label>
                </div>

                <br />

                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        id="lastname"
                        placeholder="Last Name"
                        required
                        autoFocus
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Last Name</label>
                </div>
                <br />

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
                </div>
                <br />

                <div className="form-floating">
                    <input
                        type="password"
                        className="form-control"
                        id="passwordConfirmation"
                        placeholder="password confirmation"
                        required
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                    <label htmlFor="floatingPassword">password confirmation</label>
                </div>

                <br />

                <button className="w-100 btn btn-lg btn-primary" type="submit">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
