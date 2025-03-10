import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import NotificationBell from "./NotificationBell";
import logo from "../../assets/images/logoedit.png";
import { Badge, Dropdown } from "react-bootstrap";
import LogoutModal from "../LogoutModal/LogoutModal";

import "./Header.css";
import CartAPI from "../../api/CartAPI";
function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [productInCart, setProductInCart] = useState(10);

  const fetchDataCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
    try {
      const response = await CartAPI.GetCart();
      setProductInCart(response.data.DT.items.length);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?query=${query}`);
    }
  };

  const handleNavigation = (to) => {
    if (location.pathname !== "/") {
      navigate(`/#${to}`);
    } else {
      window.scrollTo({ top: document.getElementById(to)?.offsetTop });
    }
  };

  useEffect(() => {
    window.addEventListener("cartUpdated", fetchDataCart);
    return () => {
      window.removeEventListener("userUpdated", fetchDataCart);
    };
  }, []);

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1));
        console.log(element);
        if (element) {
          window.scrollTo({ top: element.offsetTop, behavior: "smooth" });
        }
      }, 500); // Thêm độ trễ nhỏ để đảm bảo cuộn mượt mà
    }
  }, [location]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    if (token) {
      fetchDataCart();
    }
  }, []);

  const handleShow = () => setShowModal(true); // Mở modal
  const handleClose = () => setShowModal(false); // Đóng modal

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success fixed-top fs-4 w-100">
      <div
        className="d-flex justify-content-between align-items-center w-100"
        style={{ marginLeft: "130px", marginRight: "123px" }}
      >
        <NavLink
          className="navbar-brand d-flex align-items-center"
          to="/"
          onClick={() =>
            window.location.pathname === "/" ? window.location.reload() : null
          }
        >
          <img
            src={logo}
            alt="Logo"
            style={{ width: "50px", height: "50px" }}
          />
          <span
            className="ms-2 "
            style={{
              fontFamily: "'KouzanBrush', cursive",
              fontSize: "25px",
              fontWeight: "normal",
              textDecoration: "none",
              color: "white",
            }}
          >
            Ishio Store
          </span>
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => handleNavigation("new-products")}
                style={{ cursor: "pointer" }}
              >
                Hàng mới
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => handleNavigation("reviews")}
                style={{ cursor: "pointer" }}
              >
                Đánh giá
              </a>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/search">
                Tìm kiếm
              </NavLink>
            </li>
            {localStorage.getItem("is_admin") === "true" && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">
                  MANAGER
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
                    {productInCart > 0 && (
                      <Badge
                        bg="danger"
                        pill
                        className="position-absolute start-60 translate-middle"
                        style={{ fontSize: "0.75rem" }}
                      >
                        {productInCart}
                      </Badge>
                    )}
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
                    <Dropdown.Item
                      as={NavLink}
                      to="/user-profile"
                      style={{ backgroundColor: "transparent", color: "black" }}
                    >
                      Tài khoản của tôi
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={NavLink}
                      to="/user-profile"
                      style={{ backgroundColor: "transparent", color: "black" }}
                      state={{ initialSection: "orders" }}
                    >
                      Đơn mua
                    </Dropdown.Item>
                    <Dropdown.Item as="button" onClick={handleShow}>
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
      </div>
      <LogoutModal show={showModal} handleClose={handleClose} />
    </nav>
  );
}

export default Header;

export const updateQuantityCart = () => {
  window.dispatchEvent(new Event("cartUpdated"));
};
