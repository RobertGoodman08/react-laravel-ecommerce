import React, {Component, SyntheticEvent} from 'react';
import Wrapper from "../../secure/Wrapper";
import axios from "axios";
import {Role} from "../../classes/role";
import {Navigate} from "react-router-dom";
import {Permission} from "../../classes/permission";

class RoleCreate extends Component {

    state = {
        permissions: [],
        redirect: false,
    }
    selected: number[] = [];
    name = '';

    componentDidMount = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/admin/permissions');

        this.setState({
            permissions: response.data.data
        });
    }

    check = (id: number) => {
        if(this.selected.filter(s => s === id ).length > 0) {
            this.selected = this.selected.filter(s => s !== id);
            return;
        }

        this.selected.push(id);
    }

    submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/admin/role_create', {
                name: this.name,
                permissions: this.selected,
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
            return <Navigate to="/roles" />
        }
        return (
            <Wrapper>
                <form onSubmit={this.submit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" name="name"
                               onChange={e => this.name = e.target.value}

                        />
                    </div>

                    <div className="form-group">
                        {this.state.permissions.map(
                            (p: Permission) => {
                                return (
                                    <div className="form-check form-check-inline col-3" key={p.id}>
                                        <input type="checkbox"  className="form-check-input" value={p.id}
                                            onChange={e => this.check(p.id)}
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
        )
    }
}

export default RoleCreate;