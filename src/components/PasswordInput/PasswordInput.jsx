import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({ value, onChange, placeholder = "Nhập mật khẩu" }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="input-group has-validation">
            <input
                className="form-control"
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
            <span
                className="input-group-text "
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
        </div>
    );
};

export default PasswordInput;
