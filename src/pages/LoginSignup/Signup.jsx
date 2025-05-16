import React from "react";
import LoginLayout from "../../layouts/LoginLayout/LoginLayout";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import AuthAPI from "../../api/AuthAPI";
import { toast } from "react-toastify";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import { Button } from "react-bootstrap";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // Kiểm tra mật khẩu
      toast.error("Mật khẩu không khớp !");
      return;
    }
    setLoading(true);
    try {
      const response = await AuthAPI.Signup({
        email,
        password,
        username,
      });
      if (response.status === 200) {
        toast.success("Đăng ký thành công!");
        await AuthAPI.SendOTP({
          email,
        });
        navigate("/verify", { state: { email } });
      }
    } catch (error) {
      toast.error("Đăng ký thất bại: " + error.response.data.EM);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginLayout>
      <h2>
        <Link to="/login">
          <FaArrowLeft />
        </Link>
        <p>Đăng ký</p>
      </h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          className="form-control border border-success border-2 mb-3"
          type="email"
          id="email"
          placeholder="Nhập email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="username">Tên của bạn:</label>
        <input
          className="form-control border border-success border-2 mb-3"
          type="text"
          id="username"
          placeholder="Nhập tên của bạn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Mật khẩu:</label>
        <div className="rounded border border-success border-2 mb-3">
          <PasswordInput
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <label htmlFor="confirmPassword">Nhập lại mật khẩu:</label>

        <div className="rounded border border-success border-2 mb-3">
          <PasswordInput
            id="confirmPassword"
            value={confirmPassword}
            placeholder="Nhập lại mật khẩu"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" disabled={loading}>
          Tạo tài khoản
        </Button>
      </form>
    </LoginLayout>
  );
};

export default Signup;
