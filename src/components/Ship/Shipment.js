import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useAuth } from '../Login/useAuth';

const Shipment = () => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => { console.log(data) };
    const auth = useAuth();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="ship-form">

            <input name="name" ref={register({ required: true })} placeholder="Your Name" defaultValue={auth.user.name} />
            {
                errors.name && <span className="error">Name is required</span>
            }

            <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Your Email" />
            {
                errors.email && <span className="error">Email is required</span>
            }

            <input name="addressLine1" ref={register({ required: true })} placeholder="Address Line 1" />
            {errors.addressLine1 && <span className="error">Address Line 1 is required</span>}
            <input name="addressLine2" ref={register({ required: true })} placeholder="Address Line 2 (optional)" />
            <input name="City" ref={register({ required: true })} placeholder="City Name" />
            {errors.city && <span className="error">City is required</span>}
            <input name="Country" ref={register({ required: true })} placeholder="Country" />
            {errors.country && <span className="error">Country is required</span>}
            <input name="zipCode" ref={register({ required: true })} placeholder="Zip Code" />
            {errors.zipCode && <span className="error">Zip Code is required</span>}

            <input type="submit" />
        </form>
    )
};

export default Shipment;