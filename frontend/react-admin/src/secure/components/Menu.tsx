import React, {Component} from 'react';
import {Navigate, NavLink} from "react-router-dom";


class Menu extends Component{




    state = {
        redirect: false
    }
    handleClick = () => {
        localStorage.clear()
        this.setState({
            redirect: true
        })
    }

    render() {

        if (this.state.redirect) {
            return <Navigate to={'/login'} />;
        }

        return (
            <div>
                <div className="offcanvas-md offcanvas-end bg-body-tertiary" tabIndex={-1} id="sidebarMenu"
                     aria-labelledby="sidebarMenuLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="sidebarMenuLabel">Company name</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas"
                                data-bs-target="#sidebarMenu" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <NavLink className="nav-link d-flex align-items-center gap-2" to={"/dashboard"}>
                                    Dashboard
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link d-flex align-items-center gap-2" to={"/users"}>
                                    Users
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link d-flex align-items-center gap-2" to={"/roles"}>
                                    Roles
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link d-flex align-items-center gap-2" to={"/products"}>
                                    Products
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link d-flex align-items-center gap-2" to={"/orders"}>
                                    Orders
                                </NavLink>
                            </li>
                        </ul>

                        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
                            <span>Saved reports</span>
                            <a className="link-secondary" href="#" aria-label="Add a new report">

                            </a>
                        </h6>
                        <ul className="nav flex-column mb-auto">
                            <li className="nav-item">
                                <a className="nav-link d-flex align-items-center gap-2" href="#">
                                    Current month
                                </a>
                            </li>
                        </ul>

                        <hr className="my-3"/>

                        <ul className="nav flex-column mb-auto">
                            <li className="nav-item">
                                <a className="nav-link d-flex align-items-center gap-2" href="#">
                                    Settings
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link d-flex align-items-center gap-2" href="#"
                                   onClick={this.handleClick}>
                                    Sign out
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Menu;