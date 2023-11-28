import React, { useState, useEffect } from 'react';
import Wrapper from '../../secure/Wrapper';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Role } from '../../classes/role';

function UserEdit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [state, setState] = useState({
        roles: [],
        redirect: false,
        first_name: '',
        last_name: '',
        email: '',
        role_id: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const rolesCall = await axios.get('http://127.0.0.1:8000/api/admin/roles');
                const userCall = await axios.get(`http://127.0.0.1:8000/api/admin/user/${id}`);
                const user = userCall.data.data;

                setState((prevState) => ({
                    ...prevState,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    role_id: user.role.id,
                    roles: rolesCall.data.data,
                }));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await axios.put(`http://127.0.0.1:8000/api/admin/user/${id}`, {
                first_name: state.first_name,
                last_name: state.last_name,
                email: state.email,
                role_id: state.role_id,
            });

            setState((prevState) => ({ ...prevState, redirect: true }));
        } catch (error) {
            console.error(error);
        }
    };

    if (state.redirect) {
        return <Navigate to="/users" />;
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="form-group">
                    <label>First name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="first_name"
                        value={state.first_name}
                        onChange={(e) => setState({ ...state, first_name: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="last_name"
                        value={state.last_name}
                        onChange={(e) => setState({ ...state, last_name: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="text"
                        className="form-control"
                        name="email"
                        value={state.email}
                        onChange={(e) => setState({ ...state, email: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label>Role</label>
                    <select
                        name="role_id"
                        className="form-control"
                        value={state.role_id}
                        onChange={(e) => setState({ ...state, role_id: parseInt(e.target.value) })}
                    >
                        <option>Select Role</option>
                        {state.roles.map((role: Role) => (
                            <option key={role.id} value={role.id}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                </div>

                <br />

                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
}

export default UserEdit;
