import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook } from 'react-icons/fa';

function Footer() {
    return (
        <div className="bg-primary text-white py-5 mt-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h3 className="text-warning">Liên hệ</h3>
                        <p>Địa chỉ: Số 1, Võ Văn Ngân, Thủ Đức, TP.HCM</p>
                        <p>Điện thoại: 0123 456 789</p>
                        <p>Email: shopndhand13@gmail.com</p>
                    </div>
                    <div className="col-md-4">
                        <h3 className="text-warning">Liên kết</h3>
                        <p><Link to="/" className="text-decoration-none text-white">Trang chủ</Link></p>
                        <p><Link to="/search" className="text-decoration-none text-white">Sản phẩm</Link></p>
                        <p><Link to="/policy" className="text-decoration-none text-white">Chính sách</Link></p>
                    </div>
                    <div className="col-md-4">
                        <h3 className="text-warning">Giới thiệu</h3>
                        <p>Cửa hàng quần áo giá rẻ, đa dạng, nhiều mẫu mã, đảm bảo quần áo đảm bảo chất lượng.</p>
                        <a href="https://www.facebook.com/profile.php?id=61569870952631" className="text-decoration-none text-white" target="_blank" rel="noopener noreferrer"><FaFacebook className="me-1" size={20} />Ishio Store</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
