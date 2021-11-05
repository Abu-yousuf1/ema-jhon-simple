import { useState, useEffect } from 'react';
import { getStoredCart } from '../utilities/fakedb';

const useCart = () => {

    const [cart, setCart] = useState([])



    useEffect(() => {
        const saveCart = getStoredCart();
        const keys = Object.keys(saveCart)
        fetch('https://pacific-shelf-22590.herokuapp.com/products/byKeys', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(keys)
        })
            .then(res => res.json())
            .then(product => {
                if (product.length) {
                    const storedCard = []
                    for (const key in saveCart) {
                        const addedProduct = product.find(pd => pd.key === key)
                        if (addedProduct) {
                            const quantity = saveCart[key];
                            addedProduct.quantity = quantity;
                            storedCard.push(addedProduct)
                        }
                    }
                    setCart(storedCard)
                }
            })

    }, [])
    return [cart, setCart]
}
export default useCart;