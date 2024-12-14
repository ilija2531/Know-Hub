import './Navbar.css'
import search_icon from '../../assets/Navbar-sliki/search-1.png'
import search_icon_white from '../../assets/Navbar-sliki/search-2.png'
import light_mode from '../../assets/Navbar-sliki/day.png'
import dark_mode from '../../assets/Navbar-sliki/night.png'

const Navbar = ({theme, setTheme}) =>{

    const toggle_mode = () => {
        theme == 'light' ?  setTheme('dark') : setTheme('light');
    }
        
    return(
        <div className='navbar'>
            <ul>
                <li><a href='#'>Home</a></li>
                <li><a href='#'>My Learning</a></li>
                <li><a href='#'>Catalog</a></li>
                <li><a href='#'>Favorites</a></li>
            </ul>

            <div className='search-box'>
                <input type='text' placeholder='Search'/>
                <img src={theme == 'light' ? search_icon : search_icon} alt=''></img>
            
            </div>
            <img className='toggle'onClick={()=>{toggle_mode()}} src={theme == 'light' ? dark_mode : light_mode} alt='toggle-icon'></img>
        
        </div>
        
    );
}



export default Navbar