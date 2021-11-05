import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../hook/useAuth';
import "./Login.css"

const Login = () => {
    const { googleSignIn, setIsLoading } = useAuth();
    const location = useLocation();
    console.log(location.state?.from)
    const redirect_uri = location.state?.from || "/home";
    const history = useHistory();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                history.push(redirect_uri)
            })
            .finally(() => setIsLoading(false))
    }
    return (
        <div className="login-form">
            <div>
                <h2>Login</h2>
                <form onSubmit="">
                    <input type="email" name="" placeholder="write your email" />
                    <br />
                    <input type="password" name="" placeholder="write your password" />
                    <br />
                    <input className="btn" type="submit" value="submit" />
                </form>
                <p>new to ema-jhon? <Link to="register">Create Account</Link> </p>
                <div>----------or----------</div>
                <button onClick={handleGoogleSignIn} className="btn">Google sign in</button>
            </div>
        </div>
    );
};

export default Login;