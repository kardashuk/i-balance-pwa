import React from 'react';
import {Redirect} from 'react-router-dom';
import GuestLayout from '../guest-layout';
import cookie from '../../../services/cookie';
import Authenticator from '../fake-authenticator';
import Loading from '../../common/loading/loading';
import styles from './login.scss';

export default class Login extends React.Component {
    onLoginRedirectUrl = '/dashboard';

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            loggedIn: false,
            error: '',
            errorMsg: '',
            loading: false
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

    handleSubmit(e) {
        if (e && e.preventDefault) e.preventDefault();
        const loginData = new FormData(e.target);
        const username = loginData.get('username');
        const password = loginData.get('password');
        this.setState({loading:true});
        setTimeout(() => {
            if (username !== 'demo' || password !== 'demo') {
                this.setState({
                    loading: false,
                    error: username !== 'demo' ? 'username' : 'password',
                    errorMsg: 'Please use username:password as demo:demo',
                });
            } else {
                cookie.setItem('secretKey', 'allowmein');
                this.setState({
                    loggedIn: true,
                    loading: false
                });
            }
        }, 1000);
    }

    render() {
        const {
            loggedIn,
            error,
            errorMsg,
            loaded,
            loading
        } = this.state;
        if (!loaded) return null;
        if (loggedIn) {
            return <Redirect push={false} to={this.onLoginRedirectUrl}/>;
        }
        return (
            <GuestLayout>
                <div className={`${styles.login}`}>
                    <h1 className="title">Hello</h1>
                    <form className="form" onSubmit={e => this.handleSubmit(e)}>
                        {
                            error !== '' && (
                                <p className="error">
                                    {errorMsg}
                                </p>
                            )
                        }
                        <label className="label" htmlFor="username">
                            Email
                            <input
                                defaultValue="demo"
                                id="username"
                                name="username"
                                className={`input ${error === 'username' ? 'is-danger' : ''}`}
                                type="text"
                                placeholder="Username input"
                            />
                        </label>
                        <label className="label" htmlFor="password">
                            Password
                            <input
                                defaultValue="demo"
                                id="password"
                                name="password"
                                className={`input ${error === 'password' ? 'is-danger' : ''}`}
                                type="password"
                                placeholder="********"
                            />
                        </label>
                        <button type="submit" className="btn-submit">Login</button>
                        {
                            loading && (
                                <Loading></Loading>
                            )
                        }
                    </form>
                </div>
            </GuestLayout>
        );
    }
}
