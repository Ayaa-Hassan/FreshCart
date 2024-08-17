import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from "../../images/freshcart-logo.svg";
import { authContext } from '../../Context/authentication';
import { FaCartPlus } from 'react-icons/fa';
import { cartContext } from './../../Context/cartContext';






export default function Navbar() {
  const { token, setToken } = useContext(authContext);
  const { numOfCartItems } = useContext(cartContext);
  
  const logoutNavigateFun = useNavigate();
  function logout() {
    localStorage.removeItem('tok');
    setToken(null);
    logoutNavigateFun('/login');
    
  }








  return <>
  
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container">
        <Link className="navbar-brand" to="products">
          <img src={Logo} alt="freshcart logo" />

        </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {token ? <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
           
            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categories">Categories</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/brands">Brands</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/allOrders">AllOrders</Link>
            </li>

          </ul> : ''}
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
       
         <li className="nav-item">
              <Link className="nav-link" to="https://github.com/Ayaa-Hassan">
                <i className="fa-brands fa-github"></i>
              </Link>
        </li>
         <li className="nav-item">
              <Link className="nav-link" to="https://www.linkedin.com/in/ayaa-hassan">
                <i className="fa-brands fa-linkedin"></i>
              </Link>
            </li>
              <li className="nav-item">
              <Link className="nav-link" to="https://www.facebook.com/profile.php?id=100077015920873">
                <i className="fa-brands fa-facebook"></i>
              </Link>
            </li>
            {token ? <>
         <li className="nav-item me-5">
              <Link className="nav-link position-relative" to="/cart">
                <FaCartPlus size={20} />
                <span className="position-absolute top-0 start-100 translate-middle-x  badge rounded-pill min-bg-color">
                  {numOfCartItems}
            
                </span>
                
              </Link>
        </li>
           
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
              </li>

              <li className="nav-item">
                <span className="nav-link " onClick={logout} role="button">Logout</span>
              </li>
            </> : <>
                <li className="nav-item">
                  <Link className="nav-link"  to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Signup</Link>
                </li>
            </>}
      
      </ul>
     
    </div>
  </div>
</nav>
  
  </>
}
