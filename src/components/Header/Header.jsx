import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBell, FaShoppingCart, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css"; // Import CSS với class .header
import NotificationBell from "./NotificationBell";

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [query, setQuery] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?query=${query}`);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("is_admin");
    setIsLoggedIn(false);
    toast.success("Đăng xuất thành công!");
    navigate("/login");
  };

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          {" "}
          {/* Sử dụng container-fluid và padding */}
          <NavLink className="navbar-brand" to="/">
            Logo shop
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Nam
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Nữ
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Unisex
                </NavLink>
              </li>
              {localStorage.getItem("is_admin") === "true" && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin">
                    ADMIN
                  </NavLink>
                </li>
              )}
            </ul>

            <div className="header-search-container">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                className="form-control"
              />
              <FaSearch className="icon-search" />
            </div>

            {/* Các mục bên phải */}
            <ul className="navbar-nav ms-auto d-flex align-items-center">
              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <NotificationBell />
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/cart">
                      <FaShoppingCart />
                    </NavLink>
                  </li>
                  <li
                    className="nav-item dropdown"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <NavLink
                      className="nav-link dropdown-toggle"
                      to="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded={dropdownOpen}
                    >
                      <img
                        src={user.image}
                        alt="Avatar"
                        className="rounded-circle"
                        style={{ width: "40px", height: "40px" }}
                      />
                    </NavLink>
                    <ul
                      className={`dropdown-menu dropdown-menu-end ${
                        dropdownOpen ? "show" : ""
                      }`}
                    >
                      <li>
                        <NavLink className="dropdown-item" to="/user-profile">
                          Tài khoản của tôi
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/user-profile"
                          state={{ initialSection: "orders" }}
                        >
                          Đơn mua
                        </NavLink>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={handleLogout}
                        >
                          Đăng xuất
                        </button>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Đăng nhập
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signup">
                      Đăng ký
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
