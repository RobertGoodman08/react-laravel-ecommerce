import React, {useEffect, useState, ReactNode, Dispatch} from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate instead of Redirect
import Nav from "./components/Nav";
import Menu from "./components/Menu";
import axios from "axios";
import {User} from "../classes/user";
import setUser from "../redux/actions/setUserAction";
import {connect} from "react-redux";

interface WrapperProps {
    children?: ReactNode;
    setUser: (user: User) => void;
}

const Wrapper: React.FC<WrapperProps> = ({ children, setUser }) => {
    const [redirect, setRedirect] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('users');
                const user: User = response.data.data;

                setUser(new User(
                    user.id,
                    user.first_name,
                    user.last_name,
                    user.email,
                    user.role,
                    user.permissions
                ))

            } catch (e) {
                setRedirect(true);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect will only run once on mount

    if (redirect) {
        // Use Navigate instead of Redirect
        return <Navigate to={'/login'} />;
    }

    return (
        <>
            <Nav />
            <div className="container-fluid">
                <div className="row">
                    <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
                        <Menu />
                    </div>
                    <main role="main" className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
};


const mapStateToProps = (state: {user: User}) => {
    return {
        user: state.user
    }
}


const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        setUser: (user: User) => dispatch(setUser(user))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);