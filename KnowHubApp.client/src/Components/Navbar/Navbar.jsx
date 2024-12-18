import { Link} from 'react-router-dom'
import React, {useState} from 'react'
import './Navbar.css'
import search_icon from '../../assets/Navbar-sliki/search-1.png'
import search_icon_white from '../../assets/Navbar-sliki/search-2.png'
import light_mode from '../../assets/Navbar-sliki/day.png'
import dark_mode from '../../assets/Navbar-sliki/night.png'
import logo_img from '../../assets/Navbar-sliki/logo1.png'
import account_img from '../../assets/Navbar-sliki/account.png'
import home_img from '../../assets/Navbar-sliki/home.png'
import catalog_img from '../../assets/Navbar-sliki/catalog.png'
import courses_img from '../../assets/Navbar-sliki/myCourses.png'
import logout_img from '../../assets/Navbar-sliki/logout.png'




const Navbar = ({theme, setTheme}) =>{

    const [open, setOpen] = useState(false);

    const toggle_mode = () => {
        theme == 'light' ?  setTheme('dark') : setTheme('light');
    }

    function DropdownItem(props){
        return(
            <li className='dropdownItem'>
                <img src={props.img} alt={props.text}></img>
                <a>{props.text}</a>
            </li>
        )
    }
   
        
    return(
        <>
        <div className='navbar'>

            <img src={theme == 'light' ? logo_img : logo_img} className='logoImg'></img>

            

            <div className='search-box'>
                <input type='text' placeholder='Search'/>
                <img src={theme == 'light' ? search_icon : search_icon} alt=''></img>
            
            </div>
            <div className='dropdown'>
                <div className='dropdown-trigger' onClick={()=>{setOpen(!open)}}>
                <img className='account-img' src={account_img}></img>
            </div>    
            <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
                <h3>Nikola Gruevski</h3>
                <ul>
                <Link to='/'><DropdownItem img = {home_img} text = {"Home"}/></Link>
                <Link to='/myProfile'><DropdownItem img = {account_img} text = {"My Profile"}/></Link>
                <Link to='/catalog'><DropdownItem img = {catalog_img} text = {"Catalog"}/></Link>
                <Link to='/myCourses'><DropdownItem img = {courses_img} text = {"My Courses"}/></Link>
                <Link to='/logout'><DropdownItem img = {logout_img} text = {"Logout"}/></Link>    
                </ul>
            <img className='toggle'onClick={()=>{toggle_mode()}} src={theme == 'light' ? dark_mode : light_mode} alt='toggle-icon'></img>
            </div>
            </div>
            
        </div>
        <hr></hr>
        </>
    );
}



export default Navbar