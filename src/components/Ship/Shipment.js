import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart, clearLocalShoppingCart} from '../../utilities/databaseManager';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const Shipment = () => {
    const { register, handleSubmit, errors } = useForm();
    const [shipInfo, setShipInfo] = useState(null);
    const [orderId, setOrderId] = useState(null);

    const auth = useAuth();
    const stripePromise = loadStripe('pk_test_4pfuBqtBCqB4JSXwhyVNheDj00eX568AWv'); // test key for stripe
    const onSubmit = data => {
        setShipInfo(data);
    }
    const handlePlaceOrder = (payment) => {
         //TODO: Bulbul Move this after payment
         const savedCart = getDatabaseCart();
         const orderDetails = {
             email: auth.user.email,
             cart: savedCart,
             shipment: shipInfo,
             payment: payment
         };
 
         fetch('http://localhost:3000/placeOrder', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(orderDetails)
         })
             .then(res => res.json())
             .then(order => {
                 setOrderId(order._id);
                 clearLocalShoppingCart();
             
                 // clear local storage cart
                 // give thanks to user
             })
    }

    return (
        <div className="container">
            <div className="row">
                <div style={{ display: shipInfo && 'none' }} className="col-md-6">
                    <h3>Shipping Information</h3>
                    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

                        <input name="name"
                            defaultValue={auth.user.name}
                            ref={register({ required: true })}
                            placeholder="Your Name" />
                        {
                            errors.name && <span className="error">Name is required</span>
                        }

                        <input name="email"
                            defaultValue={auth.user.email}
                            ref={register({ required: true })}
                            placeholder="Your Email" />
                        {
                            errors.email && <span className="error">Email is required</span>
                        }
                        <input name="AddressLine1" ref={register({ required: true })} placeholder="Address Line 1" />
                        {
                            errors.AddressLine1 && <span className="error">Address is required</span>
                        }
                        <input name="AddressLine2" ref={register} placeholder="Address Line 1" />
                        <input name="city" ref={register({ required: true })} placeholder="City" />
                        {
                            errors.city && <span className="error">City is required</span>
                        }
                        <input name="country" ref={register({ required: true })} placeholder="Country" />
                        {
                            errors.country && <span className="error">Country is required</span>
                        }
                        <input name="zipcode" ref={register({ required: true })} placeholder="Zip Code" />
                        {
                            errors.zipcode && <span className="error">Zip Code is required</span>
                        }

                        <input type="submit" />
                    </form>
                </div>
                <div
                    style={{
                        marginTop: '200px',
                        display: shipInfo ? 'block' : 'none'
                    }} className="col-md-6">
                    <h3>Payment Information</h3>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm handlePlaceOrder = {handlePlaceOrder} />
                    </Elements>
                    {
                        orderId && <div>
                            <h3>Thank You For Shopping With US</h3>
                            <p>Your Order ID is: {orderId}</p>
                        </div>
                    }
                </div>
            </div>
        </div>

    )
};

export default Shipment;