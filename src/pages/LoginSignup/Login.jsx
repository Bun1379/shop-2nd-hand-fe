import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import LoginLayout from "../../layouts/LoginLayout/LoginLayout";
import AuthAPI from "../../api/AuthAPI";
import "./Login.css";
import { setUserInLocalStorage } from "../../layouts/SocketContext";
import PasswordInput from "../../components/PasswordInput/PasswordInput";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthAPI.Login({
        email,
        password,
      });

      if (response.status === 200) {
        if (response.data.DT.user.is_active === false) {
          toast.error("Tài khoản của bạn đã bị khóa");
        } else {
          localStorage.setItem("token", response.data.DT.token);
          setUserInLocalStorage(response.data.DT.user);
          if (response.data.DT.user.is_admin === true || response.data.DT.user.branch.length > 0) {
            localStorage.setItem("is_admin", true);
          }
          toast.success("Đăng nhập thành công!");
          if (response.data.DT.user.is_verified === true) {
            navigate((response.data.DT.user.is_admin || response.data.DT.user.branch.length > 0) ? "/admin" : "/");
          } else {
            navigate("/verify", { state: { email } });
          }
        }
      }
    } catch (error) {
      toast.error("Đăng nhập thất bại: " + error?.response?.data.EM);
    }
  };
  return (
    <LoginLayout>
      <h2>
        <Link to="/">
          <FaArrowLeft />
        </Link>
        <p>Đăng nhập</p>
      </h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          className="form-control border border-success border-2 mb-3"
          type="email"
          id="email"
          value={email}
          placeholder="Nhập email của bạn"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Mật khẩu:</label>
        <div className="border border-success border-2 mb-3 rounded">
          <PasswordInput
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="login-end">
          <Link className="forgot-pw" to="/forgot-pw">
            Quên mật khẩu ?
          </Link>
          <Link className="register" to="/signup">
            Đăng ký
          </Link>
        </div>
        <button type="submit">Đăng Nhập</button>
      </form>
    </LoginLayout>
  );
};

export default Login;
