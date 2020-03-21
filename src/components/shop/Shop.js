import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Products from '../products/Products';
import Cart from '../cart/Cart';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [product, setProduct] = useState(first10);
    const [cart, setCart] = useState([]);

const handleAddProduct = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
}
    
    return (
        <div className="shop-container">
            <div className="product-container">
        
                {
                product.map(pd => <Products
                    handleAddProduct = {handleAddProduct}
                    product={pd}></Products>)
                }
    
        </div>
        <div className="cart-container">
            <Cart cart={cart}> </Cart>
        </div>


        </div>
    );
};

export default Shop;