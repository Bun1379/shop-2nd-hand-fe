import React from 'react';
import LoginLayout from '../../layouts/LoginLayout/LoginLayout';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import './ForgotPW.css';
const ForgotPW = () => {
    return (
        <LoginLayout>
            <h2 className="forgotPW-title">
                <Link to="/login" className="forgotPW-back-arrow"><FaArrowLeft /></Link>
                <p>Quên mật khẩu</p>
            </h2>
            <form>
                <div>
                    <label htmlFor="email">Nhập email bạn đã đăng ký:</label>
                    <input type="email" id="email" required />
                </div>
                <button type="submit">Xác nhận</button>
            </form>
        </LoginLayout >
    );
};

export default ForgotPW;
