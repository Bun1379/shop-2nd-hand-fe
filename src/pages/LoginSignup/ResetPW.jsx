import React from 'react';
import LoginLayout from '../../layouts/LoginLayout/LoginLayout';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { useState } from 'react';
import AuthAPI from '../../api/AuthAPI';
import { toast } from 'react-toastify';
const ResetPW = () => {
    const [otp, setotp] = useState('');
    const [newPassword, setnewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error('Mật khẩu không khớp!');
            return;
        }
        try {
            await AuthAPI.ResetPW({
                email,
                otp,
                newPassword,
            });
            toast.success('Đặt lại mật khẩu thành công!');
            navigate('/login');
        } catch (error) {
            toast.error('Lỗi: ' + error.response.data.EM);
        }
    };
    return (
        <LoginLayout>
            <h2>
                <Link to="/forgot-pw"><FaArrowLeft /></Link>
                <p>Đặt lại mật khẩu</p>
            </h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="otp">Nhập otp đã gửi vào {email}:</label>
                    <input
                        type="text"
                        id="otp"
                        value={otp}
                        onChange={(e) => setotp(e.target.value)}
                        required />
                </div>
                <div>
                    <label htmlFor="newPassword">Mật khẩu:</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setnewPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Nhập lại mật khẩu:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Xác nhận</button>
            </form>
        </LoginLayout >
    );
};

export default ResetPW;
