import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import search_icon from '../../assets/Navbar-sliki/search-1.png'; // Use a single search icon
import light_mode from '../../assets/Navbar-sliki/day.png';
import dark_mode from '../../assets/Navbar-sliki/night.png';
import logo_img from '../../assets/Navbar-sliki/logo1.png';
import account_img from '../../assets/Navbar-sliki/account.png';
import home_img from '../../assets/Navbar-sliki/home.png';
import catalog_img from '../../assets/Navbar-sliki/catalog.png';
import courses_img from '../../assets/Navbar-sliki/myCourses.png';
import logout_img from '../../assets/Navbar-sliki/logout.png';

const Navbar = ({ theme, setTheme }) => {
  const [open, setOpen] = useState(false);

  // Toggle theme between light and dark
  const toggle_mode = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Apply the theme to the document body when the theme changes
  useEffect(() => {
    document.body.className = theme; // Apply the theme class to the body
  }, [theme]);

  function DropdownItem(props) {
    return (
      <li className="dropdownItem">
        <img src={props.img} alt={props.text}></img>
        <span>{props.text}</span>
      </li>
    );
  }

  return (
    <>
      <div className="navbar">
        <img src={theme === 'light' ? logo_img : logo_img} className="logoImg" alt="logo" />
        <div className="search-box">
          <input type="text" placeholder="Search" />
          <img
            src={search_icon} // Always use the same icon
            alt="search icon"
            className="search-icon"
          />
        </div>

        <ul>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>

        <div className="dropdown">
          <div className="dropdown-trigger" onClick={() => setOpen(!open)}>
            <img className="account-img" src={account_img} alt="account" />
          </div>
          <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
            <h3>Nikola Gruevski</h3>
            <ul>
              <Link to="/home">
                <DropdownItem img={home_img} text="Home" />
              </Link>
              <Link to="/myProfile">
                <DropdownItem img={account_img} text="My Profile" />
              </Link>
              <Link to="/catalog">
                <DropdownItem img={catalog_img} text="Catalog" />
              </Link>
              <Link to="/myCourses">
                <DropdownItem img={courses_img} text="My Courses" />
              </Link>
              <Link to="/logout">
                <DropdownItem img={logout_img} text="Logout" />
              </Link>
            </ul>
            <img
              className="toggle"
              onClick={toggle_mode}
              src={theme === 'light' ? dark_mode : light_mode}
              alt="toggle-icon"
            />
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Navbar;
