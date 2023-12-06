import React, {useEffect, useState} from 'react';
import Wrapper from "./Wrapper";
import axios from "axios";
import {Product} from "../classes/product";
import constants from "../constants";


const Main = () => {

    const [products, setProducts] = useState([]);
    const [searchText, setSearchText] = useState('')
    const [selected, setSelected] = useState([]);
    const [notify, setNotify] = useState({
        show: false,
        error: false,
        message: ''
    })


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/influencer/products?s=${searchText}`);
                setProducts(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [searchText]);

    const isSelected = (id: number) => selected.filter(s => s === id).length > 0;



    const select = (id: number) => {
        if(isSelected(id)) {
            setSelected(selected.filter(s => s !== id));
            return;
        }

        // @ts-ignore
        setSelected([...selected, id]);
    }

    const generate = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/influencer/links', {
                products: selected
            });

            setNotify({
                show: true,
                error: false,
                message: `Link generated: http://localhost:3002/${response.data.code}`
            })
        } catch (e) {
            setNotify({
                show: true,
                error: true,
                message: 'You should be logger in in to generate a link!'
            })
        } finally {
            setTimeout( () => {
                setNotify({
                    show: false,
                    error: false,
                    message: ''
                })
            }, 2000)
        }
    }

    let button = null;
    let info = null;

    if (selected.length > 0) {
        button = (
            <div className="input-group-append">
                <button className="btn btn-info" onClick={generate}>Generate Link</button>
            </div>
        );
    }

    if (notify.show) {
        info = (
            <div className="col-md-12 mb-4">
                <div className={notify.error ? "alert alert-danger" : "alert alert-info"} role="alert">
                    {notify.message}
                </div>
            </div>
        );
    }


    return (
        <Wrapper>
            <div className="row">
                <div className="col-md-12 mb-4 input-group">
                    {info}
                    <input type="text"  className="form-control" placeholder="Search"
                            onKeyUp={e => setSearchText((e.target as HTMLInputElement).value)}
                    />
                    <div className="input-group-append">
                        <button className="btn btn-info" onClick={generate}>Generate Link</button>
                    </div>
                </div>
            </div>



            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {products.map((product: Product) => {
                   return (
                       <div className="col" key={product.id}>
                           <div className={isSelected(product.id) ? "card mb-4 shadow-sm selected" : "card mb-4 shadow-sm selected" }
                                onClick={() => select(product.id)}
                           >
                               {product.image.startsWith('http') ? (
                                   <img src={product.image} alt="Product" width="50" />
                               ) : (
                                   <img src={`http://localhost:8000/images/${product.image.split('/').pop()}`} alt="Product" width="50" />
                               )}
                               <div className="card-body">
                                   <p className="card-text">{product.title}</p>
                                   <div className="d-flex justify-content-between align-items-center">
                                       <div className="btn-group">
                                           <small className="text-body-secondary">${product.price}</small>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                   );
                })}
            </div>

        </Wrapper>

    );
}


export default Main;