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
  localStorage.clear();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthAPI.Login({ email, password });

      if (response.status === 200) {
        const { user, token } = response.data.DT;

        if (!user.is_active) {
          toast.error("Tài khoản của bạn đã bị khóa");
          return;
        }
        localStorage.setItem("token", token);
        setUserInLocalStorage(user);
        localStorage.setItem("role", user.role);
        if (user.is_verified) {
          toast.success("Đăng nhập thành công!");
          navigate(
            user.role === "ADMIN" || user.role === "MANAGER" ? "/admin" : "/"
          );
        } else {
          navigate("/verify", { state: { email } });
        }
      }
    } catch (error) {
      toast.error(
        "Đăng nhập thất bại: " + (error?.response?.data?.EM || error.message)
      );
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
