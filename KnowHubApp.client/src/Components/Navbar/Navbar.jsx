import { Link} from 'react-router-dom'
import './Navbar.css'
import search_icon from '../../assets/Navbar-sliki/search-1.png'
import search_icon_white from '../../assets/Navbar-sliki/search-2.png'
import light_mode from '../../assets/Navbar-sliki/day.png'
import dark_mode from '../../assets/Navbar-sliki/night.png'
import logo_img from '../../assets/Navbar-sliki/logo1.png'

const Navbar = ({theme, setTheme}) =>{

    const toggle_mode = () => {
        theme == 'light' ?  setTheme('dark') : setTheme('light');
    }

   
        
    return(
        <>
        <div className='navbar'>

            <img src={theme == 'light' ? logo_img : logo_img} className='logoImg'></img>

            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/myLearning">My Learning</Link></li>
                <li><Link to="/catalog">Catalog</Link></li>
                <li><Link to="/favorites">Favorites</Link></li>
            </ul>

            <div className='search-box'>
                <input type='text' placeholder='Search'/>
                <img src={theme == 'light' ? search_icon : search_icon} alt=''></img>
            
            </div>
            <img className='toggle'onClick={()=>{toggle_mode()}} src={theme == 'light' ? dark_mode : light_mode} alt='toggle-icon'></img>

            
        </div>
        <hr></hr>
        </>
    );
}



export default Navbar