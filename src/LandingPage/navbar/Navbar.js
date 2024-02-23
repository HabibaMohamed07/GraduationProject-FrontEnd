import React, { useState} from 'react';
// import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';

import logo from '../../logo.svg';
import { useNavigate } from 'react-router-dom';
import './navbar.css';
import { Link } from 'react-router-dom';
const Navbar = () => {
  // const navigate=useNavigate();
  // const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="gpt3__navbar" >
      <div className="gpt3__navbar-links">
      <div className="gpt3__navbar-links_container">
          {/* <img src={logo} /> */}
          <Link to='/'><p><a href="#home">MindMend</a></p></Link>
        </div>
        <div className="gpt3__navbar-links_container">
        <Link to='/'><p><a>Home</a></p></Link>
          <p><a href="#sec2">What is MindMend?</a></p>
          <p><a href="#blog">Our Therapy</a></p>
         
        </div>
        
      </div>
      <div className="gpt3__navbar-sign">
        <Link to='/Signin'><button className="btn" type="button">Sign in</button></Link>
        <Link to='/Signup'><button type="button">Sign up</button></Link>
      </div>
      <div className="gpt3__navbar-menu">
        {/* {toggleMenu
          ? <RiCloseLine color="#fff" size={27}  />
          : <RiMenu3Line color="#fff" size={27}  />}
        {toggleMenu && ( */}
        <div className="gpt3__navbar-menu_container scale-up-center">
          <div className="gpt3__navbar-menu_container-links">
            <p><a href="#home">Home</a></p>
            <p><a href="#sec2">What is MindMend?</a></p>
            <p><a href="#blog">Our Therapy</a></p>
          </div>
        
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default Navbar;
