import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { FaBell, FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa'; // Import các icon cần thiết
import './Header.css';

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);  // Chuyển token thành boolean
    }, []);

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
                            <li>
                                <NavLink to="/user">
                                    <FaUser />
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/login">
                                    Đăng nhập
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/signup">
                                    Đăng ký
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </ul>
        </nav>
    );
}

export default Header;
