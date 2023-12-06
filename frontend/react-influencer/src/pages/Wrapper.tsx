import React, {Dispatch, ReactNode, useEffect} from 'react';
import Nav from "../components/Nav";
import Header from "../components/Header";
import axios from "axios";
import {User} from "../classes/user";
import setUser from "../redux/actions/setUserAction";
import {connect} from "react-redux";

interface WrapperProps {
    children?: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {


    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/user');
                const user: User = response.data.data;

                // Вызов setUser из пропсов
                setUser(new User(
                    user.id,
                    user.first_name,
                    user.last_name,
                    user.email,
                    user.revenue,
                ));
            } catch (e) {
                setUser(new User(0, '', '', '', 0));
            }
        })();
    }, [setUser]);

    return (
        <>
            <Nav />
            <main>

                <Header />

                <div className="album py-5 bg-body-tertiary">
                    <div className="container">

                        {children}

                    </div>
                </div>

            </main>
        </>
    )
}


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