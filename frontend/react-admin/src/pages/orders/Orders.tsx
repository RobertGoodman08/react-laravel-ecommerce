import React, {Component} from 'react'
import Wrapper from "../../secure/Wrapper";
import axios from 'axios'
import {Link} from "react-router-dom";
import {Order} from "../../classes/order";
import Paginator from "../../secure/components/Paginator";

class Orders extends Component {

    state = {
        orders: []
    }
    page = 1;
    last_page = 0;

    componentDidMount = async () => {
        const response = await axios.get(`orders?page=${this.page}`)

        this.setState({
            orders: response.data.data
        })
        this.last_page = response.data.meta.last_page;
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



    handlePageChange = async (page: number) => {
        this.page = page;

        await this.componentDidMount()
    }



    handleExport = async () => {
        const response = await axios.get('export', {responseType: 'blob'})
        const blob = new Blob([response.data], {type: 'text/csv'})
        const downloadUrl = window.URL.createObjectURL(response.data)
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'orders.csv'
        link.click();
    }


    render() {
        return (
            <Wrapper>


                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <a onClick={this.handleExport} className="btn btn-sm btn-outline-secondary">Export</a>
                    </div>
                </div>


                <h2>Orders</h2>
                <div className="table-responsive small">
                    <table className="table table-striped table-sm">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">first name last name</th>
                            <th scope="col">email</th>
                            <th scope="col">total</th>
                            <th scope="col">Views</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.orders.map((order: Order) => {
                            return (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.first_name} {order.last_name}</td>
                                    <td>{order.email}</td>
                                    <td>{order.total}</td>
                                    <td>
                                        <div className="btn-group mr-2">
                                            <Link to={`/order/${order.id}/view`} className="btn btn-sm btn-outline-secondary">View</Link>

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



export default Orders;