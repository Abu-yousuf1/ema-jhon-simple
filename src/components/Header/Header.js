import React from 'react';
import './Header.css'
import logo from './../../images/logo.png'
import { NavLink } from 'react-router-dom';
import useAuth from '../../hook/useAuth';

const Header = () => {
    const { user, logout } = useAuth();
    return (
        <div className="header-container">
            <img src={logo} alt="" />
            <nav>
                <NavLink to="/home">Shop</NavLink>
                <NavLink to="/review">Order Review</NavLink>
                {/* <NavLink to="">Manage Inventory here</NavLink> */}
                {user.email && <NavLink to="/order">Order</NavLink>}
                {user.email && <span style={{ color: 'white' }}>Hello {user.displayName} </span>}
                {
                    user.email ?
                        <button onClick={logout}>Log-out</button>
                        :
                        <NavLink to="/login">Login</NavLink>
                }

            </nav>
        </div>
    );
};

export default Header;