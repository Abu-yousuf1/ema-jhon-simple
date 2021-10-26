import React from 'react';
import { useForm } from 'react-hook-form';
import "./Shipping.css"
import useAuth from './../../hook/useAuth';

const Shipping = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
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