import React, { useState, useEffect } from 'react';
import Wrapper from '../../secure/Wrapper';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Role } from '../../classes/role';
import {Permission} from "../../classes/permission";

function RoleEdit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [state, setState] = useState({
        permissions: [],
        redirect: false,
        selected: [],
        name: '',
        id: 0,
    });

    const [selected, setSelected] = useState<number[]>([]);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const permissionCall = await axios.get('http://127.0.0.1:8000/api/admin/permissions');
                const roleCall = await axios.get(`role/${id}`);
                const role = roleCall.data.data;

                const selectedPermissions = role.permissions.map((p: Permission) => p.id);
                setSelected(selectedPermissions);

                setState((prevState) => ({
                    ...prevState,
                    name: role.name,
                    selected: selectedPermissions,
                    permissions: permissionCall.data.data,
                }));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);



    const check = (id: number) => {
        if (isChecked(id)) {
            setSelected(selected.filter(s => s !== id));
        } else {
            setSelected([...selected, id]);
        }
    };

    const isChecked = (id: number) => {
        return selected.includes(id);
    };


    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await axios.put(`role/${id}`, {
                name: state.name,
                permissions: selected,
            });


            console.log("Данные для отправки:", {
                name: state.name,
                permissions: selected,
            });


            setState((prevState) => ({ ...prevState, redirect: true }));
        } catch (error) {
            console.error(error);
        }
    };

    if (state.redirect) {
        return <Navigate to="/roles" />;
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
                        value={state.name}
                        onChange={(e) => setState({ ...state, name: e.target.value })}
                    />
                </div>


                <div className="form-group">
                    {state.permissions.map(
                        (p: Permission) => {
                            return (
                                <div className="form-check form-check-inline col-3" key={p.id}>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        value={p.id}
                                        checked={isChecked(p.id)}
                                        onChange={() => check(p.id)}
                                    />
                                    <label className="form-check-label">{p.name}</label>
                                </div>
                            )
                        }
                    )}
                </div>



                <br />

                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
}

export default RoleEdit;
