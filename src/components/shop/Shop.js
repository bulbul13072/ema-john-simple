import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Products from '../products/Products';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [product, setProduct] = useState(first10);
    
    return (
        <div className="shop-container">
            <div className="product-container">
        
                {
                product.map(products => <Products>{products.name}</Products>)
                }
    
        </div>
        <div className="cart-container">
            <h1>This is Cart</h1>
        </div>


        </div>
    );
};

export default Shop;