import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../fakeData';
import Products from '../components/products/Products';

const ProductDetail = () => {
    const {productKey} = useParams();
    const product = fakeData.find(pd => pd.key === productKey);
    console.log(product);
    return (
        <div>
            <h1> {productKey} Here is some specification about your product </h1>
            <Products product={product} showAddToCart={false}></Products>
            

        </div>
    );
};

export default ProductDetail;