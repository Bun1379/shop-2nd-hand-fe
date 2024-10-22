import React, { useState } from "react";
import { toast } from "react-toastify";
import AuthAPI from "../../../api/AuthAPI";

const UpdatePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordVerified, setIsPasswordVerified] = useState(false);

    const handleVerifyPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthAPI.VerifyPassword(currentPassword);
            if (response.data.success) {
                setIsPasswordVerified(true);
                toast.success("Mật khẩu hợp lệ, vui lòng nhập mật khẩu mới.");
            } else {
                toast.error("Mật khẩu hiện tại không đúng.");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi: " + error.message);
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("Mật khẩu mới và mật khẩu xác nhận không khớp!");
            return;
        }

        try {
            // Gọi API thay đổi mật khẩu
            const response = await AuthAPI.ResetPW(newPassword);
            if (response.data.success) {
                toast.success("Mật khẩu đã được thay đổi thành công!");
            } else {
                toast.error("Đã xảy ra lỗi, vui lòng thử lại.");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi cập nhật mật khẩu.");
        }
    };

    return (
        <form onSubmit={isPasswordVerified ? handleUpdatePassword : handleVerifyPassword}>
            {/* Nhập mật khẩu hiện tại */}
            {!isPasswordVerified && (
                <>
                    <div className="mb-3">
                        <label htmlFor="currentPassword" className="form-label">
                            Nhập mật khẩu hiện tại:
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Xác nhận mật khẩu hiện tại
                    </button>
                </>
            )}

            {/* Nhập mật khẩu mới nếu đã xác nhận mật khẩu hiện tại thành công */}
            {isPasswordVerified && (
                <>
                    <div className="mb-3">
                        <label htmlFor="newPassword" className="form-label">
                            Mật khẩu mới:
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">
                            Xác nhận mật khẩu mới:
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success">
                        Cập nhật mật khẩu
                    </button>
                </>
            )}
        </form>
    );
};

export default UpdatePassword;
