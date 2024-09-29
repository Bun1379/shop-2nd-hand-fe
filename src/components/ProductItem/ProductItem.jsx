import React from 'react';
import './ProductItem.css';
import { useNavigate } from 'react-router-dom';

const ProductItem = (item) => {
    const navigate = useNavigate();
    const product = item.product;
    const handleClick = () => {
        navigate('/product-detail', { state: { product } });
    };

    return (
        <div className="product-item" onClick={handleClick} style={{ cursor: 'pointer' }}>
            <img src={item.product.images[0]} alt={item.product.productName} />
            <h3>{item.product.productName}</h3>
            <p>{item.product.price.toLocaleString()} đ</p>
        </div>
    );
};
export default ProductItem;
