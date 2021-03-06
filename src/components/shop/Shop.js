import React, { useState } from 'react';
import './Shop.css';
import Products from '../products/Products';
import Cart from '../cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import {Link} from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);                
    const shuffle = a => {
        for (let i = a.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [a[i - 1], a[j]] = [a[j], a[i - 1]];
        }
    };
    useEffect(()=> {
        fetch('http://localhost:3000/products')
        .then(res => res.json())
        .then(data => {
            shuffle(data);
            setProducts(data);
        })
    }, []);

    useEffect(()=> {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        if(products.length > 0){
            const previousCart = productKeys.map( existingKey => {
                const product = products.find( pd => pd.key === existingKey);
                product.quantity = savedCart[existingKey];
                return product;
            } )
            setCart(previousCart);
        }
    }, [products]);

const handleAddProduct = (product) => {
    const toBeAddedKey = product.key;
    const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
    let count = 1;
    let newCart;
    if(sameProduct){
        count = sameProduct.quantity + 1;
        sameProduct.quantity = count;
        const others = cart.filter(pd => pd.key !== toBeAddedKey);
        newCart = [...others, sameProduct];
    }
    else{
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
                    products.map(pd => <Products 
                        key={pd.key}
                        showAddToCart={true}
                        handleAddProduct = {handleAddProduct}
                        product={pd}
                        ></Products>)
                }
        </div>
        <div className="float-container">
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to='/review'>
                        <button className="main-button"> Review Order </button>
                    </Link>
                </Cart>
            </div>
        </div>


        </div>
    );
};

export default Shop;