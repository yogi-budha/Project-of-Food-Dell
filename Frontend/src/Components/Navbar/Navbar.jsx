import  { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import profile_icon from '../../assets/profile_icon.png'
import logout_icon from '../../assets/logout_icon.png'
import bag_icon from '../../assets/bag_icon.png'
import icon1 from '../../assets/foodExpress.jpg'
import myOrder from '../../assets/unnamed.png'

const Navbar = ({ setShowLogin }) => {
  const navigate = useNavigate()
  const {token,setToken, getTotalCartAmount } = useContext(StoreContext);
  function logout(){
    localStorage.removeItem("token")
    setToken("")
    navigate("/")
  }
  const [menu, setmenu] = useState('home');
  return (
    <div className="navbar">
    <Link to='/'> <img src={icon1} alt="" className="logo" /></Link> 
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => {
            setmenu('home');
          }}
          className={menu == 'home' ? 'active' : ''}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => {
            setmenu('menu');
          }}
          className={menu == 'menu' ? 'active' : ''}
        >
          menu
        </a>
        <a
          href="#App-download"
          onClick={() => {
            setmenu('mobile-app');
          }}
          className={menu == 'mobile-app' ? 'active' : ''}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => {
            setmenu('contact us');
          }}
          className={menu == 'contact us' ? 'active' : ''}
        >
          contact us
        </a>
      <Link
          to="/myorders"
          className='myOrderdiv'
        >
          {/* <img className='myOrderimg' src={myOrder} alt="" /> */}
          My Order
        </Link>
      </ul>
      <div className="navbar-right">
       
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
        </div>

       {
        !token ? <button onClick={() => setShowLogin(true)}>sign in</button> : <div className='alldetails'>
          <img className='profile ' src={profile_icon} alt="" />
        
          
        
            <p id='logout' onClick={logout}><img src={logout_icon}  alt="" /><p>logout</p></p>
      
        </div>
       }
        
      </div>
    </div>
  );
};

export default Navbar;
