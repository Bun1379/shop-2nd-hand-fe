import React from 'react';
import LoginLayout from '../../layouts/LoginLayout/LoginLayout';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import AuthAPI from '../../api/AuthAPI';
import { toast } from 'react-toastify';

const Verify = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const [otp, setotp] = useState('');
    const email = location.state?.email;
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthAPI.VerifiedUser({
                email,
                otp
            });

            if (response.status === 200) {
                toast.success('Xác thực thành công!');
                navigate('/login');
            }
        } catch (error) {
            toast.error('Xác thực thất bại: ' + error.response.data.EM);
        }
    };
    return (
        <LoginLayout>
            <h2>Xác thực tài khoản</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="otp">Nhập mã OTP được gửi về email đăng ký của bạn</label>
                    <input
                        className="form-control border border-success border-2 mb-3"
                        type="text"
                        id="otp"
                        value={otp}
                        placeholder='Nhập mã OTP'
                        onChange={(e) => setotp(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Xác nhận</button>
            </form>
        </LoginLayout>
    );

};

export default Verify;
