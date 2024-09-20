import React from 'react';
import LoginLayout from '../../layouts/LoginLayout/LoginLayout';

const Verify = () => {
    return (
        <LoginLayout>
            <h2>Nhập OTP</h2>
            <form>
                <div>
                    <input type="text" required />
                </div>
                <button type="submit">Xác nhận</button>
            </form>
        </LoginLayout>
    );
};

export default Verify;
