import React from 'react';
import { useHistory } from 'react-router';
import { clearTheCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../cart/Cart';
import useCart from '../../hook/useCart';
import useProducts from '../../hook/useProducts';
import ReviewItem from '../ReviewItem/ReviewItem';

import "../Shop/Shop.css"

const OrderReview = () => {
    const [products] = useProducts()
    const [cart, setCart] = useCart()
    const history = useHistory();

    const handleRemove = key => {
        const removedCart = cart.filter(pd => pd.key !== key)
        setCart(removedCart)
        removeFromDb(key)
    }
    const handlePlaceOrder = () => {
        history.push("/shipping")
        // setCart([])
        // clearTheCart()
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem
                        key={pd.key}
                        product={pd}
                        handleRemove={handleRemove}

                    />)
                }
            </div>
            <div className="">
                <Cart carts={cart}>
                    <button onClick={handlePlaceOrder} className="btn">Proceed to shipping</button>
                </Cart>
            </div>
        </div>
    );
};

export default OrderReview;