import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import search_icon from '../../assets/Navbar-sliki/search-1.png';
import light_mode from '../../assets/Navbar-sliki/day.png';
import dark_mode from '../../assets/Navbar-sliki/night.png';
import logo_img from '../../assets/Navbar-sliki/logo1.png';
import account_img from '../../assets/Navbar-sliki/account.png';
import home_img from '../../assets/Navbar-sliki/home.png';
import courses_img from '../../assets/Navbar-sliki/myCourses.png';
import logout_img from '../../assets/Navbar-sliki/logout.png';

const Navbar = ({ theme = 'light', setTheme }) => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const menuRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem('authToken'); // Assuming token is stored in localStorage
    const user = JSON.parse(localStorage.getItem('user')); // Assuming user data is stored

    if (token && user) {
      setIsLoggedIn(true);
      setUserName(user.name || 'User'); // Default to 'User' if name is unavailable
    } else {
      setIsLoggedIn(false);
      setUserName('user123');
    }
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  const toggle_mode = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  function DropdownItem(props) {
    return (
      <li className="dropdownItem">
        <img src={props.img} alt={props.text} />
        <span>{props.text}</span>
      </li>
    );
  }

  const hideProfileIcon = location.pathname === '/' || location.pathname === '/signup' || location.pathname === '/login';
  const hideSearchBox = location.pathname === '/';
  const showThemeToggle = ['/signup', '/login', '/'].includes(location.pathname); 

  return (
    <>
      <div className="navbar">
        <Link to="/home">
          <img src={logo_img} className="logoImg" alt="logo" />
        </Link>

        {!hideSearchBox && (
          <div className="search-box">
            <input type="text" placeholder="Search" />
            <img src={search_icon} alt="search icon" className="search-icon" />
          </div>
        )}

        {!isLoggedIn ? (
          <ul>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        ) : null}

        {!hideProfileIcon && (
          <div className="dropdown" ref={menuRef}>
            <div className="dropdown-trigger" onClick={() => setOpen(!open)}>
              <img className="account-img" src={account_img} alt="account" />
            </div>
            <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
              {!isLoggedIn && <h3>{userName}</h3>}
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
                <li onClick={toggle_mode} className="dropdownItem">
                  <img src={theme === 'light' ? dark_mode : light_mode} alt="toggle-icon" />
                  <span>Toggle Theme</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {showThemeToggle &&  (
          <img
            className="toggle"
            onClick={toggle_mode}
            src={theme === 'light' ? dark_mode : light_mode}
            alt="toggle-icon"
          />
        )}
      </div>
      <hr />
    </>
  );
};

export default Navbar;
