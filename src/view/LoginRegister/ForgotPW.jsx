import React from 'react';
import LoginLayout from '../../layouts/LoginLayout/LoginLayout';

const ForgotPW = () => {
    return (
        <LoginLayout>
            <h2>Quên mật khẩu</h2>
            <form>
                <div>
                    <label htmlFor="email">Nhập email bạn đã đăng ký:</label>
                    <input type="email" id="email" required />
                </div>
                <button type="submit">Xác nhận</button>
            </form>
        </LoginLayout>
    );
};

export default ForgotPW;
