import React from "react";
import LoginLayout from "../../layouts/LoginLayout/LoginLayout";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import AuthAPI from "../../api/AuthAPI";
import { Spinner } from "react-bootstrap";
const ForgotPW = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await AuthAPI.SendOTP({
        email,
      });
      toast.success("Gửi OTP thành công!");
      setLoading(false);
      navigate("/reset-pw", { state: { email } });
    } catch (error) {
      setLoading(false);
      toast.error("Gửi OTP thất bại: " + error.response.data.EM);
    }
  };
  return (
    <LoginLayout>
      <h2>
        <Link to="/login">
          <FaArrowLeft />
        </Link>
        <p>Quên mật khẩu</p>
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Nhập email bạn đã đăng ký:</label>
          <input
            className="form-control border border-success border-2 mb-3"
            placeholder="Nhập email"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          onClick={handleSubmit}
          className="btn btn-primary d-flex align-items-center justify-content-center"
          style={{
            height: "40px", // Điều chỉnh chiều cao nếu cần
            gap: "10px", // Khoảng cách giữa Spinner và text
          }}
        >
          {loading && <Spinner animation="border" size="sm" className="mb-0" />}
          <span>{loading ? "Đang gửi..." : "Gửi OTP"}</span>
        </button>
      </form>
    </LoginLayout>
  );
};

export default ForgotPW;
