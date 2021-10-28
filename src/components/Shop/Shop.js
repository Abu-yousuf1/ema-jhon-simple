import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../cart/Cart';
import useCart from '../../hook/useCart';
import useProducts from '../../hook/useProducts';
import Product from '../product/Product';
import "./Shop.css"

const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    const [display, setDisplay] = useState([])

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/Abu-yousuf1/ema-jhon-simple/main/public/products.json')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
                setDisplay(data)
            })
    }, [])



    useEffect(() => {
        const saveCart = getStoredCart();
        if (products.length) {
            const storedCard = []
            for (const key in saveCart) {
                const addedProduct = products.find(pd => pd.key === key)
                if (addedProduct) {
                    const quantity = saveCart[key];
                    addedProduct.quantity = quantity;
                    storedCard.push(addedProduct)
                }
            }
            setCart(storedCard)
        }
    }, [products])


    const handleCart = (product) => {
        const exist = cart.find(pd => pd.key === product.key)

        let newCart = [];

        if (exist) {
            const rest = cart.filter(pd => pd.key !== product.key)
            exist.quantity = exist.quantity + 1
            newCart = [...rest, product]

        } else {
            product.quantity = 1;
            newCart = [...cart, product]

        }
        // const newCart = [...cart, products]
        setCart(newCart)
        addToDb(product.key);
    }

    const handleSearch = event => {
        const searchText = event.target.value;
        const matching = products.filter(pd => pd.name.toLowerCase().includes(searchText.toLowerCase()))
        setDisplay(matching)
    }

    return (
        <>
            <div className="search-container">
                <input type="text" onChange={handleSearch} placeholder="Search Product" />
            </div>
            <div className="shop-container">
                <div className="product-container">
                    <h5>Got Product :{display.length}</h5>
                    {
                        display.map(pd => <Product
                            key={pd.key}
                            product={pd}
                            handleCart={handleCart}
                        />)
                    }
                </div>

                <div>
                    <Cart carts={cart} >
                        <Link to="/review">
                            <button className="btn">Order Review</button>
                        </Link>
                    </Cart>
                </div>
            </div>
        </>
    );
};

export default Shop;