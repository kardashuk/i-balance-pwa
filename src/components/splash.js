import React from 'react';
import {Link} from 'react-router-dom';
import Logo from './logo';

export default () => (
    <section className="hero is-info is-fullheight">
        <div className="hero-body">
            <div className="container">
                <h1 className="title">
                    Welcome to iBalance
                </h1>
                <Logo></Logo>
                <Link to="/login" className="button">Checkout the full demo</Link>
            </div>
        </div>
    </section>
);
