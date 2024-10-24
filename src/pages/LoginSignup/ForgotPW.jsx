import React from 'react';
import LoginLayout from '../../layouts/LoginLayout/LoginLayout';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { useState } from 'react';
import { toast } from 'react-toastify';
import AuthAPI from '../../api/AuthAPI';
const ForgotPW = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await AuthAPI.SendOTP({
                email
            });
            navigate('/reset-pw', { state: { email } });
        } catch (error) {
            toast.error('Gửi OTP thất bại: ' + error.response.data.EM);
        }
    };
    return (
        <LoginLayout>
            <h2>
                <Link to="/login"><FaArrowLeft /></Link>
                <p>Quên mật khẩu</p>
            </h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Nhập email bạn đã đăng ký:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                </div>
                <button type="submit">Xác nhận</button>
            </form>
        </LoginLayout >
    );
};

export default ForgotPW;
