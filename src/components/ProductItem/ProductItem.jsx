import React from 'react';
import './ProductItem.css';

const ProductItem = () => {
    const images = "https://mabustudio.com/wp-content/uploads/2020/01/chup-trai-quan-ao-1-scaled.jpg"
    const productName = "Áo thun nam"
    const price = 100000
    return (
        <div className="product-item">
            <img src={images} alt={productName} />
            <h3>{productName}</h3>
            <p>{price.toLocaleString()} đ</p>
        </div>
    );
};
export default ProductItem;
