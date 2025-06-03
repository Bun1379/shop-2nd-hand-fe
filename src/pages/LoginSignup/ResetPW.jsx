import React from 'react';
import LoginLayout from '../../layouts/LoginLayout/LoginLayout';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { useState } from 'react';
import AuthAPI from '../../api/AuthAPI';
import { toast } from 'react-toastify';
import PasswordInput from '../../components/PasswordInput/PasswordInput';

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
                <label htmlFor="otp">Nhập otp đã gửi vào {email}:</label>
                <input
                    className="form-control border border-success border-2 mb-3"
                    type="text"
                    id="otp"
                    placeholder='Nhập mã OTP'
                    value={otp}
                    onChange={(e) => setotp(e.target.value)}
                    required />

                <label htmlFor="newPassword">Mật khẩu:</label>

                <div className="rounded border border-success border-2 mb-3">
                    <PasswordInput
                        value={newPassword}
                        onChange={(e) => setnewPassword(e.target.value)}
                        placeholder="Nhập mật khẩu mới"
                    />
                </div>

                <label htmlFor="confirmPassword">Nhập lại mật khẩu:</label>
                <div className="rounded border border-success border-2 mb-3">
                    <PasswordInput
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Nhập lại mật khẩu mới"
                    />
                </div>
                <button type="submit">Xác nhận</button>
            </form>
        </LoginLayout >
    );
};

export default ResetPW;
