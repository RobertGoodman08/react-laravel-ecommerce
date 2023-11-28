import React, { useState, useEffect } from 'react';
import Wrapper from '../../secure/Wrapper';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import axios from 'axios';
import {OrderItem} from "../../classes/order_item";

function RoleEdit() {
    const { id } = useParams();
    const [state, setState] = useState({
        order_items: [],
        id: 0,
    });




    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/admin/order/${id}`);
                setState((prevState) => ({
                    ...prevState,
                    order_items: response.data,
                }));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);





    return (
        <Wrapper>
            <div className="table-responsive small">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                    </tr>
                    </thead>
                    <tbody>
                    {state.order_items.map(
                        (o: OrderItem) => (
                        <tr key={o.id}>
                            <td>{o.product_title}</td>
                            <td>{o.price}</td>
                            <td>{o.quantity}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </Wrapper>
    );
}

export default RoleEdit;
