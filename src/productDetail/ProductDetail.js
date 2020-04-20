import React from 'react';
import { useParams } from 'react-router-dom';
import Products from '../components/products/Products';
import { useState } from 'react';
import { useEffect } from 'react';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState(null);
    useEffect(()=> {
        fetch('http://localhost:3000/product/'+productKey)
        .then (res => res.json())
        .then (data => {
            setProduct(data);
        })
    }, [productKey]);
    return (
        <div>
            <h1> {productKey} Here is some specification about your product </h1>
            {
                product && <Products product={product} showAddToCart={false}></Products>
            }
            

        </div>
    );
};

export default ProductDetail;