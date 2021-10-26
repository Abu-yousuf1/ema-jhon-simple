import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import "./Product.css"
import Rating from 'react-rating';

const Product = (props) => {

    const { name, img, price, seller, star } = props.product;
    const CartIcon = <FontAwesomeIcon icon={faCartPlus} />

    return (
        <div className="product">
            <img src={img} alt="" />
            <div>
                <h4 className="product-name">{name}</h4>
                <p><small>by:{seller}</small></p>
                <h5>${price}</h5>
                <Rating
                    initialRating={star}
                    readonly
                    emptySymbol="far fa-star icon"
                    fullSymbol="fas fa-star icon"
                /> <br /><br />
                <button className="btn" onClick={() => props.handleCart(props.product)}>{CartIcon} Add to cart</button>
            </div>
        </div>
    );
};

export default Product;