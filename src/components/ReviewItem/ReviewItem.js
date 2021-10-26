import React from 'react';

const ReviewItem = (props) => {
    const { name, price, quantity, key } = props.product
    return (
        <div>
            <h4 className="product-name">{name}</h4>
            <p>price: {price}</p>
            <p>Quantity: {quantity}</p>
            <button className="btn" onClick={() => props.handleRemove(key)}>Removed</button>

        </div>
    );
};

export default ReviewItem;