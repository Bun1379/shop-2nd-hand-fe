import React from 'react';
import './Home.css';
import UserLayout from '../../../layouts/UserLayout/UserLayout';
import ProductItem from '../../../components/ProductItem/ProductItem';
function Home() {
    return (
        <>
            <UserLayout>
                <div className="home-new-product-container">
                    <h1>Hàng mới về</h1>
                    <div className="home-new-product-container-list">
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                    </div>
                </div>
            </UserLayout>
        </>
    );
}

export default Home;