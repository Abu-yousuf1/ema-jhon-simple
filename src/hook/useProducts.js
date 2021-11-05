import { useState, useEffect } from 'react';


const useProducts = () => {

    const [products, setProducts] = useState([])
    const [display, setDisplay] = useState([])
    useEffect(() => {
        fetch('https://pacific-shelf-22590.herokuapp.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data.products)
                setDisplay(data.products)
            })
    }, [])
    return [products, setProducts, display, setDisplay]
}

export default useProducts;