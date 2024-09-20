import React from 'react';
import './LoginLayout.css';

const LoginLayout = ({ children }) => {
    return (
        <div className="login-layout">
            <main className="login-layout-content">
                {children}
            </main>
        </div>
    );
};

export default LoginLayout;
