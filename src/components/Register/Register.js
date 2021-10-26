import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className="login-form">
            <div>
                <h2>Create Account</h2>
                <form onSubmit="">
                    <input type="email" name="" id="" placeholder="Write your email" />
                    <br />
                    <input type="password" name="" id="" placeholder="write your password" />
                    <br />
                    <input type="password" name="" id="" placeholder="re-enter password" />
                    <br />
                    <input className="btn" type="submit" value="submit" />
                </form>
                <p>Already have an account?<Link to="/login">Login-In</Link></p>
                <div>----------or-----------</div>
                <button className="btn">Google Sign in</button>
            </div>
        </div>
    );
};

export default Register;