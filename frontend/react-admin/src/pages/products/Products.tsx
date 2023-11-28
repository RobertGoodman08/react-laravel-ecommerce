import React, {Component} from 'react'
import Wrapper from "../../secure/Wrapper";
import axios from 'axios'
import {Link} from "react-router-dom";
import {Product} from "../../classes/product";
import Deleter from "../../secure/components/Deleter";

class Products extends Component {

    state = {
        products: []
    }

    page = 1;
    last_page = 0;

    componentDidMount = async () => {
        const response = await axios.get(`products?page=${this.page}`)

        this.setState({
            products: response.data.data
        })

        this.last_page = response.data.meta.last_page;
    }

    handleDelete = async (id: number) => {
        this.setState({
            products: this.state.products.filter((p: Product) => p.id !== id)
        })
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


    render() {
        return (
            <Wrapper>

                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <Link to={'/product/create'} className="btn btn-sm btn-outline-secondary">Add</Link>
                    </div>
                </div>


                <h2>Products</h2>
                <div className="table-responsive small">
                    <table className="table table-striped table-sm">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Image</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.products.map((product: Product) => {
                            return (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>
                                        {product.image.startsWith('http') ? (
                                            <img src={product.image} alt="Product" width="50" />
                                        ) : (
                                            <img src={`http://localhost:8000/images/${product.image.split('/').pop()}`} alt="Product" width="50" />
                                        )}
                                    </td>

                                    <td>{product.title} </td>
                                    <td>{product.description} </td>
                                    <td>{product.price} </td>
                                    <td>
                                        <div className="btn-group mr-2">
                                            <Link to={`/product/${product.id}/edit`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                                            <Deleter id={product.id} endpoint={'product'} handleDelete={this.handleDelete} />
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>


                <nav>
                    <ul className="pagination">
                        <li className="page-item">
                            <a href="#" className="page-link" onClick={this.prev}>Previous</a>
                        </li>
                        <li className="page-item">
                            <a href="#" className="page-link" onClick={this.next}>Next</a>
                        </li>
                    </ul>
                </nav>


            </Wrapper>
        );
    }
}



export default Products;