import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../classes/user';
import { connect } from 'react-redux';
import { setUser } from '../redux/actions/setUserAction';
import { logoutUser } from "../redux/authActions";

interface NavProps {
    user: User;
    setUser: (user: User) => void;
    logoutUser: () => void;
}

class Nav extends Component<NavProps> {
    handleLogout = () => {
        localStorage.clear();
        this.props.logoutUser();
        window.location.href = '/login';
    };

    render() {
        const { user } = this.props;

        return (
            <header data-bs-theme="dark">
                <div className="navbar navbar-dark bg-dark shadow-sm">
                    <div className="container">
                        <Link to={'/'} className="navbar-brand my-0 mr-md-auto font-weight-normal">
                            Influencer
                        </Link>
                        {user ? (
                            <div>
                                <Link to={'/'} onClick={this.handleLogout} className="p-2 text-white">
                                    Logout
                                </Link>
                                <Link to={'/rankings'} className="p-2 text-white">
                                    Rankings
                                </Link>
                                <Link to={'/stats'} className="p-2 text-white">
                                    Stats
                                </Link>
                            </div>
                        ) : (
                            <Link to={'/login'} className="p-2 text-white">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </header>
        );
    }
}

const mapStateToProps = (state: { user: User }) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        setUser: (user: User) => dispatch(setUser(user)),
        logoutUser: () => dispatch(logoutUser()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
