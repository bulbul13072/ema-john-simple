import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Products from '../products/Products';
import Cart from '../cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import {Link} from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [product, setProduct] = useState(first10);
    const [cart, setCart] = useState([]);

    useEffect(()=> {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey);
            product.quantity = savedCart[existingKey];
            return product;
        })
        setCart(previousCart);
    }, [])

const handleAddProduct = (product) => {
    const toBeAddedKey = product.key;
    const sameProduct = cart.find(pd => pd.key === product.key);
    let count = 1;
    let newCart;
    if (sameProduct) {
        const count = sameProduct.quantity + 1;
        sameProduct.quantity = count;
        const others = cart.filter (pd => pd.key !== toBeAddedKey);
        newCart = [...others, sameProduct];
    }
else {
    product.quantity = 1;
    newCart = [...cart, product];
}

setCart(newCart);
addToDatabaseCart(product.key, count);
}
    
    return (
        <div className="twin-container">
            <div className="product-container">
        
                {
                product.map(pd => <Products
                    key = {pd.key}
                    handleAddProduct = {handleAddProduct}
                    showAddToCart = {true}
                    product={pd}></Products>)
                }
    
        </div>
        <div className="cart-container">
            <Cart cart={cart}>
                <Link to='/review'>
                     <button className="main-button"> Review Order </button>
                </Link>
            </Cart>
        </div>


        </div>
    );
};

export default Shop;