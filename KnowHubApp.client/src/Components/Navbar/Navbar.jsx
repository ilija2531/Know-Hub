import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../AuthContext/AuthContext"; // Use AuthContext for authentication logic
import "./Navbar.css";
import search_icon from "../../assets/Navbar-sliki/search-1.png";
import light_mode from "../../assets/Navbar-sliki/day.png";
import dark_mode from "../../assets/Navbar-sliki/night.png";
import logo_img from "../../assets/Navbar-sliki/logo1.png";
import account_img from "../../assets/Navbar-sliki/account.png";
import home_img from "../../assets/Navbar-sliki/home.png";
import courses_img from "../../assets/Navbar-sliki/myCourses.png";
import logout_img from "../../assets/Navbar-sliki/logout.png";

const Navbar = ({ theme = "light", setTheme, onSearch }) => {
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("user123"); // Default username
  const menuRef = useRef(null);
  const location = useLocation();
  const { token, fullName } = useAuth(); // Get token and fullName from AuthContext

  // Determine if the user is logged in
  const isLoggedIn = !!token;

  // Update username when user is logged in
  useEffect(() => {
    if (isLoggedIn) {
      setUserName(fullName || "User"); // Set username dynamically
    }
  }, [isLoggedIn, fullName]);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const toggleMode = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  function DropdownItem({ img, text, onClick }) {
    return (
      <li className="dropdownItem" onClick={onClick}>
        <img src={img} alt={text} />
        <span>{text}</span>
      </li>
    );
  }

  const hideProfileIcon =
    location.pathname === "/" ||
    location.pathname === "/signup" ||
    location.pathname === "/login";
  const hideSearchBox = location.pathname !== "/home";
  const showThemeToggle =
    ["/signup", "/login", "/"].includes(location.pathname);

  return (
    <>
      <div className="navbar">
        <Link to="/home">
          <img src={logo_img} className="logoImg" alt="logo" />
        </Link>

        {!hideSearchBox && (
          <div className="search-box">
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => onSearch(e.target.value)}
            />
            <img src={search_icon} alt="search icon" className="search-icon" />
          </div>
        )}

        <ul>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>

        {!hideProfileIcon && (
          <div className="dropdown" ref={menuRef}>
            <div className="dropdown-trigger" onClick={() => setOpen(!open)}>
              <img className="account-img" src={account_img} alt="account" />
            </div>
            <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
              {isLoggedIn && <h3>{userName}</h3>}
              <ul>
                <Link to="/home">
                  <DropdownItem img={home_img} text="Home" />
                </Link>
                <Link to="/myProfile">
                  <DropdownItem img={account_img} text="My Profile" />
                </Link>
                <Link to="/myCourses">
                  <DropdownItem img={courses_img} text="My Courses" />
                </Link>
                <Link to="/logout">
                  <DropdownItem img={logout_img} text="Logout" />
                </Link>
                <li onClick={toggleMode} className="dropdownItem">
                  <img
                    src={theme === "light" ? dark_mode : light_mode}
                    alt="toggle-icon"
                  />
                  <span>Toggle Theme</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {showThemeToggle && (
          <img
            className="toggle"
            onClick={toggleMode}
            src={theme === "light" ? dark_mode : light_mode}
            alt="toggle-icon"
          />
        )}
      </div>
      <hr />
    </>
  );
};

export default Navbar;