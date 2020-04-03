import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../cart/Cart';
import thumbsUp from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handlePlaceOrder = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }

const removeProduct = (productKey) => {
    const newCart = cart.filter(pd => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
}

    useEffect(()=> {
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts= productKeys.map(key => {
            const product = fakeData.find(pd => pd.key===key);
            product.quantity = savedCart[key];
            return product;

        });
        setCart(cartProducts);
    }, []);
    let thankYou;
    if (orderPlaced){
            thankYou = <div> <img src={thumbsUp} alt=""/> <h1> Siriya Ati Bandhiliso </h1> </div>
    }
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem
                        key = {pd.key}
                        removeProduct = {removeProduct}
                        product={pd}></ReviewItem>)
                }
                {
                    thankYou
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button className="main-button" onClick={handlePlaceOrder}>Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;