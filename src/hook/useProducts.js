import { useState, useEffect } from 'react';


const useProducts = () => {

    const [products, setProducts] = useState([])
    const [display, setDisplay] = useState([])
    useEffect(() => {
        fetch('./products.JSON')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
                setDisplay(data)
            })
    }, [])
    return [products, setProducts, display, setDisplay]
}

export default useProducts;