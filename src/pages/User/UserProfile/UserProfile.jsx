import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserProfile.css';
import UpdateUser from './UpdateUser';
import Order from '../Order/Order';
const UserAccount = () => {
    const [activeSection, setActiveSection] = useState('profile');

    const renderContent = () => {
        switch (activeSection) {
            case 'profile':
                return <UpdateUser />
            case 'orders':
                return <Order />
            case 'notifications':
                return <div><h4>Thông báo</h4><p>Hiển thị thông báo của bạn.</p></div>;
            case 'logout':
                return <div><h4>Đăng xuất</h4><p>Bạn đã đăng xuất.</p></div>;
            default:
                return null;
        }
    };

    return (
        <div className="container" style={{ marginTop: '100px' }}>
            <div className="row">
                <div className="user-profile col-md-3">
                    <ul className="list-group">
                        <li className={`list-group-item ${activeSection === 'profile' ? 'active' : ''}`} onClick={() => setActiveSection('profile')}>Thông tin cá nhân</li>
                        <li className={`list-group-item ${activeSection === 'orders' ? 'active' : ''}`} onClick={() => setActiveSection('orders')}>Đơn mua</li>
                        <li className={`list-group-item ${activeSection === 'notifications' ? 'active' : ''}`} onClick={() => setActiveSection('notifications')}>Thông báo</li>
                        <li className={`list-group-item ${activeSection === 'logout' ? 'active' : ''}`} onClick={() => setActiveSection('logout')}>Đăng xuất</li>
                    </ul>
                </div>
                <div className="col-md-9">
                    <div className="border p-3 border-success border-2 rounded" >
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAccount;
