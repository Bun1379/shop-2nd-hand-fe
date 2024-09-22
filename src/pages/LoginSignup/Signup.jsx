import React from 'react';
import LoginLayout from '../../layouts/LoginLayout/LoginLayout';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { useState } from 'react';
import AuthAPI from '../../api/authAPI';
import { toast } from 'react-toastify';

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) { // Kiểm tra mật khẩu
            toast.error('Mật khẩu không khớp!');
            return;
        }

        try {
            const response = await AuthAPI.Signup({
                email,
                password
            });
            if (response.status === 200) {
                toast.success('Đăng ký thành công!');
                await AuthAPI.SendOTP({
                    email
                });
                navigate('/verify', { state: { email } });
            }
        } catch (error) {
            toast.error('Đăng ký thất bại: ' + error.response.data.EM);
        }
    };

    return (
        <LoginLayout>
            <h2>
                <Link to="/login"><FaArrowLeft /></Link>
                <p>Đăng ký</p>
            </h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Mật khẩu:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                <button type="submit">Tạo tài khoản</button>
            </form>
        </LoginLayout>
    );
};

export default Signup;
