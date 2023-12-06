import React, {Component} from 'react';
import {User} from "../../classes/user";
import axios from "axios";
import {Link, Navigate} from "react-router-dom";
import {connect} from "react-redux";


class Nav extends Component<{user: User}>{


    render() {


        return (
            <div>
                <header className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow" data-bs-theme="dark">
                    <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white" href="#">Company name</a>

                    <ul className="navbar-nav flex-row d-md-none">
                        <li className="nav-item text-nowrap">
                            <Link to={'/profile'} className="p-2 text-white">

                            </Link>
                        </li>

                    </ul>

                    <div id="navbarSearch" className="navbar-search w-100 collapse">
                        <input className="form-control w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search" />
                    </div>
                </header>
            </div>
        )
    }
}

const mapStateToProps = (state: {user: User}) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Nav);