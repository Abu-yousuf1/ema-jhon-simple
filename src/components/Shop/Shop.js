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
    const [cart, setCart] = useCart()
    const [display, setDisplay] = useState([])
    const [page, setPage] = useState(0)
    const [pageCount, setPageCount] = useState(0)
    const size = 10;

    useEffect(() => {
        fetch(`https://pacific-shelf-22590.herokuapp.com/products?page=${page}&&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products)
                setDisplay(data.products)
                const count = data.count;
                const pageNumber = Math.ceil(count / size)
                setPageCount(pageNumber)
            })
    }, [page])



    // useEffect(() => {
    //     const saveCart = getStoredCart();
    //     if (products.length) {
    //         const storedCard = []
    //         for (const key in saveCart) {
    //             const addedProduct = products.find(pd => pd.key === key)
    //             if (addedProduct) {
    //                 const quantity = saveCart[key];
    //                 addedProduct.quantity = quantity;
    //                 storedCard.push(addedProduct)
    //             }
    //         }
    //         setCart(storedCard)
    //     }
    // }, [products])


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

                    <div className="pagination">
                        {
                            [...Array(pageCount).keys()].map(number => <button
                                key={number}

                                onClick={() => setPage(number)}
                                className={number === page ? "active" : ""}
                            >{number + 1}</button>)
                        }
                    </div>
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