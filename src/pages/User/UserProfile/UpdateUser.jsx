import React, { useState, useEffect } from 'react';
import UserAPI from '../../../api/UserAPI';
import { toast } from 'react-toastify';

const UpdateUser = () => {
    const userInfo = JSON.parse(localStorage.getItem("user"));

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        gender: '',
        address: '',
    });

    useEffect(() => {
        if (userInfo) {
            setFormData({
                username: userInfo.username || "",
                email: userInfo.email || "",
                phone: userInfo.phone || "",
                gender: userInfo.gender || "",
                address: userInfo.address || "",
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            const response = await UserAPI.UpdateUser(formData);
            console.log(response);
            toast.success(response.data.EM);
            localStorage.setItem("user", JSON.stringify({ ...userInfo, ...formData }));
        } catch (error) {
            toast.error(error.response.data.EM);
        }
    };

    return (
        <div>
            <h4>Cập nhật thông tin cá nhân</h4>
            <form onSubmit={updateUser}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <span className="form-control bg-secondary bg-opacity-25">{formData.email}</span>
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Họ tên:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        placeholder="Nhập tên của bạn"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Số điện thoại:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        placeholder="Nhập số điện thoại"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="gender" className="form-label">Giới tính:</label>
                    <select
                        className="form-select"
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <option value="">Chọn giới tính</option>
                        <option value="MALE">Nam</option>
                        <option value="FEMALE">Nữ</option>
                        <option value="OTHER">Khác</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Địa chỉ:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address" // Đặt name cho input
                        placeholder="Nhập địa chỉ"
                        value={formData.address}
                        onChange={handleChange} // Gọi handleChange
                    />
                </div>
                <button type="submit" className="btn btn-success w-100">Cập nhật</button>
            </form>
        </div>
    );
};

export default UpdateUser;
