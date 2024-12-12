import './Navbar.css'
import search_icon from '../../assets/search-1.png'
import search_icon_white from '../../assets/search-2.png'
import light_mode from '../../assets/day.png'
import dark_mode from '../../assets/night.png'

function Navbar(){
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
                <img src={search_icon} alt=''></img>
            </div>

            <img src={dark_mode} alt='toggle-icon'></img>
        </div>
        
    );
}



export default Navbar