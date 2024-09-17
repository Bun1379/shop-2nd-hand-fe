import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import './Header.css';
function Header() {
    return (
        <nav className="header">
            <ul className="header-nav">
                <ul className="header-nav-left">
                    <li>
                        <NavLink to="/">
                            Logo shop
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/">
                            Nam
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/">
                            Nữ
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/">
                            Unisex
                        </NavLink>
                    </li>
                </ul>
                <ul className="header-nav-right">
                    <li>
                        <NavLink to="/login">
                            Đăng nhập
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/register">
                            Đăng ký
                        </NavLink>
                    </li>
                </ul>
            </ul>
        </nav>
    );
}

export default Header;