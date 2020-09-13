import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.png';

import { AuthContext } from '../../contexts/Authorization';

const Header = () => {
  const [isLogin, setIsLogin] = useContext(AuthContext);
  console.log(typeof isLogin)
  return (
    <header>
      <img id="logo" src={logo} alt="Logo" />
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          {isLogin && <li>
            <NavLink to="/movie-list">Movie List Editor</NavLink>
          </li>}
          <li>
            {!isLogin ? <NavLink to="/login">Login</NavLink> : <NavLink to="/logout" onClick={()=>setIsLogin(false)}>Logout</NavLink>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
