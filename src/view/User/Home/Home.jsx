import React from 'react';
import './Home.css';
import UserLayout from '../../../layouts/UserLayout';
function Home() {
    return (
        <>
            <UserLayout>
                <div className="home">
                    <h1>Welcome to the Home Page</h1>
                    <p>This is the home page of the application.</p>
                </div>
            </UserLayout>
        </>
    );
}

export default Home;