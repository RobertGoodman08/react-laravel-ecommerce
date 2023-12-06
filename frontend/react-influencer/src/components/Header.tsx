import React, { PropsWithRef, useEffect, useState } from 'react';
import { User } from "../classes/user";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Header = (props: PropsWithRef<any>) => {
    const [title, setTitle] = useState('Welcome');
    const [description, setDescription] = useState('Share links and earn 10% of the product price!')

    useEffect(() => {
        if (props.user && props.user.id !== undefined && props.user.revenue !== undefined) {
            setTitle(`$${props.user.revenue}`);
            setDescription('You have earned in total');
        } else {
            setTitle('Welcome');
            setDescription('Share links and earn 10% of the product price!');
        }
    }, [props.user]);


    let buttons;

    if (props.user) {
        buttons = (
            <p>
                <Link to={'/stats'} className="btn btn-primary my-2">Stats</Link>
            </p>
        )
    } else {
        buttons = (
            <p>
                <Link to={'/login'} className="btn btn-primary my-2">Login</Link>
                <Link to={'/register'} className="btn btn-secondary my-2">Register</Link>
            </p>
        )
    }

    return (
        <section className="py-5 text-center container">
            <div className="row py-lg-5">
                <div className="col-lg-6 col-md-8 mx-auto">
                    <h1 className="fw-light">{title}</h1>
                    <p className="lead text-body-secondary">{description}</p>
                    {buttons}
                </div>
            </div>
        </section>
    );
}

const mapStateToProps = (state: { user: User }) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Header);
