import React, { useEffect, useState } from 'react';
import useAuth from './../../hook/useAuth';
import { useHistory } from 'react-router';

const Order = () => {
    const [orders, setOrders] = useState([])
    const { user } = useAuth();
    const history = useHistory();

    useEffect(() => {
        fetch(`https://pacific-shelf-22590.herokuapp.com/orders?email=${user.email}`, {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("idToken")}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
                else if (res.status === 401) {
                    history.push("/login")
                }
            })
            .then(data => setOrders(data))
    }, [])
    return (
        <div>
            <h1>this is order..............{orders.length}</h1>
        </div>
    );
};

export default Order;