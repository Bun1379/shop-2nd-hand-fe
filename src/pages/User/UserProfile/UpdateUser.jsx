import React, { useState, useEffect } from 'react';
import UserAPI from '../../../api/UserAPI';
import { toast } from 'react-toastify';
import UploadAPI from '../../../api/UploadAPI';
import { useSocket } from '../../../layouts/SocketContext';
const UpdateUser = ({ userInfo }) => {
    const { setUser } = useSocket();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        gender: '',
    });
    const [newAvatar, setNewAvatar] = useState(userInfo?.image || '');
    const [fileAvatar, setFileAvatar] = useState(null);

    // const isValidPhoneNumber = (phone) => {
    //     const phoneRegex = /^(0[3|5|7|8|9]\d{8})$/;
    //     return phoneRegex.test(phone);
    // };

    useEffect(() => {
        if (userInfo) {
            setFormData({
                username: userInfo.username || "",
                email: userInfo.email || "",
                phone: userInfo.phone || "",
                gender: userInfo.gender || "",
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

    // Xử lý chọn ảnh
    const handleAvatarChange = (e) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        const file = e.target.files[0];
        if (file) {
            setNewAvatar(URL.createObjectURL(file));
            setFileAvatar(file);
        }
    };

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('username', formData.username);
            // if (!isValidPhoneNumber(formData.phone)) {
            //     toast.error('Số điện thoại không hợp lệ!');
            //     return;
            // }
            formDataToSend.append('phone', formData.phone);
            formDataToSend.append('gender', formData.gender);
            let avatarUrl = userInfo.image;
            if (fileAvatar) {
                try {
                    const Uploadresponse = await UploadAPI.Upload(fileAvatar);
                    formDataToSend.append('image', Uploadresponse.data.DT);
                    avatarUrl = Uploadresponse.data.DT;
                    setFileAvatar(null);
                } catch (error) {
                    console.error('Error uploading avatar:', error.response?.data?.EM || error.message);
                }
            }

            const response = await UserAPI.UpdateUser(formDataToSend);
            toast.success(response.data.EM);

            const updatedUser = {
                ...userInfo,
                ...formData,
                image: avatarUrl || userInfo.image
            };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);
        } catch (error) {
            // toast.error(error.response.data.EM);
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="row">
            <div className="col-md-8">
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
                    <button type="submit" className="btn btn-primary w-100">Cập nhật</button>
                </form>
            </div>

            {/* Hiển thị Avatar */}
            <div className="col-md-4 text-center">
                <h5>Ảnh đại diện</h5>
                <img
                    src={newAvatar || "https://via.placeholder.com/150"}
                    alt="Avatar"
                    className="img-fluid rounded-circle mb-3 border border-2 border-primary"
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                />
                {/* Nút chọn ảnh nằm dưới ảnh */}
                <div className="mt-3">
                    <label htmlFor="avatar" className="btn btn-primary">
                        Chọn ảnh
                    </label>
                    <input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        className="form-control d-none"
                        onChange={handleAvatarChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;
