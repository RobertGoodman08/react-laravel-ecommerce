import React, {useEffect, useState} from 'react';
import Wrapper from "../components/Wrapper";
import {useRouter} from "next/router";
import axios from "axios";



const Home = () => {
    const router = useRouter();
    const {code} = router.query;
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState([]);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/checkout/links/${code}`);

                const data = response.data.data;

                setUser(data.user);
                setProducts(data.products);
                setQuantities(
                    data.products.map(p => {
                        return {
                            product_id: p.id,
                            quantity: 0
                        };
                    })
                );
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle the error here (e.g., set state indicating an error)
            }
        };



        fetchData();
    }, [code]);



    const quantity = (id: number) => {
        const q = quantities.find(q => q.product_id === id);

        return q ? q.quantity : 0;
    }


    const change = (id: number, quantity: number) => {
        setQuantities(quantities.map( q => {
            if (q.product_id === id) {
                return {
                    product_id: id,
                    quantity
                }
            }

            return q;
        }))
    }

    const total = () => {
        let t = 0;

        quantities.forEach(q => {
            const product = products.find(p => p.id === q.product_id);

            t += q.quantity * product.price;
        })

        return t;
    }

  return (
      <Wrapper>
          <div className="container">
                  <div className="py-5 text-center">
                          <h2>Welcome </h2>
                          <p className="lead">{user?.first_name} {user?.last_name}</p>
                  </div>

                  <div className="row g-5">
                      <div className="col-md-5 col-lg-4 order-md-last">
                          <h4 className="d-flex justify-content-between align-items-center mb-3">
                              <span className="text-primary">Products</span>
                          </h4>
                          <ul className="list-group mb-3">
                              {products.map(p => {
                                  return (
                                      <div key={p.id}>
                                          <li className="list-group-item d-flex justify-content-between lh-sm" >
                                              <div>
                                                  <h6 className="my-0">{p.title}</h6>
                                                  <small className="text-body-secondary">{p.description}</small>
                                              </div>
                                              <span className="text-body-secondary">${p.price}</span>
                                          </li>
                                          <li className="list-group-item d-flex justify-content-between lh-sm" key={p.id}>
                                              <div>
                                                  <h6 className="my-0">Quantity</h6>
                                              </div>
                                              <input type="number" min="0" className="text-muted form-control"
                                                 defaultValue={quantity(p.id)}
                                                onChange={e => change(p.id, parseInt(e.target.value))}
                                              />
                                          </li>
                                      </div>
                                  )
                              })}

                              <li className="list-group-item d-flex justify-content-between">
                                  <span>Total (USD)</span>
                                  <span>${total}</span>
                              </li>
                          </ul>
                      </div>
                      <div className="col-md-7 col-lg-8">
                          <h4 className="mb-3">Payment Info</h4>
                          <form className="needs-validation" noValidate>
                              <div className="row g-3">
                                  <div className="col-sm-6">
                                      <label htmlFor="firstName" className="form-label">First name</label>
                                      <input type="text" className="form-control" id="firstName" placeholder="First name"
                                             required />
                                          <div className="invalid-feedback">
                                              Valid first name is required.
                                          </div>
                                  </div>

                                  <div className="col-sm-6">
                                      <label htmlFor="lastName" className="form-label">Last name</label>
                                      <input type="text" className="form-control" id="lastName" placeholder="Last name"
                                             required />
                                  </div>


                                  <div className="col-12">
                                      <label htmlFor="email" className="form-label">Email <span
                                          className="text-body-secondary">(Optional)</span></label>
                                      <input type="email" className="form-control" id="email" placeholder="you@example.com" />
                                          <div className="invalid-feedback" >
                                              Please enter a valid email address for shipping updates.
                                          </div>
                                  </div>

                                  <div className="col-12">
                                      <label htmlFor="address" className="form-label">Address</label>
                                      <input type="text" className="form-control" id="address" placeholder="1234 Main St"
                                             required />
                                  </div>

                                  <div className="col-12">
                                      <label htmlFor="address2" className="form-label">Address 2 <span
                                          className="text-body-secondary">(Optional)</span></label>
                                      <input type="text" className="form-control" id="address2"
                                             placeholder="Apartment or suite" />
                                  </div>

                                  <div className="col-md-5">
                                      <label htmlFor="country" className="form-label">Country</label>
                                      <input type="text" className="form-control" id="country" placeholder="country"
                                             required />
                                  </div>

                                  <div className="col-md-4">
                                      <label htmlFor="city" className="form-label">State</label>
                                      <input type="text" className="form-control" id="city" placeholder="city"
                                             required />
                                  </div>

                                  <div className="col-md-3">
                                      <label htmlFor="zip" className="form-label">Zip</label>
                                      <input type="text" className="form-control" id="zip" placeholder="zip" required />
                                  </div>
                              </div>

                                <button className="btn btn-primary btn-lg btn-block" type="submit">
                                    checkout
                                </button>
                          </form>
                      </div>
                  </div>
          </div>
      </Wrapper>
  )
}


export default Home;