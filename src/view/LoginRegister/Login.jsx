import React, { useState } from 'react';
import LoginLayout from '../../layouts/LoginLayout/LoginLayout';
import AuthAPI from '../../api/AuthAPI';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthAPI.Login({
                email,
                password
            });

            if (response.status === 200) {
                console.log('Đăng nhập thành công', response.data);
                localStorage.setItem('token', response.data.DT.token);
                localStorage.setItem('user', JSON.stringify(response.data.DT.user));
                localStorage.setItem('roleID', response.data.DT.user.roleID);
                window.location.href = '/';
            }
        } catch (err) {
            console.error('Đăng nhập thất bại:', err);
        }
    };
    return (
        <LoginLayout>
            <h2>Đăng Nhập</h2>
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
                <button type="submit">Đăng Nhập</button>
            </form>
        </LoginLayout>
    );
};

export default Login;
