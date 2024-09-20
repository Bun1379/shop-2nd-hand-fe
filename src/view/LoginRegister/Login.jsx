import React from 'react';
import LoginLayout from '../../layouts/LoginLayout/LoginLayout';

const Login = () => {
    return (
        <LoginLayout>
            <h2>Đăng Nhập</h2>
            <form>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" required />
                </div>
                <div>
                    <label htmlFor="password">Mật khẩu:</label>
                    <input type="password" id="password" required />
                </div>
                <button type="submit">Đăng Nhập</button>
            </form>
        </LoginLayout>
    );
};

export default Login;
