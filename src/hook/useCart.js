import { useState, useEffect } from 'react';
import { getStoredCart } from '../utilities/fakedb';

const useCart = product => {

    const [cart, setCart] = useState([])

    useEffect(() => {
        const saveCart = getStoredCart();
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
    }, [product])
    return [cart, setCart]
}
export default useCart;