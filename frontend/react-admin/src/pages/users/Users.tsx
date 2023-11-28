import React, {Component} from 'react'
import Wrapper from "../../secure/Wrapper";
import axios from 'axios'
import {User} from "../../classes/user";
import {Link} from "react-router-dom";
import Paginator from "../../secure/components/Paginator";

class Users extends Component {

    state = {
        users: []
    }
    page = 1;
    last_page = 0;

    componentDidMount = async () => {
        try {
            const response = await axios.get(`users?page=${this.page}`);
            this.setState({
                users: response.data.data
            });

            this.last_page = response.data.meta.last_page;
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }


    prev = async () => {
        if (this.page === 1) return;

        this.page--;

        await this.componentDidMount();
    }


    next = async () => {
        if (this.page === this.last_page) return;

        this.page++;

        await this.componentDidMount();
    }

    delete = async (id: number) => {
        if(window.confirm('Are you sure you want to delete this record?')) {
            await axios.delete(`user/${id}`);

            this.setState({
                users: this.state.users.filter((u: User) => u.id !== id)
            })
        }
    }

    handlePageChange = async (page: number) => {
        this.page = page;

        await this.componentDidMount()
    }

    render() {
        return (
            <Wrapper>

                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <Link to={'/user/create'} className="btn btn-sm btn-outline-secondary">Add</Link>
                    </div>
                </div>


                <h2>Users</h2>
                <div className="table-responsive small">
                    <table className="table table-striped table-sm">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.users.map((user: User) => {
                            console.log(user);
                            return (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.first_name} {user.last_name}</td>
                                    <td>{user['email']}</td>
                                    <td>{user.role.name}</td>
                                    <td>
                                        <div className="btn-group mr-2">
                                            <Link to={`/user/${user.id}/edit`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                                            <a href="#" className="btn btn-sm btn-outline-secondary"
                                               onClick={() => this.delete(user.id)}>Delete</a>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>

                <Paginator lastPage={this.last_page} handlePageChange={this.handlePageChange} />

            </Wrapper>
        );
    }
}



export default Users;