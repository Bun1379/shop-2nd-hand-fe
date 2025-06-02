import React, { useState } from "react";
import { toast } from "react-toastify";
import AuthAPI from "../../../api/AuthAPI";
import PasswordInput from "../../../components/PasswordInput/PasswordInput";

const UpdatePassword = ({ email }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [OTP, setOTP] = useState("");
  const handleVerifyPassword = async (e) => {
    e.preventDefault();
    try {
      await AuthAPI.VerifyPassword({
        email: email,
        password: currentPassword,
      });
      toast.success("Mật khẩu chính xác, vui lòng đợi trong giây lát");
      AuthAPI.SendOTP({
        email,
      });
      setIsPasswordVerified(true);
    } catch (error) {
      toast.error("Đã xảy ra lỗi: " + error.response.data.EM);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu mới và mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      await AuthAPI.ResetPW({
        email: email,
        otp: OTP,
        newPassword: newPassword,
      });
      toast.success("Mật khẩu đã được thay đổi thành công!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setOTP("");
      setIsPasswordVerified(false);
    } catch (error) {
      toast.error("Đã xảy ra lỗi: " + error.response.data.EM);
    }
  };

  return (
    <form
      onSubmit={
        isPasswordVerified ? handleUpdatePassword : handleVerifyPassword
      }
    >
      {/* Nhập mật khẩu hiện tại */}
      {!isPasswordVerified && (
        <>
          <div className="mb-3">
            <label htmlFor="currentPassword" className="form-label">
              Nhập mật khẩu hiện tại:
            </label>
            <PasswordInput
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Nhập mật khẩu hiện tại"
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
            <label htmlFor="OTP" className="form-label">
              Nhập OTP được gửi đến email của bạn:
            </label>
            <input
              type="text"
              className="form-control"
              id="OTP"
              placeholder="Nhập mã OTP"
              value={OTP}
              onChange={(e) => setOTP(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">
              Mật khẩu mới:
            </label>
            <PasswordInput
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
            <PasswordInput
              id="confirmPassword"
              value={confirmPassword}
              placeholder="Xác nhận mật khẩu mới"
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
