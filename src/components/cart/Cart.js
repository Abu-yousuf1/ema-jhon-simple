import React from 'react';
import './cart.css'
const Cart = (props) => {
    const { carts } = props;
    let totalQuantity = 0;
    let total = 0;
    for (const product of carts) {
        if (!product.quantity) {
            product.quantity = 1;
        }
        total = total + product.price * product.quantity
        totalQuantity = totalQuantity + product.quantity
    }

    // const shipping = total <= 200 ? 15 : 0;
    let shipping = 0;
    if (total <= 0) {
        shipping = 0
    }
    else if (total <= 200) {
        shipping = 20;
    } else if (total <= 500) {
        shipping = 30;
    } else {
        shipping = 50
    }

    const tax = (10 / 100) * (total + shipping);
    const grandTotal = total + shipping + tax;
    return (
        <div className="cart-container">
            <h3>Order Summary</h3>
            <h5>Items Order: <span>{totalQuantity}</span></h5>
            <p>Total: {total.toFixed(2)}</p>
            <p>Shipping: {shipping}</p>
            <p>tax: {tax.toFixed(2)} </p>
            <h5>Grand Total: {grandTotal.toFixed(2)}</h5>
            {props.children}
        </div>
    );
};

export default Cart;