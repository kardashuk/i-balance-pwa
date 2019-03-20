import React from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import Logo from '../logo/logo';
import styles from './splash.scss';
import Authenticator from "../../auth/fake-authenticator";

export default class SplashScreen extends React.Component {
    onLoginRedirectUrl = '/dashboard';

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            loggedIn: false,
            error: '',
            errorMsg: '',
        };
    }

    componentDidMount() {
        const isLoggedIn = Authenticator.isLoggedIn();
        if (isLoggedIn) {
            this.setState({
                loaded: true,
                loggedIn: true,
            });
        } else {
            this.setState({
                loaded: true,
            });
        }
    }

    render() {
        const {
            loggedIn,
            error,
            errorMsg,
            loaded,
        } = this.state;
        if (!loaded) return null;
        if (loggedIn) {
            return <Redirect push={false} to={this.onLoginRedirectUrl}/>;
        }
        return (
            <section className={`${styles.splash}`}>
                <h1 className="title">
                    iBalance
                </h1>
                <div className={`${styles.logo}`}>
                    <Logo></Logo>
                </div>
                <Link to="/login" className={`${styles.btn}`}>Sign In</Link>
            </section>
        )
    }
}
