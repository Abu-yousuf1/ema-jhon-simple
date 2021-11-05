import React from 'react';
import { useForm } from 'react-hook-form';
import "./Shipping.css"
import useAuth from './../../hook/useAuth';
import { clearTheCart, getStoredCart } from '../../utilities/fakedb';

const Shipping = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const saveCart = getStoredCart();
        data.order = saveCart

        fetch('http://localhost:5000/orders', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert("Order processed successfully.")
                    clearTheCart();
                    reset();
                }
            })
        // console.log(data)
    };
    const { user } = useAuth();
    return (
        <div className="shipping-form">
            <form onSubmit={handleSubmit(onSubmit)}>

                <input placeholder="User Name" defaultValue={user.displayName} {...register("name")} />


                <input placeholder="Write your email" defaultValue={user.email} {...register("email", { required: true })} />

                {errors.exampleRequired && <span className="error">This field is required</span>}
                <input placeholder="city"  {...register("city")} />
                <input placeholder="Present Address" {...register("present Address")} />

                <input type="submit" />
            </form>
        </div>
    );
};

export default Shipping;