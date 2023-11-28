import React, {Component, SyntheticEvent} from 'react';
import Wrapper from "../../secure/Wrapper";
import axios from "axios";
import {Role} from "../../classes/role";
import {Navigate} from "react-router-dom";

class UserCreate extends Component {

    state = {
        roles: [],
        redirect: false,
    }

    first_name = '';
    last_name = '';
    email = '';
    password = ''
    role_id = 0;

    componentDidMount = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/admin/roles')

        this.setState({
            roles: response.data.data
        })

    }

    submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/admin/user', {
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
                password: this.password,
                role_id: this.role_id,
            });

            // Обработка успешного ответа
        } catch (error: any) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        }



        this.setState({
            redirect: true
        })
    }

    render() {
        if(this.state.redirect) {
            return <Navigate to="/users" />
        }
        return (
            <Wrapper>
                <form onSubmit={this.submit}>
                    <div className="form-group">
                        <label>First name</label>
                        <input type="text" className="form-control" name="first_name"
                            onChange={e => this.first_name = e.target.value}
                        />
                    </div>


                    <div className="form-group">
                        <label>Last name</label>
                        <input type="text" className="form-control" name="last_name"
                               onChange={e => this.last_name = e.target.value}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" className="form-control" name="email"
                               onChange={e => this.email = e.target.value}
                        />
                    </div>

                    <div className="form-group">
                        <label>Role</label>
                        <select name="role_id" className="form-control"
                                onChange={e => this.role_id = parseInt(e.target.value)}
                        >
                            <option>Select Role</option>
                            {this.state.roles.map(
                                (role: Role) => {
                                    return (
                                        <option key={role.id} value={role.id}>{role.name}</option>
                                    )
                                }
                            )}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name="password"
                               onChange={e => this.password = e.target.value}
                        />
                    </div>

                    <br />

                    <button className="btn btn-outline-secondary">Save</button>
                </form>
            </Wrapper>
        )
    }
}

export default UserCreate;