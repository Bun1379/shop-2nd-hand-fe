import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import NotificationBell from "./NotificationBell";
import logo from "../../assets/images/logoedit.png";
import { Dropdown } from "react-bootstrap";
import { Link } from 'react-scroll';
import "./Header.css";
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("is_admin");
    localStorage
    setIsLoggedIn(false);
    toast.success("Đăng xuất thành công!");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success fixed-top fs-4 w-100">
      <div className="d-flex justify-content-between align-items-center w-100"
        style={{ marginLeft: "130px", marginRight: "123px" }}
      >
        <NavLink className="navbar-brand d-flex align-items-center" to="/"
          onClick={() => window.location.pathname === "/" ? window.location.reload() : null}
        >
          <img src={logo} alt="Logo" style={{ width: "50px", height: "50px" }} />
          <span className="ms-2 "
            style={{
              fontFamily: "'KouzanBrush', cursive",
              fontSize: "25px",
              fontWeight: "normal",
              textDecoration: "none",
              color: "white"
            }}
          >
            Ishio Store</span>
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link
                className="nav-link"
                to="new-products"
                smooth={true}
                duration={0}
                style={{ cursor: "pointer" }}
              >
                Hàng mới
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="reviews"
                smooth={true}
                duration={0}
                style={{ cursor: "pointer" }}
              >
                Đánh giá
              </Link>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/search">
                Tìm kiếm
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

          <form
            className="d-flex align-items-center me-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="input-group">
              <span className="input-group-text bg-white border-0">
                <FaSearch className="text-muted" />
              </span>
              <input
                type="text"
                className="form-control border-0"
                placeholder="Tìm kiếm..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </div>
          </form>

          <ul className="navbar-nav">
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
                <Dropdown align="end">
                  <Dropdown.Toggle
                    as="button"
                    className="nav-link header-dropdown-toggle"
                    href="#"
                    id="userDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={user?.image}
                      alt="Avatar"
                      className="rounded-circle"
                      style={{ width: "40px", height: "40px" }}
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu aria-labelledby="userDropdown">
                    <Dropdown.Item as={NavLink} to="/user-profile"
                      style={{ backgroundColor: 'transparent', color: 'black' }}
                    >
                      Tài khoản của tôi
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={NavLink}
                      to="/user-profile"
                      style={{ backgroundColor: 'transparent', color: 'black' }}
                      state={{ initialSection: "orders" }}
                    >
                      Đơn mua
                    </Dropdown.Item>
                    <Dropdown.Item as="button" onClick={handleLogout}>
                      Đăng xuất
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <li className="nav-item me-3">
                  <NavLink className="nav-link" to="/login">
                    Đăng nhập
                  </NavLink>
                </li>
                <li className="nav-item me-3">
                  <NavLink className="nav-link" to="/signup">
                    Đăng ký
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div >
    </nav >
  );
}

export default Header;
