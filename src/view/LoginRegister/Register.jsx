import React from 'react';
import LoginLayout from '../../layouts/LoginLayout/LoginLayout';

const Register = () => {
    return (
        <LoginLayout>
            <h2>Đăng ký</h2>
            <form>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" required />
                </div>
                <div>
                    <label htmlFor="password">Mật khẩu:</label>
                    <input type="password" id="password" required />
                </div>
                <div>
                    <label htmlFor="password">Nhập lại mật khẩu:</label>
                    <input type="password" id="password" required />
                </div>
                <button type="submit">Tạo tài khoản</button>
            </form>
        </LoginLayout>
    );
};

export default Register;
