import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBell, FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    setIsLoggedIn(false);
    toast.success("Đăng xuất thành công!");

    navigate("/login");
  };

  return (
    <nav className="header">
      <ul className="header-nav">
        <ul className="header-nav-left">
          <li>
            <NavLink to="/">Logo shop</NavLink>
          </li>
          <li>
            <NavLink to="/">Nam</NavLink>
          </li>
          <li>
            <NavLink to="/">Nữ</NavLink>
          </li>
          <li>
            <NavLink to="/">Unisex</NavLink>
          </li>
        </ul>
        <ul className="header-nav-right">
          <li>
            <div className="header-search-container">
              <input type="text" placeholder="Tìm kiếm..." />
              <FaSearch className="icon-search" />
            </div>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <NavLink to="/notifications">
                  <FaBell />
                </NavLink>
              </li>
              <li>
                <NavLink to="/cart">
                  <FaShoppingCart />
                </NavLink>
              </li>
              <li
                className="nav-item dropdown"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <NavLink to="#" className="nav-link">
                  <FaUser />
                </NavLink>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <ul className="dropdown-menu show">
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
                      <button className="dropdown-item" onClick={handleLogout}>
                        Đăng xuất
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login">Đăng nhập</NavLink>
              </li>
              <li>
                <NavLink to="/signup">Đăng ký</NavLink>
              </li>
            </>
          )}
        </ul>
      </ul>
    </nav>
  );
}

export default Header;
